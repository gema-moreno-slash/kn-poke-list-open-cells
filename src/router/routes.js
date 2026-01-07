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
    path: '/new/:uid',
    name: 'new',
    component: 'new-page',
    action: async () => {
      await import('../pages/new-page.js')
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
];
