import fetchCamaraAPI, { CamaraAPIError } from "@/utils/fetchCamaraAPI";
import { ref } from "vue";

const useCamaraAPI = <T>(initialQuery: Record<string, any> = {}) => {
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);
    const data = ref<T | null>(null);
    const rawData = ref<{
        dados: T;
        links?: Array<{ href: string; rel: string }>;
    } | null>(null);
    const query = ref<string | object>(initialQuery);

    const fetchData = async (endpoint = "/") => {
        loading.value = true;
        error.value = null;
        try {
            const queryString = new URLSearchParams(initialQuery);
            const fullEndpoint = `${endpoint}?${queryString}`;
            const res = await fetchCamaraAPI(fullEndpoint);
            rawData.value = res;
            data.value = res.dados as T;
        } catch (err) {
            if (err instanceof CamaraAPIError) {
                error.value = err.message;
            } else {
                error.value = "Erro desconhecido. Tente novamente mais tarde.";
            }
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        error,
        query,
        data,
        rawData,
        fetchData,
    };
};

export default useCamaraAPI;