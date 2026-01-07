import { LitElement, html, css, nothing, unsafeCSS } from "lit";
import { ElementController } from '@open-cells/element-controller';
import bulma from 'bulma/css/bulma.css?inline';

class BaseModal extends LitElement {

    static styles = [
        unsafeCSS(bulma),
        css`
            .overlay {
                position: fixed;
                z-index: 10;
                background-color: rgb(34 45 40 / 76%);
                top: 0;
                left: 0;
                min-width: 100vh;
                min-height: 100vh;
                width: 100%;
            }

            .mainCont {
                position: fixed;
                z-index: 11;
                top: 5rem;
                left: calc(50% - 26rem / 2);
                width: 26rem;

                display: flex;
                flex-direction: column;
                gap: 1rem;
            } 

            .mainCont header {
                display: flex;
                justify-content: center;
                align-items: flex-start;
            } 

            .mainCont header h2 {
                flex-grow: 1;
                margin-bottom: 0;
            } 

            .mainCont section {
                
            } 

            .mainCont footer {
                display: flex;
                justify-content: end;
                align-items: center;
                gap: 1rem;
            } 
        `
    ]

    static properties = {
        title: { type: String},
        labelAccept: { type: String },
        labelCancel: { type: String }
    }

    render() {
        return html`
            <div class="mainCont box">
                <header>
                    <h2 class="title is-4">${this.title}</h2>
                    <button class="button is-primary is-small is-rounded" @click="${this.handleClose}">X</button>
                </header>
                <section>
                    <slot></slot>
                </section>
                <footer>
                   ${this.labelCancel ? html`<button class="button" @click=${this.handleCancel}>${this.labelCancel}</button>` : nothing }
                   ${this.labelAccept ? html`<button class="button is-primary" @click=${this.handleAccept}>${this.labelAccept}</button>` : nothing }
                </footer>
            </div>
            <div class="overlay"></div>
        `;
    }

    handleClose() {
        const event = new CustomEvent(
            'close', 
            { detail: 'close', composed: true, bubbles: false }
        );
        this.dispatchEvent(event);
    }

    handleCancel() {
        const event = new CustomEvent(
            'cancel', 
            { detail: 'cancel', composed: true, bubbles: false }
        );
        this.dispatchEvent(event);
    }

    handleAccept() {
        const event = new CustomEvent(
            'accept', 
            { detail: 'accept', composed: true, bubbles: false }
        );
        this.dispatchEvent(event);
    }
}

customElements.define('base-modal', BaseModal);