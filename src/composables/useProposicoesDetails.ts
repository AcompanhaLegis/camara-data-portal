import IProposicao from "@/types/IProposicao";
import useCamaraAPI from "@/composables/useCamaraAPI";

export default function useProposicaoDetails() {
    const { loading, error, fetchData, data } = useCamaraAPI<IProposicao>();

    const getProposicaoDetails = async (id: number) => {
        await fetchData(`/proposicoes/${id}`);
    };

    return { proposicao: data, loading, error, getProposicaoDetails };
}
