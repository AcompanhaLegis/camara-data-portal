import { createRouter, createWebHistory } from "vue-router";
import ProposicaoDetails from "@/components/proposicoes/ProposicaoDetails.vue";
import AboutAcompanhaLegis from "@/components/about/AboutAcompanhaLegis.vue";
import DeputadosView from "@/components/deputados/DeputadosView.vue";
import ProposicoesView from "@/components/proposicoes/ProposicoesView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: ProposicoesView,
            meta: {
                breadcrumb: "Proposições"
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
            path: "/deputados",
            component: DeputadosView,
            meta: {
                breadcrumb: "Deputados"
            },
        },
        // {
        //     path: "/deputados/:id",
        //     component: DeputadosView,
        //     meta: {
        //         breadcrumb: "Deputados"
        //     },
        // },
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
