import type { IDeputadoExpense } from "@/types/IDeputado";
import useCamaraAPI from "@/composables/useCamaraAPI";
import { computed } from "vue";

export default function useDeputadoExpenses() {
    const camaraApi = useCamaraAPI<IDeputadoExpense[]>({ pagina: 1 });

    const getDeputadoExpenses = async (id: number, page = 1) => {
        camaraApi.loading.value = true;
        try {
            camaraApi.query.value = { pagina: page, itens: 15, ordem: "DESC", ordenarPor: "dataDocumento" };
            await camaraApi.fetchData(`/deputados/${id}/despesas`);
        } catch (err) {
            if (err instanceof Error) {
                camaraApi.error.value = err.message;
                return;
            }
            camaraApi.error.value = "An unknown error occurred.";
            console.error(err);
        } finally {
            camaraApi.loading.value = false;
        }
    };

    const maxPage = computed(() => {
        if (!camaraApi.rawData.value || !camaraApi.rawData.value.links) return 0;
        const lastLink = camaraApi.rawData.value.links.find(link => link.rel === "last");
        if (!lastLink) return 0;
        const url = new URL(lastLink.href);
        const pageParam = url.searchParams.get("pagina");
        return pageParam ? parseInt(pageParam, 10) : 0;
    });

    return { expenses: camaraApi.data, loading: camaraApi.loading, error: camaraApi.error, getDeputadoExpenses, maxPage };
}
