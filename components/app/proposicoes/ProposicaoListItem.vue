<template>
  <a-list-item>
    <a-button icon="bell" slot="actions">
      Adicionar à lista de notificações
    </a-button>
    <a-button icon="heart" slot="actions" ghost type="danger">
      Favoritar
    </a-button>
    <router-link slot="actions" :to="`/proposicoes/${proposicao.id}`">
      Ver na íntegra
    </router-link>

    <a-list-item-meta :description="proposicao.ementa">
      <h3 slot="title">
        {{ proposicao.siglaTipo }} - {{ proposicao.numero }} /
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
