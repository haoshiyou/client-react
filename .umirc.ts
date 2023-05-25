import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '好室友™平台',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: 'Search',
      path: '/home',
      component: './Home',
      // 不展示顶栏
      headerRender: false,
      // 不展示页脚
      footerRender: false,
      // 不展示菜单
      menuRender: false,
      // 不展示菜单顶栏
      menuHeaderRender: false,
      // 在面包屑中隐藏
      hideInBreadcrumb: true,
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
  ],
  npmClient: 'pnpm',
});

