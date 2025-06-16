import { vi, describe, it, expect, beforeEach, Mock } from "vitest";
import useDeputadoExpenses from "@/composables/useDeputadoDespesas";
import fetchCamaraAPI, { CamaraAPIError } from "@/utils/fetchCamaraAPI";
import { IDeputadoExpense } from "@/types/IDeputado";

vi.mock("@/utils/fetchCamaraAPI", async (importOriginal) => {
    const original = (await importOriginal()) as any;
    return {
        ...original,
        default: vi.fn(),
    };
});

describe("useDeputadoExpenses", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (fetchCamaraAPI as Mock).mockReset();
    });

    it("should return default values", () => {
        const { expenses, loading, error, getDeputadoExpenses, maxPage } = useDeputadoExpenses();

        expect(expenses.value).toBeNull();
        expect(loading.value).toBe(false);
        expect(error.value).toBeNull();
        expect(getDeputadoExpenses).toBeInstanceOf(Function);
        expect(maxPage.value).toBe(0);
    });

    it("should call fetchCamaraAPI with correct parameters on getDeputadoExpenses", async () => {
        const { getDeputadoExpenses } = useDeputadoExpenses();
        const deputadoId = 123;
        const page = 2;
        const expectedQuery = { pagina: page.toString(), itens: (15).toString(), ordem: "DESC", ordenarPor: "dataDocumento" };
        const expectedEndpoint = `/deputados/${deputadoId}/despesas?${new URLSearchParams(expectedQuery).toString()}`;
        (fetchCamaraAPI as Mock).mockResolvedValueOnce({ dados: [] });

        await getDeputadoExpenses(deputadoId, page);

        expect(fetchCamaraAPI).toHaveBeenCalledWith(expectedEndpoint);
    });

    it("should update expenses data when fetchCamaraAPI is successful", async () => {
        const { expenses, getDeputadoExpenses, loading, error } = useDeputadoExpenses();
        const mockExpenseData: IDeputadoExpense[] = [{
            ano: 2023,
            mes: 1,
            tipoDespesa: "COMBUSTÍVEIS E LUBRIFICANTES.",
            codDocumento: 123,
            tipoDocumento: "Nota Fiscal",
            codTipoDocumento: 0,
            dataDocumento: "2023-01-01",
            numDocumento: "doc123",
            valorDocumento: 100.50,
            urlDocumento: "http://example.com/doc",
            nomeFornecedor: "Posto XYZ",
            cnpjCpfFornecedor: "12345678901234",
            valorLiquido: 90.45,
            valorGlosa: 10.05,
            numRessarcimento: "",
            codLote: 1,
            parcela: 0,
        }];
        const mockResponse = { dados: mockExpenseData, links: [] };
        (fetchCamaraAPI as Mock).mockResolvedValueOnce(mockResponse);

        await getDeputadoExpenses(123);

        expect(loading.value).toBe(false);
        expect(expenses.value).toEqual(mockExpenseData);
        expect(error.value).toBeNull();
    });

    it("should set error when fetchCamaraAPI fails with CamaraAPIError", async () => {
        const { error, getDeputadoExpenses, expenses, loading } = useDeputadoExpenses();
        const errorMessage = "Não encontrado";
        (fetchCamaraAPI as Mock).mockRejectedValueOnce(new CamaraAPIError({ status: 404 } as Response));

        await getDeputadoExpenses(123);

        expect(loading.value).toBe(false);
        expect(expenses.value).toBeNull();
        expect(error.value).toBe(errorMessage);
    });

    it("should set a generic error message for non-CamaraAPIError instances", async () => {
        const { error, getDeputadoExpenses, expenses, loading } = useDeputadoExpenses();
        const genericErrorMessage = "Erro desconhecido. Tente novamente mais tarde.";
        (fetchCamaraAPI as Mock).mockRejectedValueOnce(new Error("Some other error"));

        await getDeputadoExpenses(123);
        
        expect(loading.value).toBe(false);
        expect(expenses.value).toBeNull();
        expect(error.value).toBe(genericErrorMessage); 
    });
    
    it("should set a specific generic error message when a non-Error is thrown", async () => {
        const { error, getDeputadoExpenses, expenses, loading } = useDeputadoExpenses();
        const specificGenericErrorMessage = "Erro desconhecido. Tente novamente mais tarde.";
        (fetchCamaraAPI as Mock).mockRejectedValueOnce("some string error");

        await getDeputadoExpenses(123);

        expect(loading.value).toBe(false);
        expect(expenses.value).toBeNull();
        expect(error.value).toBe(specificGenericErrorMessage);
    });


    it("should calculate maxPage correctly when links are present", async () => {
        const { getDeputadoExpenses, maxPage } = useDeputadoExpenses();
        const mockResponse = {
            dados: [],
            links: [
                { rel: "self", href: "http://example.com?pagina=1" },
                { rel: "next", href: "http://example.com?pagina=2" },
                { rel: "last", href: "http://example.com?pagina=10" },
            ],
        };
        (fetchCamaraAPI as Mock).mockResolvedValueOnce(mockResponse);

        await getDeputadoExpenses(123);
        expect(maxPage.value).toBe(10);
    });

    it("should return 0 for maxPage if rawData or links are null after fetch", async () => {
        const { getDeputadoExpenses, maxPage } = useDeputadoExpenses();
        (fetchCamaraAPI as Mock).mockResolvedValueOnce({ dados: [] });
        await getDeputadoExpenses(123);
        expect(maxPage.value).toBe(0);

        (fetchCamaraAPI as Mock).mockResolvedValueOnce({ dados: [], links: null });
        await getDeputadoExpenses(123);
        expect(maxPage.value).toBe(0);
    });

    it("should return 0 for maxPage if last link is not found", async () => {
        const { getDeputadoExpenses, maxPage } = useDeputadoExpenses();
        const mockResponse = {
            dados: [],
            links: [{ rel: "self", href: "http://example.com?pagina=1" }],
        };
        (fetchCamaraAPI as Mock).mockResolvedValueOnce(mockResponse);
        await getDeputadoExpenses(123);
        expect(maxPage.value).toBe(0);
    });

    it("should return 0 for maxPage if pagina param is missing in last link", async () => {
        const { getDeputadoExpenses, maxPage } = useDeputadoExpenses();
        const mockResponse = {
            dados: [],
            links: [{ rel: "last", href: "http://example.com" }],
        };
        (fetchCamaraAPI as Mock).mockResolvedValueOnce(mockResponse);
        await getDeputadoExpenses(123);
        expect(maxPage.value).toBe(0);
    });
});
