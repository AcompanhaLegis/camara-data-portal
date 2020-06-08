<template>
  <div class="proposicoes">
    <template v-if="$fetchState.pending">
      <a-spin size="large" />
    </template>
    <template v-else-if="$fetchState.error">
      Error: {{ $fetchState.error }}
    </template>
    <template v-else>
      <section>
        <proposicao-search @search="fetchProposicoes" />
        <a-divider />

        <div class="lista-proposicoes">
          <a-spin size="large" v-if="loading" />
          <a-alert
            v-if="!loading && !proposicoes.length"
            message="Warning"
            description="Nenhum resultado para pesquisa."
            type="warning"
            show-icon
          />
          <proposicao-card
            v-for="p in proposicoes"
            :key="p.id"
            :proposicao="p"
          />
        </div>
      </section>
    </template>
  </div>
</template>

<script>
import ProposicaoSearch from '~/components/app/proposicoes/ProposicaoSearch';
import ProposicaoCard from '~/components/app/proposicoes/ProposicaoCard';

export default {
  layout: 'auth',
  components: {
    ProposicaoSearch,
    ProposicaoCard
  },
  async fetch() {
    await this.fetchProposicoes({ ordem: 'DESC', ordenarPor: 'id' });
  },
  data() {
    return {
      query: '',
      proposicoes: [],
      loading: false
    };
  },
  methods: {
    async fetchProposicoes(queryObj) {
      this.loading = true;
      const query = Object.keys(queryObj)
        .filter((key) => !!queryObj[key])
        .map((key) => `${key}=${queryObj[key]}`)
        .join('&');
      const { dados } = await this.$openData.$get(`/proposicoes?${query}`);
      this.proposicoes = dados;
      this.loading = false;
    }
  }
};
</script>

<style lang="scss">
.proposicoes {
  width: 100%;
  height: fit-content;
  .info-holder {
    margin-top: 20px;
    display: flex;
  }
}
</style>
