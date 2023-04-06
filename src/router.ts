import { createRouter, createWebHistory } from 'vue-router';
import AcompanhaLegisHome from './pages/AcompanhaLegisHome.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: AcompanhaLegisHome },
    { path: '/about', component: AcompanhaLegisHome },
  ],
});

export default router;