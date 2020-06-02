<template>
  <section class="proposicao-card">
    <a-descriptions bordered :column="{ xs: 2, sm: 2, md: 3 }">
      <a-descriptions-item label="Numero">
        {{ proposicao.siglaTipo }} - {{ proposicao.numero }}
      </a-descriptions-item>
      <a-descriptions-item label="Ano">
        {{ proposicao.ano || 'Ano desconhecido' }}
      </a-descriptions-item>
      <a-descriptions-item label="Autor">
        Aqui o Leandro entra com a idexacao legal
        <a-button type="link" icon="idcard">
          Consultar
        </a-button>
      </a-descriptions-item>
      <a-descriptions-item label="Ementa" :span="3">
        {{ proposicao.ementa.trim() }}
        <br />
      </a-descriptions-item>
      <a-descriptions-item label="Palavras-chave" :span="3">
        {{ proposicao.keywords }}
        Aqui tbm vai ter ouuutros dados ne Leandro?
        <br />
      </a-descriptions-item>
      <a-descriptions-item>
        <a-button type="primary" class="detail-btn">
          Visualizar proposiçāo na íntegra
        </a-button>
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
