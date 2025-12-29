import { LitElement, html, css } from "lit";

class PokeDesc extends LitElement {

    static styles = css`
        .mainCont {
            text-align: center;
            display: flex;
        }
        .label {
            font-weight: bold;
            flex-basis: 8rem;
            text-align: left;
        }
        .value {

        }
    `;

    static properties = {
        label: { type: String },
        value: { type: String }
    }

    render() {
        return html`
            <div class="mainCont">
                <div class="label">${this.label}</div>
                <div class="value"><slot>${this.value}</slot></div>
            </div>
        `;
    }
}

customElements.define('poke-desc', PokeDesc);