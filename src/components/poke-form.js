import { LitElement, html, css, nothing, unsafeCSS } from "lit";
import { map } from 'lit/directives/map.js';
import bulma from 'bulma/css/bulma.css?inline';

const pokeTypes = [
    'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting',
    'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',
    'dark', 'dragon', 'steel', 'fairy'
];

class PokeForm extends LitElement {

    createRenderRoot() {
        return this;
    }

    static properties = {
        poke: {type: Object}
    };

    constructor() {
        super();
        this.name = '';
        this.height = '';
        this.weight = '';
        this.types = [];
    }

    willUpdate(changedProperties) {
        if (changedProperties.has('poke') && this.poke) {
            this.name = this.poke.name ?? '';
            this.height = this.poke.height ?? '';
            this.weight = this.poke.weight ?? '';
            this.types = this.poke.types ?? [];
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
                    .value=${this.name}
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
                    .value=${this.height} 
                    @input=${(e)=> this.changeInput('height', e.target.value)}
                />
            </div>
            <div class="field">
                <label for="weight">Weight</label>
                <input 
                    class="input" 
                    id="weight" 
                    name="weight" 
                    type="text"
                    .value=${this.weight} 
                    @input=${(e)=> this.changeInput('weight', e.target.value)}
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
                                ?selected=${this.types.includes(type)}
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
        this[name] = val;
        this.showFormInfo();
    }

    showFormInfo() {
        const detail = {
            name: this.name,
            height: this.height,
            weight: this.weight,
            types: this.types
        }
        const event = new CustomEvent(
            'update', 
            { detail, composed: true, bubbles: false }
        );
        this.dispatchEvent(event);
    }

}

customElements.define('poke-form', PokeForm);