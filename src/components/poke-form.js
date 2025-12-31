import { LitElement, html, css, nothing, unsafeCSS } from "lit";
import { map } from 'lit/directives/map.js';
import bulma from 'bulma/css/bulma.css?inline';

const pokeTypes = [
    'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting',
    'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',
    'dark', 'dragon', 'steel', 'fairy'
];

const defaultValues = {
    name: '',
    height: '',
    weight: '',
    types: []
}

class PokeForm extends LitElement {

    static properties = {
        pokeForm: { state: true },
        poke: { type: Object }
    }

    createRenderRoot() {
        return this;
    }

    constructor() {
        super();
        this.pokeForm = { ...defaultValues };
    }

    connectedCallback() {
        super.connectedCallback();
        this.initForm();
    }

    initForm() {
        const form = this.shadowRoot.querySelector('form');
        /*
        form.elements['name'].value = this.pokeForm.name;
        form.elements['height'].value = this.pokeForm.height;
        form.elements['weight'].value = this.pokeForm.weight;
        form.elements['types'].value = this.pokeForm.types;
        */
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
                <input class="input" id="name" name="name" type="text" />
            </div>
            <div class="field">
                <label for="height">Height</label>
                <input class="input" id="height" name="height" type="text" />
            </div>
            <div class="field">
                <label for="weight">Weight</label>
                <input class="input" id="weight" name="weight" type="text" />
            </div>
            <div class="field">
                <label for="types">Types</label>
                <div class="select is-multiple">
                    <select id="types" name="types" multiple size="5">
                        ${map(pokeTypes, type => html`<option value="${type}">${type}</option>`)}
                    </select>
                </div>
            </div>
        `;
    }



}

customElements.define('poke-form', PokeForm);