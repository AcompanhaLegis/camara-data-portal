export const state = () => ({
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
  }
};

export const actions = {
  async fetchDeputados({ commit }) {
    const { dados } = await this.$openData.$get(
      '/deputados?ordem=ASC&ordenarPor=nome'
    );
    commit('setDeputados', dados);
  }
};
