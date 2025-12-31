import { LitElement, html, css, nothing, unsafeCSS } from "lit";
import { ElementController } from '@open-cells/element-controller';
import { classMap } from "lit/directives/class-map.js";
import { createPokemon } from '../../service/poke-service';
import bulma from 'bulma/css/bulma.css?inline';
import "./base-modal";
import "../poke-form";

class NewPokeModal extends LitElement {

    elementController = new ElementController(this);

    static styles = [
        css`
            form fieldset {
                display: flex;
                flex-direction: column;
                gap: 2rem;
            }

            .actions {
                display: flex;
            }

            .actions p {
                flex-grow: 1;
            }
        `
    ]

    static properties = {
        message: {state: true},
        disabled: {state: true}
    }

    constructor() {
        super();
        this.message = '';
        this.disabled = false;
    }

    render() {
        const poke = {
            name: 'periko'
        }
        return html`
            <base-modal
                title="Create New Pokemon"
                @close=${this.handleClose}
            >
                <form @submit=${this.submitForm}>
                    <fieldset ?disabled=${this.disabled}>
                        <div>
                            <poke-form @update=${this.updateForm}></poke-form>
                        </div>
                        <div class="actions">
                            <p>${this.message}</p>
                            <button 
                                type="submit" 
                                class="button is-primary"
                                class=${classMap({
                                    button: true,
                                    ["is-primary"]: true,
                                    ["is-loading"]: this.disabled,
                                })}
                            >
                                Crear
                            </button>
                        </div>
                    <fieldset id="formFieldset">
                </form>
            </base-modal>
        `;
    }

    updateForm(e) {
        console.log('updateForm', e.detail)
    }

    submitForm(e) {
        e.preventDefault();
        this.disabled = true;

        const form = this.renderRoot.querySelector('form');
        const fd = new FormData(form);
        const newPoke = {
            name: fd.get('name'),
            height: fd.get('height'),
            weight: fd.get('weight'),
            types: fd.get('types'),
        }
        
        this.createPokemon()
    }

    createPokemon(poke) {
        setTimeout(() => {
            createPokemon(poke)
                .then(res => this.message = JSON.stringify(res))
                .catch(err => this.message = err.message)
                .finally(() => this.disabled = false)
        }, 2000)
    }

    handleClose() {
        this.elementController.publish('ch-newpoke', 'close');
    }
}

customElements.define('new-poke-modal', NewPokeModal);