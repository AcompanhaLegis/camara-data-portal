import { BASE_URL } from "@/api";

export class CamaraAPIError extends Error {
    constructor(public response: Response) {
        super();
        this.message = this._formatUserError();
    }

    _formatUserError(): string {
        switch (this.response.status) {
        case 404:
            return "Não encontrado";
        case 503:
        case 500:
            return "Erro interno do servidor. Tente novamente mais tarde.";
        default:
            return "Erro desconhecido. Tente novamente mais tarde.";
        }
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