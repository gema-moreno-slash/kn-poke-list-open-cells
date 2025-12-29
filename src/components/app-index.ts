import { startApp } from '@open-cells/core';
import { LitElement, PropertyDeclarations, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';
import { routes } from '../router/routes.js';
import { styles } from './app-index.css.js';
import '../components/main-header.js'

startApp({
  routes,
  mainNode: 'app-content',
});

const mainLayoutPages = ['list-page', 'detail-page'];
const testLayoutPages = ['test-home', 'test-second'];

@customElement('app-index')
export class AppIndex extends LitElement {
  // elementController = new ElementController(this);

  static styles = styles;
/*
  constructor() {
    super();
    const url = window.location;
    console.log(url);
  }*/

  renderMainLayout() {

  }

  renderTestLayout() {

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
