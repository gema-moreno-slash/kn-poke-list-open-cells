import { LitElement, html, css, unsafeCSS } from "lit";
import { Router } from '@lit-labs/router';
import bulma from 'bulma/css/bulma.css?inline';
import '../components/main-header';
import '../components/main-footer';
import '../components/main-subhead.js';

class MainLayout extends LitElement {

    static styles = [
        unsafeCSS(bulma),
        css`
            .mainCont {
                display: flex;
                flex-direction: column;
                height: 100vh;
                box-sizing: border-box;
            }
            .main {
                flex: 1;
                padding: 2rem 2rem;
            }
        `
    ]

    router = new Router(this, [
        {
            path: '',
            enter: async () => await import('../pages/list-page.js'),
            render: () => html`
                <main-subhead title="Pokemon List"></main-subhead>
                <list-page></list-page>
            `
        },
        {
            path: 'detail/:name',
            enter: async () => await import('../pages/detail-page.js'),
            render: ({name}) => html`
                <main-subhead title="Detail" back="true"></main-subhead>
                <detail-page .name=${name}></detail-page>
            `
        }
    ]);

    render() {
        return html`
            <div class="mainCont">
                <main-header></main-header>
                <main class="main">
                    ${this.router.outlet()}
                </main>
                <main-footer></main-footer>
            </div>  
        `;
    }
}

customElements.define('main-layout', MainLayout);