import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('@/views/Product.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/Dashboard.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
