import { ref } from "vue";
import fetchCamaraAPI from "@/utils/fetchCamaraAPI";
import IProposicao from "@/types/IProposicao";

export default function useProposicaoDetails() {
    const proposicao = ref<IProposicao | null>(null);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const getProposicaoDetails = async (id: number) => {
        loading.value = true;
        try {
            const { dados } = await fetchCamaraAPI(`/proposicoes/${id}`);
            proposicao.value = dados;
        } catch (err) {
            if (err instanceof Error) {
                error.value = err.message;
                return;
            }
            error.value = "An unknown error occurred.";
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    return { proposicao, loading, error, getProposicaoDetails };
}
