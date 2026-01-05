export const routes = [
  {
    path: '/',
    name: 'list',
    component: 'list-page',
    action: async () => {
      await import('../pages/list-page.js')
    }
  },
  {
    path: '/detail/:name',
    name: 'detail',
    component: 'detail-page',
    action: async () => {
      await import('../pages/detail-page.js')
    }
  },
  {
    path: '/detail/new/:id',
    name: 'detail-new',
    component: 'detail-page',
    action: async () => {
      await import('../pages/detail-page.js')
    }
  }
];
