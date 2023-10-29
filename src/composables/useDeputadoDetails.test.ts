import { describe, expect, it, vi } from "vitest";

import useDeputadoDetails from "./useDeputadoDetails";

vi.mock("@/utils/fetchCamaraAPI", () => {
    return {
        default: (url: string) => {
            if (url === "/deputados/1") {
                return { dados: { id: 1 } };
            }
            if (url === "/deputados/3") {
                throw {};
            }
            throw new Error("Not found");
        },
    };
});
describe("useDeputadoDetails", () => {
    it("should return default values", () => {
        const { deputado, loading, error, getDeputadoDetails } = useDeputadoDetails();
        expect(deputado.value).toBeNull();
        expect(loading.value).toBe(false);
        expect(error.value).toBeNull();
        expect(getDeputadoDetails).toBeInstanceOf(Function);
    });

    it("should fetch deputado details", async () => {
        const { deputado, loading, error, getDeputadoDetails } = useDeputadoDetails();

        await getDeputadoDetails(1);
        expect(deputado.value).toEqual({ id: 1 });
        expect(loading.value).toBe(false);
        expect(error.value).toBeNull();
    });

    it("should handle error", async () => {
        const { deputado, loading, error, getDeputadoDetails } = useDeputadoDetails();

        await getDeputadoDetails(2);
        expect(deputado.value).toBeNull();
        expect(loading.value).toBe(false);
        expect(error.value).toBe("Not found");
    });
      
    it("should throw unknown error", async () => {
        const { deputado, loading, error, getDeputadoDetails } = useDeputadoDetails();

        await getDeputadoDetails(3);
        expect(deputado.value).toBeNull();
        expect(loading.value).toBe(false);
        expect(error.value).toBe("An unknown error occurred.");
    });
});
