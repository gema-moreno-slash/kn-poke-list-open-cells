import { LitElement, html, css, unsafeCSS } from "lit";
import {ElementController} from '@open-cells/element-controller';
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
            }
            .pic {
                height: 96px;
                width: 96px;
            }
        `
    ]

    static properties = {
        favs: {state: true}
    }

    constructor() {
        super();
        this.favs = [];
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
        return html`
            <header class="mainCont">
                <div class="title">
                    <h1 class="title is-1">KN - Pokemon List</h1>
                </div>
                <div class="actions">
                    <div class="control">
                        <div class="select">
                            <select>
                                <option selected>Favs</option>
                                ${map(this.favs, (f) => html`<option>${f}</option>`)}
                            </select>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }
}

customElements.define('main-header', MainHeader);