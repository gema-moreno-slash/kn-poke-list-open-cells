import { LitElement, html, css, unsafeCSS, nothing } from "lit";
import bulma from 'bulma/css/bulma.css?inline';

class MainSubhead extends LitElement {
    static styles = [
        unsafeCSS(bulma),
        css`
            .subHeader {
                display: flex;
                gap: 1rem;
                margin-bottom: 2rem;
            }
        `
    ]

    static properties = {
        title: {type: String},
        back: {type: Boolean}
    }

    constructor() {
        super();
        this.back = false;
    }

    render() {
        return html`
            <div class="subHeader">
                ${this.back ? html`<button class="button is-primary is-link" @click=${() => window.history.back()}>Back</button>` : nothing }
                <h2 class="title is-2">${this.title}</h2>
            </div>
        `;
    }
}

customElements.define('main-subhead', MainSubhead);