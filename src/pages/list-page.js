import { LitElement, html, css, nothing, unsafeCSS } from "lit";
import { PageController } from '@open-cells/page-controller';
import { getAllPokemon, getListNewPokemon, getPokemon } from '../service/poke-service.js';
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

    page = 0;
    pageMax = 0;
    isNew = false;

    constructor() {
        super();
        this.pokeList = [];
        this.loading = true;
        this.error = false;
        this.favs = [];
        this.page = this.getPageFromPath();
        this.isNew = this.getFilterFromPath() === 'new' ? true : false;
        this.handleConnections();
    }

    handleConnections() {
        this.addEventListener('changePage', this.getPokemonPage);
        this.pageController.subscribe('ch_favs_inc', (poke) => {
            this.favs = [...this.favs, poke];
        });
        this.pageController.subscribe('ch_favs_ex', (poke) => {
            this.favs = this.favs.filter(p => p !== poke);
        });
        this.pageController.subscribe('ch_newpoke', (command) => {
            if(command === 'created' && this.isNew) {
                this.page = 0;
                const event = new CustomEvent('changePage', {
                    detail: { page: this.page }
                });
                this.dispatchEvent(event);
            }
        });
    }

    connectedCallback() {
        super.connectedCallback();
        const event = new CustomEvent('changePage', {
            detail: { page: this.page }
        });
        this.dispatchEvent(event);
    }

    disconnectedCallback() {
        this.removeEventListener('changePage', this.getPokemonPage);
        super.disconnectedCallback();
    }

    getPokemonPage() {
        this.isNew ? this.getNewPokemonPage() : this.getListPokemonPage();
    }

    getListPokemonPage() {
        this.loading = true;
        getAllPokemon(this.page * LIMIT, LIMIT)
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

    getNewPokemonPage() {
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

    getPageFromPath() {
        const url = new URL(window.location.href);
        const page = url.searchParams.get('page') !== null ? url.searchParams.get('page') : 0;
        return page;
    }

    getFilterFromPath() {
        const url = new URL(window.location.href);
        const page = url.searchParams.get('filter') !== null ? url.searchParams.get('list') : 0;
        return page;
    }

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

    clickDetail(poke) {
        this.isNew ?
            this.pageController.navigate('detail-new', { id: poke.id }) :
            this.pageController.navigate('detail', { name: poke.name })
    }

    filterList(e) {
        this.page = 0;
        this.isNew = e.detail === 'new' ? true : false;
        const event = new CustomEvent('changePage', {composed: false, bubbles: false});
        this.dispatchEvent(event);
    }

    isFav(name) {
        return this.favs.find(p => p === name);
    }

    includeToFav(name) {
        this.pageController.publish('ch_favs_inc', name);
    }

    excludeToFav(name) {
        this.pageController.publish('ch_favs_ex', name);
    }

    prev() {
        this.page--;
        const event = new CustomEvent('changePage', {composed: false, bubbles: false});
        this.dispatchEvent(event);
    }

    next() {
        this.page++;
        const event = new CustomEvent('changePage', { composed: false, bubbles: false});
        this.dispatchEvent(event);
    }
}

customElements.define('list-page', ListPage);