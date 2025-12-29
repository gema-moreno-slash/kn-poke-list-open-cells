import { html, LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { customElement } from 'lit/decorators.js';
import '../../components/main-subhead';

// @ts-ignore
@customElement('home-page')
export class HomePage extends LitElement {
  pageController = new PageController(this);

  render() {
    return html`
      <main-subhead title="test Sub" back="true"></main-subhead>
      <button @click="${() => this.pageController.navigate('second')}">Go to second page</button>
    `;
  }
}
