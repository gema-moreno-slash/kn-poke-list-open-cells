import { LitElement, html, css, nothing, unsafeCSS } from "lit";
import { ElementController } from '@open-cells/element-controller';
import { getListPokemon, getPokemon } from '../service/poke-service.js';
import { map } from 'lit/directives/map.js';
import bulma from 'bulma/css/bulma.css?inline';
import '../components/loading-warn.js';
import '../components/main/main-subhead.js';

const LIMIT = 5;

class PokeTable extends LitElement {

    elementController = new ElementController(this);

    static styles = [
        unsafeCSS(bulma),
        css`
            .tableCont {
                display: flex;
                flex-direction: column;
                gap: 2rem;
            }
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
        pokeList: { type: Array },
        favs: { type: Array },
        page: { type: Number },
        pageMax: { type: Number }
    }

    constructor() {
        super();
        this.pokeList = [];
        this.page = 0;
        this.pageMax = 0;
    }

    renderFavsCol(poke) {
        return html`
            <td>
                <button @click="${() => this.isFav(poke.name) ? this.excToFav(poke.name) : this.incToFav(poke.name)}">
                    ${this.favs.find(p => p === poke.name) ? '❤️' : '🖤'}
                </button>
            </td>
        `;
    }

    render() {
        const header = html`
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Pic</th>
                    <th>Name</th>
                    <th>Detail</th>
                    ${this.favs ? html`<th>Fav</th>` : nothing}
                </tr>
            </thead>
        `;
        const body = html`
            <tbody>
                ${map(this.pokeList, poke => html`
                        <tr>
                            <td>${poke.id}</td>
                            <td><img class="pic" src=${poke.pic} /></td>
                            <td class="is-capitalized">${poke.name}</td>
                            <td>
                                <button 
                                    class="button"
                                    @click="${() => this.clickDetail(poke)}"
                                >
                                    Detail
                                </button>
                            </td>
                            ${this.favs ? this.renderFavsCol(poke) : nothing}
                        </tr>
                    `)}
            </tbody>
        `;
        return html`
            <div class="tableCont">
                <div>
                    <table class="table is-striped">
                        ${header}
                        ${body}
                    </table>
                </div>
                <div class="paginator">
                    <button class="button is-primary is-medium" @click=${this.prev} ?disabled=${this.page === 0}>Prev</button>
                    <button class="button is-primary is-medium" @click=${this.next} ?disabled=${this.page === this.pageMax}>Next</button>
                </div>
            </div>
        `;
    }

    clickDetail(poke) {
        const event = new CustomEvent('clickDetail', {
             detail: poke, composed: true, bubbles: false
        });
        this.dispatchEvent(event);
    }

    incToFav(name) {
        const event = new CustomEvent('clickFavs', {
            detail: {command: 'inc', name}, composed: true, bubbles: false
        });
        this.dispatchEvent(event);
    }

    excToFav(name) {
        const event = new CustomEvent('clickFavs', {
            detail: {command: 'exc', name}, composed: true, bubbles: false
        });
        this.dispatchEvent(event);
    }

    prev() {
        const event = new CustomEvent('clickPage', {
            detail: 'prev', composed: true, bubbles: false
        });
        this.dispatchEvent(event);
    }

    next() {
        const event = new CustomEvent('clickPage', {
            detail: 'next', composed: true, bubbles: false
        });
        this.dispatchEvent(event);
    }
}

customElements.define('poke-table', PokeTable);