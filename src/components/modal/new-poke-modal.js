import { LitElement, html, css, nothing, unsafeCSS } from "lit";
import { ElementController } from '@open-cells/element-controller';
import bulma from 'bulma/css/bulma.css?inline';
import "./base-modal";
import "../poke-form";

class NewPokeModal extends LitElement {

    elementController = new ElementController(this);

    static styles = [
        css`
            form {
                display: flex;
                flex-direction: column;
                gap: 2rem;
            }

            .actions {
                display: flex;
                justify-content: end;
            }
        `
    ]

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
                    <div>
                        <poke-form @update=${this.updateForm}></poke-form>
                    </div>
                    <div class="actions">
                        <button type="submit" class="button is-primary">Crear</button>
                    </div>
                </form>
            </base-modal>
        `;
    }

    updateForm(e) {
        console.log('updateForm', e.detail)
    }

    submitForm(e) {
        e.preventDefault();
        const form = this.renderRoot.querySelector('form');
        const fd = new FormData(form);
        console.log(fd.getAll('types'));
    }

    handleClose() {
        this.elementController.publish('ch-newpoke', 'close');
    }
}

customElements.define('new-poke-modal', NewPokeModal);