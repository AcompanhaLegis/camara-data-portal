import { vi, describe, it, expect, Mock } from "vitest";
import fetchCamaraAPI, { CamaraAPIError } from "@/utils/fetchCamaraAPI";
import useCamaraAPI from "@/composables/useCamaraAPI";

vi.mock("@/utils/fetchCamaraAPI", async (importOriginal) => {
    const original = (await importOriginal()) as any;
    return {
        ...original,
        default: vi.fn(),
    };
});

describe("useCamaraAPI", () => {
    it("should return default values", () => {
        const { loading, error, fetchData, data, query } = useCamaraAPI();
        expect(loading.value).toBe(false);
        expect(error.value).toBeNull();
        expect(fetchData).toBeInstanceOf(Function);
        expect(data.value).toBeNull();
        expect(query.value).toEqual({});
    });

    it("should fetch data successfully", async () => {
        (fetchCamaraAPI as Mock).mockResolvedValueOnce({ dados: ["test"] });
        const { data, loading, error, fetchData } = useCamaraAPI();
        await fetchData("/");
        expect(data.value).toEqual(["test"]);
        expect(loading.value).toBe(false);
        expect(error.value).toBeNull();
    });

    it("should set query params from object", async () => {
        (fetchCamaraAPI as Mock).mockResolvedValueOnce({ dados: ["test"] });
        const initialQuery = { status: "active", type: "bill" };
        const { data, loading, error, fetchData } = useCamaraAPI(initialQuery);
        await fetchData("/");
        expect(data.value).toEqual(["test"]);
        expect(loading.value).toBe(false);
        expect(error.value).toBeNull();
        expect(fetchCamaraAPI).toHaveBeenCalledWith(
            "/" + "?" + new URLSearchParams(initialQuery).toString()
        );
    });

    it("should set initial query params object", () => {
        const initialQuery = { status: "active" };
        const { query } = useCamaraAPI(initialQuery);
        expect(query.value).toEqual(initialQuery);
    });

    it("should set error value when api fails", async () => {
        (fetchCamaraAPI as Mock).mockRejectedValueOnce(new CamaraAPIError({ status: 404 } as Response));
        const { data, loading, error, fetchData } = useCamaraAPI();
        await fetchData("/");
        expect(data.value).toBeNull();
        expect(loading.value).toBe(false);
        expect(error.value).toBe("Não encontrado");
    });
});