import { describe, expect, it} from "vitest";

import useDeputadoDetails from "../useDeputadoDetails";
import { mockedDeputados } from "@/test-utils/data";
import { URL_COMPLEMENT_NUMBER } from "@/test-utils/urls";
import { API_ERROR_MESSAGES, API_ERROR_MESSAGES_DEFAULT } from "@/utils/fetchCamaraAPI";

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

        await getDeputadoDetails(URL_COMPLEMENT_NUMBER.ID_SUCCESS);
        expect(deputado.value).toEqual(deputadoData.dados);
        expect(loading.value).toBe(false);
        expect(error.value).toBeNull();
    });

    it("should handle error", async () => {
        const { deputado, loading, error, getDeputadoDetails } = useDeputadoDetails();

        await getDeputadoDetails(URL_COMPLEMENT_NUMBER.ID_NOT_FOUND);
        expect(deputado.value).toBeNull();
        expect(loading.value).toBe(false);
        expect(error.value).toBe(API_ERROR_MESSAGES[404]);
    });
      
    it("should throw unknown error", async () => {
        const { deputado, loading, error, getDeputadoDetails } = useDeputadoDetails();

        await getDeputadoDetails(URL_COMPLEMENT_NUMBER.ID_UNKNOWN_ERROR);
        expect(deputado.value).toBeNull();
        expect(loading.value).toBe(false);
        expect(error.value).toBe(API_ERROR_MESSAGES_DEFAULT);
    });
});
