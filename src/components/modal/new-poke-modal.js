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
                align-items: center;
                gap: 1rem;
            }

            .actions p {
                flex-grow: 1;
            }
        `
    ]

    static properties = {
        message: {state: true},
        disabled: {state: true},
        disabledBtn: {state: true},
    }

    constructor() {
        super();
        this.message = '';
        this.disabled = false;
        this.disabledBtn = true;
    }

    render() {
        const test = {
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
                            <poke-form 
                                .initial=${test}
                                @update=${this.updateForm}
                                @error=${this.errorForm}
                            >
                            </poke-form>
                        </div>
                        <div class="actions">
                            <p>${this.message}</p>
                            <button 
                                type="button" 
                                ?disabled=${this.disabled}
                                @click=${this.handleClose}
                                class="button"
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit" 
                                ?disabled=${this.disabledBtn}
                                class=${classMap({
                                    button: true,
                                    ["is-primary"]: true,
                                    ["is-loading"]: this.disabled,
                                })}
                            >
                                Crear
                            </button>
                        </div>
                    </fieldset>
                </form>
            </base-modal>
        `;
    }

    updateForm(e) {
        console.log('updateForm', e.detail)
        this.valueForm = e.detail;
    }

    errorForm(e) {
        console.log('errorForm', e.detail)
        this.error = e.detail;
        this.disabledBtn = !this.error.success;
    }

    submitForm(e) {
        e.preventDefault();
        this.disabled = true;

        if(this.error.success)
            this.createPokemon(this.valueForm);
        else
            this.disabled = false;
    }

    createPokemon(poke) {
        createPokemon(poke)
            .then(res => {
                this.message = 'Pokémon created successfully!';
                this.elementController.publish('ch_newpoke', 'created');
            })
            .catch(err => this.message = err.message)
            .finally(() => this.disabled = false)
    }

    handleClose() {
        this.elementController.publish('ch_newpoke', 'close');
    }
}

customElements.define('new-poke-modal', NewPokeModal);