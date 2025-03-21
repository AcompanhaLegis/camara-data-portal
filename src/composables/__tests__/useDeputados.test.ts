import { describe, expect, it, beforeEach, vi } from "vitest";
import { ref } from "vue";
import useDeputados from "../useDeputados";
import { mockedDeputados } from "../../test-utils/data";

let simulateError = false;
const setSimulateError = (val: boolean) => {
    simulateError = val;
};

const useCamaraAPIMock = () => {
    const data = ref<any[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const query = ref<any>(null);
    const fetchData = async (endpoint: string) => {
        if (simulateError) {
            error.value = "Not found";
        } else {
            // @ts-expect-error
            data.value = mockedDeputados().dados;
        }
    };
    return { data, loading, error, query, fetchData };
};

vi.mock("@/composables/useCamaraAPI", () => {
    return {
        default: () => useCamaraAPIMock(),
    };
});

describe("useDeputados without stub server", () => {
    beforeEach(() => {
        simulateError = false;
    });

    it("should return default values", () => {
        const { deputados, loading, error } = useDeputados();
        expect(deputados.value).toEqual([]);
        expect(loading.value).toBe(false);
        expect(error.value).toBeNull();
    });

    it("should fetch deputies successfully", async () => {
        const { deputados, loading, error, getDeputados } = useDeputados();
        await getDeputados(true);
        expect(deputados.value).toEqual(mockedDeputados().dados);
        expect(loading.value).toBe(false);
        expect(error.value).toBeNull();
    });

    it("should handle error when fetching deputies", async () => {
        setSimulateError(true);
        const { deputados, loading, error, getDeputados } = useDeputados();
        await getDeputados(true);
        expect(deputados.value).toEqual([]);
        expect(loading.value).toBe(false);
        expect(error.value).toEqual("Not found");
    });
});