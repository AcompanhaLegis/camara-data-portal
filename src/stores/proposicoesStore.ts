import { defineStore } from "pinia";
import { ref } from "vue";
import fetchCamaraAPI from "@/utils/fetchCamaraAPI";

import { IProposicaoSummary } from "@/types/IProposicao";

type ProposicoesOrderBy = "id" | "codTipo" | "numero" | "ano" | "siglaTipo";
const useProposicoesStore = defineStore("proposicoes", () => {
    const loadingProposicoes = ref<boolean>(false);
    const errorProposicoes = ref<string | null>(null);
    const curProposicoes = ref<IProposicaoSummary[]>([]);
    const totalPagesProposicoes = ref<number>(0);

    const lastQuery = ref<string>("");
    const lastOrderBy = ref<ProposicoesOrderBy>("ano");
    const lastOrder = ref<"DESC" | "ASC">("DESC");
    const lastPage = ref<number>(1);

    const getProposicoes = async (page: number, query = "", orderBy: ProposicoesOrderBy = "ano", order: "DESC" | "ASC" = "DESC") => {
        loadingProposicoes.value = true;
        lastQuery.value = query;
        lastOrderBy.value = orderBy;
        lastOrder.value = order;
        lastPage.value = page;

        try {
            const res = await fetchCamaraAPI(`/proposicoes?ordem=${order}&ordenarPor=${orderBy}&pagina=${page}&itens=10&${query}`);
            curProposicoes.value = res.dados;
            // Parse URL and get page from query
            const url = new URL(res.links.find((l: any) => l.rel === "last")?.href ?? "");
            totalPagesProposicoes.value = parseInt(url.searchParams.get("pagina") ?? "0");
        } catch (err) {
            if (err instanceof Error) {
                errorProposicoes.value = err?.message;
                return;
            }
            errorProposicoes.value = "Erro ao carregar proposições";
        } finally {
            loadingProposicoes.value = false;
        }
    };

    return {
        loadingProposicoes,
        errorProposicoes,
        curProposicoes,
        totalPagesProposicoes,
        getProposicoes
    };
});

export default useProposicoesStore;