const BASE_URL = "https://dadosabertos.camara.leg.br/api/v2";

const fetchCamaraAPI = async (endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            Accept: "application/json",
        },
    });
    return await response.json();
};

export default fetchCamaraAPI;