import { LitElement, html, css, nothing, unsafeCSS } from "lit";
import { PageController } from '@open-cells/page-controller';
//import { getPokemon } from '../service/poke-service';
import { map } from 'lit/directives/map.js';
//import bulma from 'bulma/css/bulma.css?inline';
//import '../components/poke-desc';
//import '../components/loading-warn';

class DetailPage extends LitElement {


    pageController = new PageController(this);

    createRenderRoot() {
        return this;
    }

    /*
    static properties = {
        name: { type: String },
        poke: { state: true },
        loading: { state: true },
        error: { state: false }
    }

    constructor() {
        super();
        this.loading = true;
        this.error = false;
    }

    static styles = [
        unsafeCSS(bulma),
        css`
            .pic {
                height: 96px;
                width: 96px;
            }

            .card {
                max-width: 20rem;
            }

            .no-border {
                border: none;
            }

            .descList {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
        `
    ]

    connectedCallback() {
        super.connectedCallback();
        // Fake loading delay
        setTimeout(() => {
            getPokemon(this.name)
                .then(result => this.poke = result.data)
                .catch(err => {
                    this.error = true;
                    console.log(err);
                })
                .finally(() => this.loading = false)
        }, 1000)
    }

    renderDetail() {

        const height = html`${this.poke.height * 10} cm`;
        const weight = html`${this.poke.weight / 10} kg`;
        const types = map(this.poke.types, (t) => html`<span class="tag is-capitalized">${t.type.name}</span>`)

        return html`
            <div class="card">
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image">
                                <img class="pic" src=${this.poke.sprites.front_default} />
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="is-capitalized title is-4">${this.poke.name}</p>
                            <p class="subtitle is-6"># ${this.poke.id}</p>
                        </div>
                    </div>
                    <div>
                        <ul class="descList">
                            <li><poke-desc label="Height" .value=${height}></poke-desc></li>
                            <li><poke-desc label="Weight" .value=${weight}></poke-desc></li>
                            <li>
                                <poke-desc label="Types">
                                    <div class="tags">${types}</div>
                                </poke-desc>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    }

    render() {
        const loadingTpl = html`<loading-warn></loading-warn>`;
        const errorTpl = html`<p>Hubo un error</p>`;

        return html`
            ${this.loading ? loadingTpl : nothing}
            ${!this.loading && this.poke ? this.renderDetail() : nothing}
            ${!this.loading && this.error ? errorTpl : nothing}
        `;
    }
        */

    render() {
        return html`
        <button @click="${() => this.pageController.navigate('list')}">List</button>
        <p>Detail Page</p>
        `;
    }
}

customElements.define('detail-page', DetailPage);