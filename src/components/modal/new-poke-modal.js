import { LitElement, html, css, nothing, unsafeCSS } from "lit";
import { ElementController } from '@open-cells/element-controller';
import bulma from 'bulma/css/bulma.css?inline';
import "./base-modal";
import "../poke-form";

class NewPokeModal extends LitElement {

    elementController = new ElementController(this);

    render() {
        return html`
            <base-modal
                title="Create New Pokemon"
                labelAccept="Create"
                labelCancel="Cancel"
                @close=${this.handleClose}
                @cancel=${this.handleCancel}
                @accept=${this.handleAccept}
            >
                <form>
                    <poke-form></poke-form>
                </form>
            </base-modal>
        `;
    }

    handleClose() {
        this.elementController.publish('ch-newpoke', 'close');
    }

    handleCancel() {
        this.elementController.publish('ch-newpoke', 'cancel');
    }

    handleAccept() {
        this.elementController.publish('ch-newpoke', 'accept');
        const form = this.shadowRoot.querySelector('form');  
        const formData = new FormData(form);
        const pokeData = {
            name: formData.get('name'),
            height: formData.get('height'),
            weight: formData.get('weight'),
            types: formData.getAll('types')
        };
        console.log('Form:', formData);
        console.log('Form submitted:', pokeData);
    }
}

customElements.define('new-poke-modal', NewPokeModal);