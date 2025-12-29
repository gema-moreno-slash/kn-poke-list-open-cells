import { startApp } from '@open-cells/core';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { routes } from '../router/routes.js';
import { styles } from './app-index.css.js';
import './main-header.js'

startApp({
  routes,
  mainNode: 'app-content',
});

const mainLayoutPages = ['list-page', 'detail-page'];
const testLayoutPages = ['test-home', 'test-second'];

export class AppIndex extends LitElement {

  static styles = styles;

  constructor() {
    super();
    const path = window.location;
    console.log(path)
  }

  renderMainLayout(content) {
    return html`
      <div>
        <main-header></main-header>
        <main role="main" tabindex="-1">
          ${content}
        </main>
      </div>
    `;
  }

  renderTestLayout(content) {
    return html`
      <div>
        <main-header></main-header>
        <main role="main" tabindex="-1">
          ${content}
        </main>
      </div>
    `;
  }

  render() {
    return html`
      <div>
        <main-header></main-header>
        <main role="main" tabindex="-1">
          <slot></slot>
        </main>
      </div>
    `;
  }
}

customElements.define('app-index', AppIndex);