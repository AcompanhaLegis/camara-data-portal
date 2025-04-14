import { IDeputado } from "@/types/IDeputado";
import useCamaraAPI from "@/composables/useCamaraAPI";

export default function useDeputadoDetails() {
    const { loading, error, fetchData, data } =
        useCamaraAPI<IDeputado>();

    const getDeputadoDetails = async (id: number) => {
        loading.value = true;
        try {
            await fetchData(`/deputados/${id}`);
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

    return { deputado: data, loading, error, getDeputadoDetails };
}
