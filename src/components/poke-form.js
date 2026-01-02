import { LitElement, html, css, nothing, unsafeCSS } from "lit";
import { map } from 'lit/directives/map.js';
import bulma from 'bulma/css/bulma.css?inline';
import { pokeTypes, pokeValSchema } from "../models/pokemon";

class PokeForm extends LitElement {

    createRenderRoot() {
        return this;
    }

    static properties = {
        initial: {type: Object},
        poke: {state: true}
    };

    constructor() {
        super();
        this.poke = {
            name: '',
            height: '',
            weight: '',
            types: []
        }
    }

    willUpdate(changedProperties) {
        if (changedProperties.has('initial') && this.initial) {
            this.poke = {
                name: this.initial.name ?? '',
                height: this.initial.height ?? 0,
                weight: this.initial.weight ?? 0,
                types: this.initial.types ?? []
            }
        }
    }

    renderStyle() {
        return html`
            <style>
                ${unsafeCSS(bulma)}
                ${css`
                    .field {
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                    }
                    .field label {
                        
                    }
                    .field input, .field select {
                        width: 100%;            
                        padding: 0.5rem;
                        box-sizing: border-box;
                    }   
                `}
            </style>
        `;
    }

    render() {
        return html`
            ${this.renderStyle()}
            <div class="field">
                <label for="name">Name</label>
                <input 
                    class="input" 
                    id="name" 
                    name="name" 
                    type="text"
                    .value=${this.poke.name}
                    @input=${e => this.changeInput('name', e.target.value)}
                />
            </div>
            <div class="field">
                <label for="height">Height</label>
                <input 
                    class="input" 
                    id="height" 
                    name="height" 
                    type="text"
                    .value=${this.poke.height} 
                    @input=${(e)=> this.changeInput('height', Number(e.target.value))}
                />
            </div>
            <div class="field">
                <label for="weight">Weight</label>
                <input 
                    class="input" 
                    id="weight" 
                    name="weight" 
                    type="text"
                    .value=${this.poke.weight} 
                    @input=${(e)=> this.changeInput('weight', Number(e.target.value))}
                />
            </div>
            <div class="field">
                <label for="types">Types</label>
                <div class="select is-multiple">
                    <select 
                        id="types" 
                        name="types"
                        multiple 
                        size="5"
                        @input=${(e)=> this.changeInput(
                            'types', 
                            Array.from(e.target.selectedOptions).map(o => o.value)
                        )}
                     >
                        ${map(pokeTypes, type => html`
                            <option 
                                value="${type}" 
                                ?selected=${this.poke.types.includes(type)}
                            >
                                ${type}
                            </option>`
                        )}
                    </select>
                </div>
            </div>
        `;
    }

    changeInput(name, val) {
        this.poke[name] = val;
        this.showFormInfo();
        this.checkErrors();
    }

    showFormInfo() {
        const event = new CustomEvent(
            'update', 
            { 
                detail: JSON.parse(JSON.stringify(this.poke)), 
                composed: true, 
                bubbles: false 
            }
        );
        this.dispatchEvent(event);
    }

    checkErrors() {
        const error = pokeValSchema.safeParse(this.poke);
        const event = new CustomEvent(
            'error', 
            { detail: error, composed: true, bubbles: false }
        );
        this.dispatchEvent(event);
    }

}

customElements.define('poke-form', PokeForm);