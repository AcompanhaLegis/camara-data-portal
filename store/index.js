export const state = () => ({
  proposicaoTypes: [],
  tramitacaoTypes: [],
  deputados: [],
  lastLoaded: null
});

export const mutations = {
  setTramitacaoTypes(state, types) {
    state.tramitacaoTypes = types;
  },
  setDeputados(state, deputados) {
    state.deputados = deputados;
  },
  setProposicaoTypes(state, types) {
    state.proposicaoTypes = types;
  }
};

export const actions = {
  async fetchDeputados({ commit }) {
    const { dados } = await this.$openData.$get(
      '/deputados?ordem=ASC&ordenarPor=nome'
    );
    commit('setDeputados', dados);
  },
  async fetchProposicoes({ commit }) {
    const { dados } = await this.$openData.$get(
      '/referencias/proposicoes/siglaTipo'
    );
    commit('setProposicaoTypes', dados);
  }
};
