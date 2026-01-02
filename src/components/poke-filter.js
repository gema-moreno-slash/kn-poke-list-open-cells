import { LitElement, html, css, nothing, unsafeCSS } from "lit";
import { getAllPokemon, getPokemon } from '../service/poke-service.js';
import { map } from 'lit/directives/map.js';
import bulma from 'bulma/css/bulma.css?inline';
import '../components/loading-warn.js';
import '../components/main/main-subhead.js';

const LIMIT = 5;

class PokeFilter extends LitElement {

    static styles = [
        unsafeCSS(bulma),
        css`
            .mainCont {
                display: flex;
                justify-content: end;
                margin-bottom: 2rem;
            }
            .control {
                display: flex;
                gap: 1rem;
            }
            .control .title {
                margin-right: 1rem;
            }
        `
    ]

    static properties = {
        isNew: { type: Boolean },
    }

    constructor() {
        super();
        this.isNew = false;
    }

    render() {
        return html`
            <div class="mainCont">
                <form class="control" @input=${(e) => this.selectOpt(e.target.value)}>
                    <span class="title is-6">Filters</span>
                    <label class="radio">
                        <input type="radio" name="filter" value="list" ?checked=${!this.isNew} />
                        List
                    </label>
                    <label class="radio">
                        <input type="radio" name="filter" value="new" ?checked=${this.isNew} />
                        New
                    </label>
                </form>
            </div>
        `;
    }

    selectOpt(val) {
        const e = new CustomEvent('selectFilter', {
            detail: val,
            composed: true,
            bubbles: false
        });
        this.dispatchEvent(e);
    }
}

customElements.define('poke-filter', PokeFilter);