import { createRouter, createWebHistory } from "vue-router";
import AcompanhaLegisHome from "@/components/home/AcompanhaLegisHome.vue";
import ProposicaoDetails from "@/components/proposicoes/ProposicaoDetails.vue";
import AboutAcompanhaLegis from "@/components/about/AboutAcompanhaLegis.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: AcompanhaLegisHome,
            meta: {
                breadcrumb: "Home"
            },
        },
        {
            path: "/proposicoes/:id",
            component: ProposicaoDetails,
            meta: {
                breadcrumb: "Proposições"
            },
        },
        {
            path: "/about",
            component: AboutAcompanhaLegis,
            meta: {
                breadcrumb: "Sobre"
            },
        },
    ],
});

export default router;
