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
          <a-spin v-if="loading" size="large" />
          <a-alert
            v-if="!loading && !proposicoes.length"
            description="Nenhum resultado para pesquisa."
            type="warning"
            show-icon
          />
          <a-list size="large">
            <proposicao-list-item
              v-for="p in proposicoes"
              :key="p.id"
              :proposicao="p"
            />
          </a-list>
          <br />
          <br />
          <br />
          <a-button v-if="nextPage" block type="primary" @click="loadMore">
            Carregar mais
          </a-button>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
import ProposicaoSearch from '~/components/app/proposicoes/ProposicaoSearch';
import ProposicaoListItem from '~/components/app/proposicoes/ProposicaoListItem';

export default {
  auth: false,
  components: {
    ProposicaoSearch,
    ProposicaoListItem
  },
  layout: 'auth',
  data() {
    return {
      query: '',
      proposicoes: [],
      loading: false,
      nextPage: ''
    };
  },
  async fetch() {
    await this.fetchProposicoes({ ordem: 'DESC', ordenarPor: 'id' });
  },
  methods: {
    async fetchProposicoes(queryObj) {
      this.loading = true;
      const query = Object.keys(queryObj)
        .filter((key) => !!queryObj[key])
        .map((key) => `${key}=${queryObj[key]}`)
        .join('&');
      const { dados, links } = await this.$openData.$get(
        `/proposicoes?${query}`
      );
      this.proposicoes = dados;
      this.nextPage = links.find((l) => l.rel === 'next')?.href;
      this.loading = false;
    },
    async loadMore() {
      const { dados, links } = await this.$openData.$get(this.nextPage);

      this.proposicoes.push(...dados);

      this.nextPage = links.find((l) => l.rel === 'next')?.href;
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
