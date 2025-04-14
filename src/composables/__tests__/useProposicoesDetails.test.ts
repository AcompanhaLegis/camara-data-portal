import { describe, expect, it, beforeEach, vi } from "vitest";
import { ref } from "vue";
import useProposicaoDetails from "../useProposicoesDetails";

const mockedProposicao = { id: 1, nome: "Test Proposicao" };

let simulateError = false;
const setSimulateError = (val: boolean) => {
    simulateError = val;
};

const useCamaraAPIMock = () => {
    const data = ref<any>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const query = ref<any>(null);
    const fetchData = async (endpoint: string) => {
        if (simulateError) {
            error.value = "Not found";
        } else {
            data.value = mockedProposicao;
        }
    };
    return { data, loading, error, query, fetchData };
};

vi.mock("@/composables/useCamaraAPI", () => {
    return { default: () => useCamaraAPIMock() };
});

describe("useProposicaoDetails without stub server", () => {
    beforeEach(() => {
        simulateError = false;
    });

    it("should return default values", () => {
        const { proposicao, loading, error } = useProposicaoDetails();
        expect(proposicao.value).toBeNull();
        expect(loading.value).toBe(false);
        expect(error.value).toBeNull();
    });

    it("should fetch proposicao details successfully", async () => {
        const { proposicao, loading, error, getProposicaoDetails } = useProposicaoDetails();
        await getProposicaoDetails(1);
        expect(proposicao.value).toEqual(mockedProposicao);
        expect(loading.value).toBe(false);
        expect(error.value).toBeNull();
    });

    it("should handle error when fetching proposicao details", async () => {
        setSimulateError(true);
        const { proposicao, loading, error, getProposicaoDetails } = useProposicaoDetails();
        await getProposicaoDetails(1);
        expect(proposicao.value).toBeNull();
        expect(loading.value).toBe(false);
        expect(error.value).toEqual("Not found");
    });
});