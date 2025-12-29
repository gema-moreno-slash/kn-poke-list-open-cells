import { startApp } from '@open-cells/core';
import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { routes } from '../router/routes.js';
import bulma from 'bulma/css/bulma.css?inline';
import './main-header.js';
import './main-footer.js'

startApp({
  routes,
  mainNode: 'app-content',
});

export class AppIndex extends LitElement {

  static styles = [
    unsafeCSS(bulma),
    css`
      .mainCont {
          display: flex;
          flex-direction: column;
          height: 100vh;
          box-sizing: border-box;
      }
      main {
        flex: 1;
        position: relative;
        padding: 2rem 2rem;
      }
      main ::slotted(*) {
        /* position: absolute; */
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        visibility: hidden;
      }
      main ::slotted([state="active"]) {
        visibility: visible;
      }
    `
  ]

  renderMainLayout(content) {
    return html`
      <div>
        <main-header></main-header>
        ${content}
        <main-footer></main-footer>
      </div>
    `;
  }

  render() {
    return this.renderMainLayout(html`
      <main class="main" role="main" tabindex="-1">
        <slot></slot>
      </main>
    `);
  }
}

customElements.define('app-index', AppIndex);