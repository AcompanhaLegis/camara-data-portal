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
        const { loading, error, fetchData, data, query, rawData } = useCamaraAPI();
        expect(loading.value).toBe(false);
        expect(error.value).toBeNull();
        expect(fetchData).toBeInstanceOf(Function);
        expect(data.value).toBeNull();
        expect(rawData.value).toBeNull();
        expect(query.value).toEqual({});
    });

    it("should fetch data successfully", async () => {
        const mockResponse = { dados: ["test"] };
        (fetchCamaraAPI as Mock).mockResolvedValueOnce(mockResponse);
        const { data, loading, error, fetchData, rawData } = useCamaraAPI();
        await fetchData("/");
        expect(data.value).toEqual(["test"]);
        expect(rawData.value).toEqual(mockResponse);
        expect(loading.value).toBe(false);
        expect(error.value).toBeNull();
        expect(fetchCamaraAPI).toHaveBeenCalledWith("/?");
    });

    it("should set query params from object", async () => {
        const mockResponse = { dados: ["test"] };
        (fetchCamaraAPI as Mock).mockResolvedValueOnce(mockResponse);
        const initialQuery = { status: "active", type: "bill" };
        const { data, loading, error, fetchData, rawData } = useCamaraAPI(initialQuery);
        await fetchData("/");
        expect(data.value).toEqual(["test"]);
        expect(rawData.value).toEqual(mockResponse);
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
        const { data, loading, error, fetchData, rawData } = useCamaraAPI();
        await fetchData("/");
        expect(data.value).toBeNull();
        expect(rawData.value).toBeNull();
        expect(loading.value).toBe(false);
        expect(error.value).toBe("Não encontrado");
    });
});