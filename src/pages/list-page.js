import { LitElement, html, css, nothing, unsafeCSS } from "lit";
import { PageController } from '@open-cells/page-controller';
import { getAllPokemon, getAllNewPokemon, getPokemon } from '../service/poke-service.js';
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
        this.handleConnections();
    }

    handleConnections() {
        this.pageController.subscribe('ch_favs_inc', (poke) => {
            this.favs = [...this.favs, poke];
        });
        this.pageController.subscribe('ch_favs_ex', (poke) => {
            this.favs = this.favs.filter(p => p !== poke);
        });
    }

    connectedCallback() {
        super.connectedCallback();
        this.page = this.getPageFromPath();
        this.addEventListener('changePage', this.getPokemonPage);
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
        this.isNew ? this.getNewPokemonPage(...arguments) : this.getListPokemonPage(...arguments);
    }

    getListPokemonPage(e) {
        const {detail} = e;
        this.loading = true;
        getAllPokemon(detail.page * LIMIT, LIMIT)
            .then(result => {
                this.pageMax = result.data.count / LIMIT;
                this.setPageInPath(detail.page);
                return Promise.all(result.data.results.map(poke => getPokemon(poke.name)))
            })
            .then(list => {
                console.log(list);
                this.pokeList = list.map(e => ({
                    id: e._id,
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

    getNewPokemonPage(e) {
        const {detail} = e;
        this.loading = true;
        getAllNewPokemon(detail.page * LIMIT, LIMIT)
            .then(result => {
                this.pageMax = result.data.count / LIMIT;
                this.setPageInPath(detail.page);
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

    setPageInPath(page) {
        const url = new URL(window.location.href);
        url.searchParams.set('page', page);
        window.history.pushState({}, '', url);
    }

    getPageFromPath() {
        const url = new URL(window.location.href);
        const page = url.searchParams.get('page') !== null ? url.searchParams.get('page') : 0;
        return page;
    }

    renderTable() {
        return html`
            <poke-table 
                .pokeList=${[...this.pokeList]}
                .favs=${this.favs}
                page=${this.page}
                pageMax=${this.pageMax}
                @clickFavs=${(opt) => opt.detail === 'inc' ? this.includeToFav() : this.excludeToFav}
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

    filterList(e) {
        this.page = 0;
        this.isNew = e.detail === 'new' ? true : false;
        const event = new CustomEvent('changePage', {
            detail: { page: this.page }, composed: false, bubbles: false
        });
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
        const event = new CustomEvent('changePage', {
            detail: { page: this.page }, composed: false, bubbles: false
        });
        this.dispatchEvent(event);
    }

    next() {
        this.page++;
        const event = new CustomEvent('changePage', {
            detail: { page: this.page }, composed: false, bubbles: false
        });
        this.dispatchEvent(event);
    }
}

customElements.define('list-page', ListPage);