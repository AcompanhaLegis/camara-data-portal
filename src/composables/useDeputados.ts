import { ref } from "vue";
import { IDeputadoSummary } from "../types/IDeputado";
import useCamaraAPI from "@/composables/useCamaraAPI";

const deputados = ref<IDeputadoSummary[]>([]);

export default function useDeputados() {
    const { loading, error, data, query, fetchData } = useCamaraAPI<IDeputadoSummary[]>();

    const getDeputados = async (force = false) => {
        if (force || deputados.value.length === 0) {
            query.value = { ordem: "ASC", ordenarPor: "nome"};
            await fetchData("/deputados");
        }
    };

    return { deputados: data, loading, error, getDeputados };
}
