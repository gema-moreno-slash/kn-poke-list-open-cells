import { LitElement, html, css, unsafeCSS } from "lit";
import bulma from 'bulma/css/bulma.css?inline';

class LoadingWarn extends LitElement {

    static styles = [
        unsafeCSS(bulma),
        css`
            .no-border {
                border: none;
            }

        `
    ]

    render() {
        return html`
            <button class="button is-loading is-rounded is-large no-border">Loading</button>
        `;
    }
}

customElements.define('loading-warn', LoadingWarn);