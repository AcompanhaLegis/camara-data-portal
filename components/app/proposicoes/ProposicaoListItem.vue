<template>
  <a-list-item>
    <n-link v-if="!full" slot="actions" :to="`/proposicoes/${proposicao.id}`">
      <a-button type="primary">
        Ver na íntegra
      </a-button>
    </n-link>

    <a-list-item-meta :description="proposicao.ementa">
      <h3 slot="title">
        {{ proposicaoNome }}
        {{ proposicao.ano || 'Ano desconhecido' }}
      </h3>
    </a-list-item-meta>
  </a-list-item>
</template>

<script>
export default {
  props: {
    proposicao: {
      type: Object,
      required: true
    },
    full: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    proposicaoNome() {
      return `${this.proposicao.siglaTipo} - ${this.proposicao.numero}`;
    }
  }
};
</script>

<style lang="scss">
.proposicao-card {
  margin: 20px 0;
  .detail-btn {
    width: 100%;
  }
}
</style>
