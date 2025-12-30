export const routes = [
  {
    path: '/',
    name: 'list',
    component: 'list-page',
    action: async () => {
      await import('../pages/list/list-page.js')
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
      await import('../pages/home/home-page.ts');
    },
  },
  {
    path: '/test-second',
    name: 'test-second',
    component: 'second-page',
    action: async () => {
      await import('../pages/second/second-page.ts');
    },
  }
];
