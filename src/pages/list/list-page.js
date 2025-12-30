import { LitElement, html, css, nothing, unsafeCSS } from "lit";
import { PageController } from '@open-cells/page-controller';
import { getAllPokemon, getPokemon } from '../../service/poke-service.js';
import { map } from 'lit/directives/map.js';
import bulma from 'bulma/css/bulma.css?inline';
import '../../components/loading-warn.js';
import '../../components/main-subhead.js';

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
        favs: {state: true}
    }

    page = 0;
    pageMax = 0;

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

    getPokemonPage(e) {
        const {detail} = e;
        this.loading = true;
        getAllPokemon(detail.page * LIMIT, LIMIT)
            .then(result => {
                this.pageMax = result.data.count / LIMIT;
                this.setPageInPath(detail.page);
                return Promise.all(result.data.results.map(poke => getPokemon(poke.name)))
            })
            .then(list => {
                this.pokeList = list.map(e => ({
                    id: e.data.id,
                    pic: e.data.sprites.front_default,
                    name: e.data.name
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
            <div>
                <div>
                    <table class="table is-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Pic</th>
                                <th>Name</th>
                                <th>Detail</th>
                                <th>Fav</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${map(this.pokeList, poke => html`
                                    <tr>
                                        <td>${poke.id}</td>
                                        <td><img class="pic" src=${poke.pic} /></td>
                                        <td class="is-capitalized">${poke.name}</td>
                                        <td>
                                            <button 
                                                class="button"
                                                @click="${() => this.pageController.navigate('detail', {name: poke.name})}"
                                            >
                                                Detail
                                            </button>
                                        </td>
                                        <td>
                                            <button @click="${() => this.isFav(poke.name) ? this.excludeToFav(poke.name) : this.includeToFav(poke.name)}">
                                                ${this.isFav(poke.name) ? '❤️' : '🖤'}
                                            </button>
                                        </td>
                                    </tr>
                                `)}
                        </tbody>
                    </table>
                </div>
                <div class="paginator">
                    <button class="button is-primary is-medium" @click=${this.prev} ?disabled=${this.page === 0}>Prev</button>
                    <button class="button is-primary is-medium" @click=${this.next} ?disabled=${this.page === this.pageMax}>Next</button>
                </div>
            </div>
        `;
    }

    render() {
        const loadingTpl = html`<loading-warn></loading-warn>`;
        const errorTpl = html`<p>Hubo un error</p>`;

        return html`
            <main-subhead title="List"></main-subhead>
            ${this.loading ? loadingTpl : nothing}
            ${!this.loading && this.pokeList ? this.renderTable() : nothing}
            ${!this.loading && this.error ? errorTpl : nothing}
        `;
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
            detail: { page: this.page }
        });
        this.dispatchEvent(event);
    }

    next() {
        this.page++;
        const event = new CustomEvent('changePage', {
            detail: { page: this.page }
        });
        this.dispatchEvent(event);
    }
}

customElements.define('list-page', ListPage);