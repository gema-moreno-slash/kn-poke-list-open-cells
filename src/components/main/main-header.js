import { LitElement, html, css, unsafeCSS } from "lit";
import { ElementController } from '@open-cells/element-controller';
import { map } from 'lit/directives/map.js';
import bulma from 'bulma/css/bulma.css?inline';

class MainHeader extends LitElement {

    elementController = new ElementController(this);

    static styles = [
        unsafeCSS(bulma),
        css`
            .mainCont {
                padding: 2rem 2rem;
                display: flex;
            }
            .actions {
                flex-grow: 1;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                gap: 2rem;
            }
            .pic {
                height: 96px;
                width: 96px;
            }
        `
    ]

    static properties = {
        favs: { state: true },
        mode: { type: String }
    }

    constructor() {
        super();
        this.favs = [];
        this.mode = 'dark';
        this.handleConnections();
    }

    handleConnections() {
        this.elementController.subscribe('ch_favs_inc', (poke) => {
            this.favs = [...this.favs, poke];
        });
        this.elementController.subscribe('ch_favs_ex', (poke) => {
            this.favs = this.favs.filter(p => p !== poke);
        });
    }

    render() {
        const renderActions = html`
            <button class="button is-primary" @click=${this.newPoke}>New</button>
            <div class="control">
                <div class="select">
                    <select @change=${this.selectFav}>
                        <option selected value="default">Favs</option>
                        ${map(this.favs, (f) => html`<option value="${f}">${f}</option>`)}
                    </select>
                </div>
            </div>
            <button class="button" @click=${this.clickMode}>
                ${this.mode === 'dark' ? 'Dark 🌛' : 'Light 🌞'}
            </button>
        `;

        return html`
            <header class="mainCont">
                <div class="title">
                    <h1 class="title is-1">KN - Pokemon List</h1>
                </div>
                <div class="actions">
                    ${renderActions}
                </div>
            </header>
        `;
    }

    newPoke() {
        this.elementController.publish('ch_newpoke', 'open');
    }

    selectFav(event) {
        const name = event.target.value;
        name !== 'default' && this.elementController.navigate('detail', {name})
    }

    clickMode() {
        const e = new CustomEvent('change-mode', { bubbles: false, composed: true });
        this.dispatchEvent(e);
    }
}

customElements.define('main-header', MainHeader);