import { createRouter, createWebHistory } from "vue-router";
import AcompanhaLegisHome from "./components/home/AcompanhaLegisHome.vue";
import ProposicaoDetails from "@/components/proposicoes/ProposicaoDetails.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: AcompanhaLegisHome },
        { path: "/proposicoes/:id", component: ProposicaoDetails },
        { path: "/about", component: AcompanhaLegisHome },
    ],
});

export default router;