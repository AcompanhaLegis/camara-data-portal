import { createRouter, createWebHistory } from "vue-router";
import AcompanhaLegisHome from "./components/home/AcompanhaLegisHome.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: AcompanhaLegisHome },
        { path: "/about", component: AcompanhaLegisHome },
    ],
});

export default router;