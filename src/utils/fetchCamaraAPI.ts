import { BASE_URL } from "@/api";
import { IAPIDeputado } from "@/types/IAPI";

const fetchCamaraAPI = async (endpoint: string): Promise<IAPIDeputado> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            Accept: "application/json",
        },
    });
    return await response.json(); // FIXME: Move this to a try/catch block - not here
};

export default fetchCamaraAPI;