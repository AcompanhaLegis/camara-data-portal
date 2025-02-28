import { describe, expect, it} from "vitest";

import useDeputadoDetails from "./useDeputadoDetails";
import { mockedDeputados } from "@/test-utils/data";
import { URL_COMPLEMENT } from "@/test-utils/urls";

describe("useDeputadoDetails", () => {
    const deputadoData = mockedDeputados();

    it("should return default values", () => {
        const { deputado, loading, error, getDeputadoDetails } = useDeputadoDetails();
        expect(deputado.value).toBeNull();
        expect(loading.value).toBe(false);
        expect(error.value).toBeNull();
        expect(getDeputadoDetails).toBeInstanceOf(Function);
    });

    it("should fetch deputado details", async () => {
        const { deputado, loading, error, getDeputadoDetails } = useDeputadoDetails();

        await getDeputadoDetails(URL_COMPLEMENT.ID_SUCCESS);
        expect(deputado.value).toEqual(deputadoData.dados);
        expect(loading.value).toBe(false);
        expect(error.value).toBeNull();
    });

    // FIXME: Waiting for a fix in fetchCamaraAPI.ts return await response.json();
    it.skip("should handle error", async () => {
        const { deputado, loading, error, getDeputadoDetails } = useDeputadoDetails();

        await getDeputadoDetails(URL_COMPLEMENT.ID_NOT_FOUND);
        expect(deputado.value).toBeNull();
        expect(loading.value).toBe(false);
        expect(error.value).toBe("Not found");
    });
      
    // FIXME: Waiting for a fix in fetchCamaraAPI.ts return await response.json();
    it.skip("should throw unknown error", async () => {
        const { deputado, loading, error, getDeputadoDetails } = useDeputadoDetails();

        await getDeputadoDetails(URL_COMPLEMENT.ID_UNKNOWN_ERROR);
        expect(deputado.value).toBeNull();
        expect(loading.value).toBe(false);
        expect(error.value).toBe("An unknown error occurred.");
    });
});
