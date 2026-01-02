import { LitElement, html, css, unsafeCSS, nothing } from 'lit';
import { ElementController } from '@open-cells/element-controller';
import './modal/new-poke-modal.js';

export class ModalCont extends LitElement {

  elementController = new ElementController(this);

  constructor() {
    super();
    this.handleConnections();
    this.openNewPokeModal = false;
  }

  static properties = {
    openNewPokeModal: {state: true, default: false}
  }

  handleConnections() {
    this.elementController.subscribe('ch_newpoke', this.handleNewPokeModal.bind(this));
  }

  handleNewPokeModal(command) {
    console.log('handleNewPokeModal', command);
    switch(command) {
        case 'open':
            this.openNewPokeModal = true;
            break;
        case 'close':
        case 'cancel':
            this.openNewPokeModal = false;
    }
  }

  render() {
    return html`
      ${this.openNewPokeModal ? html`<new-poke-modal></new-poke-modal>` : nothing}
    `;
  }
}

customElements.define('modal-cont', ModalCont);