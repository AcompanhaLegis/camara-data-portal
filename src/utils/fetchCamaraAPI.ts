import { BASE_URL } from "@/api";

export const API_ERROR_MESSAGES: Record<number, string> = {
    404: "Não encontrado",
    503: "Erro interno do servidor. Tente novamente mais tarde.",
    500: "Erro interno do servidor. Tente novamente mais tarde.",
};

export const API_ERROR_MESSAGES_DEFAULT = "Erro desconhecido. Tente novamente mais tarde.";

export class CamaraAPIError extends Error {
    constructor(public response: Response) {
        super();
        this.message = this._formatUserError();
    }

    _formatUserError(): string {
        return API_ERROR_MESSAGES[this.response.status] || API_ERROR_MESSAGES_DEFAULT;
    }
}

const fetchCamaraAPI = async (endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        throw new CamaraAPIError(response);
    }

    return await response.json();
};

export default fetchCamaraAPI;