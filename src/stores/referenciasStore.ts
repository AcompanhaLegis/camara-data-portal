import { ref } from "vue";
import { defineStore } from "pinia";

import fetchCamaraAPI from "@/utils/fetchCamaraAPI";
import { IRefTiposProposicao } from "@/types/ReferenciasTypes";

const useReferenciasStore = defineStore("referencias", () => {
    const loadingReferencias = ref<boolean>(false);
    const errorsReferencias = ref<string[]>([]);
    const tiposProposicao = ref<IRefTiposProposicao[]>([]);

    const getTiposProposicao = async () => {
        try {
            const res = await fetchCamaraAPI("/referencias/tiposProposicao/");
            tiposProposicao.value = res.dados;
        } catch (err) {
            if (err instanceof Error) {
                errorsReferencias.value.push(err?.message);
                return;
            }
            errorsReferencias.value.push("Erro ao carregar referências");
        }
    };

    return {
        loadingReferencias,
        errorsReferencias,
        getTiposProposicao
    };
});

export default useReferenciasStore;