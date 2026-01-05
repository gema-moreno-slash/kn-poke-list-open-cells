import { LitElement, html, css, nothing, unsafeCSS } from "lit";
import { Task } from '@lit/task';
import { PageController } from '@open-cells/page-controller';
import { getPokemon, getNewPokemon } from '../service/poke-service';
import { map } from 'lit/directives/map.js';
import picDefault from '../../images/pokeball.png';
import bulma from 'bulma/css/bulma.css?inline';
import '../components/poke-desc';
import '../components/loading-warn';
import '../components/main/main-subhead.js';
import { is } from "zod/v4/locales";

class DetailPage extends LitElement {

    pageController = new PageController(this);

    static properties = {
        poke: { state: true }
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

    constructor() {
        super();
        this.error = false;
    }

    onPageEnter() {
        console.log('page enter');
        const nameRoute = this.pageController.getCurrentRoute().name;
        console.log('nameRoute', nameRoute)
/*
        if (nameRoute === 'detail-new') {
            const id = this.pageController.getCurrentRoute().params.id;
            this.pokeTask = new Task(this, {
                task: async ([id]) => {
                    return await getNewPokemon(id);
                },
                args: () => [id]
            });
        } else {
            const name = this.pageController.getCurrentRoute().params.name;
            this.pokeTask = new Task(this, {
                task: async ([name]) => {
                    return await getPokemon(name);
                },
                args: () => [name]
            });
        }
            */
    }

    renderDetail(poke) {
        const height = html`${poke.height * 10} cm`;
        const weight = html`${poke.weight / 10} kg`;
        const types = map(poke.types, (t) => html`<span class="tag is-capitalized">${t.type.name}</span>`)

        return html`
            <div class="card">
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image">
                                <img class="pic" src=${poke.sprites?.front_default ?? picDefault} />
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="is-capitalized title is-4">${poke.name}</p>
                            <p class="subtitle is-6"># ${poke.id}</p>
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
        return "Detail Page - under construction";
        /*
        return html`
            <main-subhead title="Detail" back="true"></main-subhead>
            ${this.pokeTask.render({
                pending: () => html`<loading-warn></loading-warn>`,
                complete: (poke) => html`${this.renderDetail(poke)}`,
                error: (e) => html`<p>Hubo un error</p>`
            })}
        `;
        */
    }

}

customElements.define('detail-page', DetailPage);