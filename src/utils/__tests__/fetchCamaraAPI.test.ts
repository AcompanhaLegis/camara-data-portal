import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import fetchCamaraAPI, { CamaraAPIError } from "@/utils/fetchCamaraAPI";
import { BASE_URL } from "@/api";

describe("fetchCamaraAPI", () => {
    beforeEach(() => {
        vi.stubGlobal("fetch", vi.fn());
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("should return JSON data when response is ok", async () => {
        const fakeData = { test: "data" };
        const fakeResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue(fakeData),
        };
        (global.fetch as any).mockResolvedValue(fakeResponse);
        const endpoint = "/test";

        const data = await fetchCamaraAPI(endpoint);

        expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}${endpoint}`, {
            headers: {
                Accept: "application/json",
            },
        });
        expect(data).toEqual(fakeData);
    });

    it("should throw CamaraAPIError when response is not ok", async () => {
        const fakeResponse = {
            ok: false,
            status: 404,
            statusText: "Not Found",
        };
        (global.fetch as any).mockResolvedValue(fakeResponse);
        const endpoint = "/notexist";

        await expect(fetchCamaraAPI(endpoint)).rejects.toThrow(CamaraAPIError);

        try {
            await fetchCamaraAPI(endpoint);
        } catch (error: any) {
            expect(error).toBeInstanceOf(CamaraAPIError);
            expect(error.response.status).toEqual(404);
            // since the constructor sets the error message using the internal function,
            // we compare against the expected formatted message instead of calling a separate method
            expect(error.message).toEqual("Não encontrado");
        }
    });
});

describe("CamaraAPIError", () => {
    it("should format error message for status 404", () => {
        const fakeResponse404 = { status: 404, statusText: "Not Found" } as Response;
        const error404 = new CamaraAPIError(fakeResponse404);
        expect(error404.message).toEqual("Não encontrado");
    });

    it("should format error message for status 500 and 503", () => {
        const fakeResponse500 = { status: 500, statusText: "Internal Server Error" } as Response;
        const error500 = new CamaraAPIError(fakeResponse500);
        expect(error500.message).toEqual("Erro interno do servidor. Tente novamente mais tarde.");

        const fakeResponse503 = { status: 503, statusText: "Service Unavailable" } as Response;
        const error503 = new CamaraAPIError(fakeResponse503);
        expect(error503.message).toEqual("Erro interno do servidor. Tente novamente mais tarde.");
    });

    it("should format error message for unknown status", () => {
        const fakeResponseUnknown = { status: 403, statusText: "Forbidden" } as Response;
        const errorUnknown = new CamaraAPIError(fakeResponseUnknown);
        expect(errorUnknown.message).toEqual("Erro desconhecido. Tente novamente mais tarde.");
    });
});