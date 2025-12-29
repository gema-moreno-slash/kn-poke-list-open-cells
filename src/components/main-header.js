import { LitElement, html, css, unsafeCSS } from "lit";
import bulma from 'bulma/css/bulma.css?inline';

class MainHeader extends LitElement {

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

    render() {
        return html`
            <header class="mainCont">
                <div class="title">
                    <h1 class="title is-1">KN - Pokemon List</h1>
                </div>
                <div class="actions">
                    <div class="control has-icons-left">
                        <div class="select">
                            <select>
                                <option selected>Dark</option>
                                <option>Light</option>
                            </select>
                        </div>
                        <span class="icon is-left">
                            <i class="fas fa-globe"></i>
                        </span>
                    </div>
                </div>
            </header>
        `;
    }
}

customElements.define('main-header', MainHeader);