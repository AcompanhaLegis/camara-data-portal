import { ref } from "vue";
import fetchCamaraAPI from "@/utils/fetchCamaraAPI";
import { ITramitacao } from "@/types/IProposicao";

export default function useProposicoesTramitacoes() {
    const tramitacoes = ref<ITramitacao[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const getTramitacoesByPropsicaoId = async (id: number) => {
        loading.value = true;
        try {
            const { dados } = await fetchCamaraAPI(
                `/proposicoes/${id}/tramitacoes`
            );
            tramitacoes.value = dados;
        } catch (err) {
            if (err instanceof Error) {
                error.value = err.message;
                return;
            }
            error.value = "Erro desconhecido";
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    return { tramitacoes, loading, error, getTramitacoesByPropsicaoId };
}
