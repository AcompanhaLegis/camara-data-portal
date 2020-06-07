<template>
  <section class="proposicao-card">
    <a-descriptions bordered :column="{ xs: 2, sm: 2, md: 3 }">
      <a-descriptions-item label="Numero">
        {{ proposicao.siglaTipo }} - {{ proposicao.numero }}
      </a-descriptions-item>
      <a-descriptions-item label="Ano">
        {{ proposicao.ano || 'Ano desconhecido' }}
      </a-descriptions-item>
      <a-descriptions-item v-if="proposicao.ementa" label="Ementa" :span="3">
        {{ proposicao.ementa }}
        <br />
      </a-descriptions-item>
      <a-descriptions-item>
        <n-link :to="`/proposicoes/${proposicao.id}`">
          <a-button type="primary" class="detail-btn">
            Visualizar proposiçāo na íntegra
          </a-button>
        </n-link>
      </a-descriptions-item>
    </a-descriptions>
  </section>
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
