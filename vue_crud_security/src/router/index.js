import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores/useAuth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    { path: '/', component: () => import('@/views/Login.vue') },
    { path: '/login', component: () => import('@/views/Login.vue') },
    { path: '/employees', component: () => import('@/views/Employees.vue') },
    {
      path: '/:catchAll(.*)*',
      name: 'notfound',
      component: () => import('@/views/NotFoundPage.vue')
    }
  ]
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
    authStore.returnUrl = to.fullPath;
    return '/login';
  }
});

export default router;
