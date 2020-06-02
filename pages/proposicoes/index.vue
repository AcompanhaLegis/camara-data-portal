<template>
  <div class="proposicoes">
    <template v-if="$fetchState.pending">
      <a-spin size="large" />
    </template>
    <template v-else-if="$fetchState.error">
      Error: {{ $fetchState.error }}
    </template>
    <template v-else>
      <div class="lista-proposicoes">
        <proposicao-card v-for="p in proposicoes" :key="p.id" :proposicao="p" />
      </div>
    </template>
  </div>
</template>

<script>
import ProposicaoCard from '~/components/app/proposicoes/ProposicaoCard';

export default {
  layout: 'auth',
  components: {
    ProposicaoCard
  },
  data() {
    return {
      query: '',
      proposicoes: []
    };
  },
  async fetch() {
    const { data } = await this.$axios.get(
      'https://dadosabertos.camara.leg.br/api/v2/proposicoes?ordem=DESC&ordenarPor=id'
    );
    this.proposicoes = data.dados;
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
