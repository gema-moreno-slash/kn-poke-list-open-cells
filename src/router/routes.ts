import { RouteDefinition } from '@open-cells/core/types'; 

/*
export const routes: RouteDefinition[] = [
  {
    path: '/',
    name: 'home',
    component: 'home-page',
    action: async () => {
      await import('../pages/home/home-page.js');
    },
  },
  {
    path: '/second',
    name: 'second',
    component: 'second-page',
    action: async () => {
      await import('../pages/second/second-page.js');
    },
  }
];
*/


export const routes: RouteDefinition[] = [
  {
    path: '/',
    name: 'list',
    component: 'list-page',
    action: async () => {
      await import('../pages/list/list-page')
    }
  },
  {
    path: '/detail/:name',
    name: 'detail',
    component: 'detail-page',
    action: async () => {
      await import('../pages/detail/detail-page.js')
    }
  },

  // Test Pages
  {
    path: '/test-home',
    name: 'test-home',
    component: 'home-page',
    action: async () => {
      await import('../pages/home/home-page.js');
    },
  },
  {
    path: '/test-second',
    name: 'test-second',
    component: 'second-page',
    action: async () => {
      await import('../pages/second/second-page.js');
    },
  }
];
