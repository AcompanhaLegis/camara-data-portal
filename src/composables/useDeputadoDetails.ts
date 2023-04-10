import { ref } from "vue";
import fetchCamaraAPI from "@/utils/fetchCamaraAPI";
import { IDeputado } from "@/types/IDeputado";
import IDiscurso from "@/types/IDiscurso";

export default function useDeputadoDetails() {
    const deputado = ref<IDeputado | null>(null);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const getDeputadoDetails = async (id: number) => {
        loading.value = true;
        try {
            const { dados } = await fetchCamaraAPI(`/deputados/${id}`);
            deputado.value = dados;
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

    return { deputado, loading, error, getDeputadoDetails };
}
