import { LitElement, html, css, nothing, unsafeCSS } from "lit";
import { PageController } from '@open-cells/page-controller';
import { getListPokemon, getListNewPokemon, getPokemon } from '../service/poke-service.js';
import { map } from 'lit/directives/map.js';
import bulma from 'bulma/css/bulma.css?inline';
import picDefault from '../../images/pokeball.png';
import '../components/loading-warn.js';
import '../components/main/main-subhead.js';
import '../components/poke-table.js';
import '../components/poke-filter.js'

const LIMIT = 5;

class ListPage extends LitElement {

    pageController = new PageController(this);

    static styles = [
        unsafeCSS(bulma),
        css`
            .pic {
                height: 96px;
                width: 96px;
            }

            .table {
                width: 100%;
            }

            .table td {
                vertical-align: middle;
            }

            .paginator{
                display: flex;
                justify-content: center;
                gap: 1rem;
            }
        `
    ]

    static properties = {
        pokeList: {state: true},
        loading: {state: true},
        error: {state: false},
        favs: {state: true},
    }


    // -- Life Cycle -- //

    constructor() {
        super();

        // Reactive
        this.pokeList = [];
        this.loading = true;
        this.error = false;
        this.favs = [];

        // Reg Props
        this.page = this.getPageFromPath();
        this.isNew = this.getFilterFromPath() === 'new' ? true : false;
        this.handleConnections();
    }

    handleConnections() {
        this.pageController.subscribe('ch_favs_inc', (poke) => {
            this.favs = [...this.favs, poke];
        });
        this.pageController.subscribe('ch_favs_ex', (poke) => {
            this.favs = this.favs.filter(p => p !== poke);
        });
        this.pageController.subscribe('ch_newpoke', (command) => {
            if(command === 'created' && this.isNew) {
                this.page = 0;
                this.isNew = true;
                this.getPokeList();
            }
        });
    }

    connectedCallback() {
        super.connectedCallback();
        this.getPokeList();
    }

    disconnectedCallback() {
        this.pageController.unsubscribe('ch_favs_inc');
        this.pageController.unsubscribe('ch_favs_ex');
        this.pageController.unsubscribe('ch_newpoke');
        super.disconnectedCallback();
    }


    // -- Path Methods -- //

    getPageFromPath() {
        const url = new URL(window.location.href);
        const page = url.searchParams.get('page') !== null ? url.searchParams.get('page') : 0;
        return page;
    }

    getFilterFromPath() {
        const url = new URL(window.location.href);
        const filter = url.searchParams.get('filter') !== null ? url.searchParams.get('list') : 'list';
        return filter;
    }


    // -- Service Methods -- //

    getPokeList() {
        this.isNew ? this.getPokeListInt() : this.getPokeListExt();
    }

    getPokeListExt() {
        this.loading = true;
        getListPokemon(this.page * LIMIT, LIMIT)
            .then(result => {
                this.pageMax = Math.floor(result.data.count / LIMIT);
                this.setPageInPath(this.page, 'list');
                return Promise.all(result.data.results.map(poke => getPokemon(poke.name)))
            })
            .then(list => {
                this.pokeList = list.map(e => ({
                    id: e.id,
                    pic: e.sprites?.front_default ?? picDefault,
                    name: e.name
                }));
            })
            .catch(err => {
                this.error = true;
                console.log(err);
            })
            .finally(() => this.loading = false)
    }

    getPokeListInt() {
        this.loading = true;
        getListNewPokemon(this.page * LIMIT, LIMIT)
            .then(result => {
                this.pageMax = Math.floor(result.data.count / LIMIT);
                this.setPageInPath(this.page, 'new');
                this.pokeList = result.data.results.map(e => ({
                    id: e.id,
                    pic: e.sprites?.front_default ?? picDefault,
                    name: e.name
                }));
            })
            .catch(err => {
                this.error = true;
                console.log(err);
            })
            .finally(() => this.loading = false)
    }

    setPageInPath(page, filter) {
        const url = new URL(window.location.href);
        url.searchParams.set('page', page);
        url.searchParams.set('filter', filter);
        window.history.pushState({}, '', url);
    }


    // -- Render -- //

    renderTable() {
        return html`
            <poke-table 
                .pokeList=${[...this.pokeList]}
                .favs=${!this.isNew ? this.favs : null}
                page=${this.page}
                pageMax=${this.pageMax}
                @clickDetail=${({detail}) => this.clickDetail(detail)}
                @clickFavs=${({detail}) => detail.command === 'inc' ? this.includeToFav(detail.name) : this.excludeToFav(detail.name)}
                @clickPage=${(opt) => opt.detail === 'next' ? this.next() : this.prev()}
            ></poke-table>
        `;
    }

    render() {
        const loadingTpl = html`<loading-warn></loading-warn>`;
        const errorTpl = html`<p>Hubo un error</p>`;

        return html`
            <main-subhead title="List"></main-subhead>
            <poke-filter .isNew=${this.isNew} @selectFilter=${this.filterList}></poke-filter>
            ${this.loading ? loadingTpl : nothing}
            ${!this.loading && this.pokeList ? this.renderTable() : nothing}
            ${!this.loading && this.error ? errorTpl : nothing}
        `;
    }


    // -- Handler Btns -- //

    clickDetail(poke) {
        this.isNew ?
            this.pageController.navigate('detail-new', { id: poke.id }) :
            this.pageController.navigate('detail', { name: poke.name })
    }

    filterList(e) {
        this.page = 0;
        this.isNew = e.detail === 'new' ? true : false;
        this.getPokeList();
        this.dispatchEvent(event);
    }

    includeToFav(name) {
        this.pageController.publish('ch_favs_inc', name);
    }

    excludeToFav(name) {
        this.pageController.publish('ch_favs_ex', name);
    }

    prev() {
        this.page--;
        this.getPokeList();
    }

    next() {
        this.page++;
        this.getPokeList();
    }
}

customElements.define('list-page', ListPage);