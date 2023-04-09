import { ref } from 'vue';
import fetchCamaraAPI from '../utils/fetchCamaraAPI';
import { IDeputadoSummary } from '../types/IDeputado';

const deputados = ref<IDeputadoSummary[]>([]);

export default function useDeputados() {
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);
    const getDeputados = async (force = false) => {
        if (force || deputados.value.length === 0) {
            const { dados } = await fetchCamaraAPI('/deputados');
            deputados.value = dados;
        }
    };

    return { deputados, loading, error, getDeputados };
}