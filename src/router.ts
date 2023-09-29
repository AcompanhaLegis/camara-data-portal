import { createRouter, createWebHistory } from "vue-router";
import AcompanhaLegisHome from "@/components/home/AcompanhaLegisHome.vue";
import ProposicaoDetails from "@/components/proposicoes/ProposicaoDetails.vue";
import AboutAcompanhaLegis from "@/components/about/AboutAcompanhaLegis.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: AcompanhaLegisHome },
        { path: "/proposicoes/:id", component: ProposicaoDetails },
        { path: "/about", component: AboutAcompanhaLegis },
    ],
});

export default router;
