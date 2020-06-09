<template>
  <a-card :title="formattedDate">
    <p>Descriçāo: {{ tramitacao.descricaoTramitacao }}</p>
    <p>
      Situaçāo:
      <a-tag v-if="tramitacao.descricaoSituacao" color="orange">{{
        tramitacao.descricaoSituacao
      }}</a-tag>
      <a-icon v-else type="question" />
    </p>
    <p>Orgāo/Apreciaçāo: {{ tramitacao.siglaOrgao }}</p>
    <p>Regime de Tramitaçāo: {{ tramitacao.regime || '-' }}</p>
    <p>Despacho: {{ tramitacao.despacho }}</p>
  </a-card>
</template>

<script>
import dayjs from 'dayjs';

export default {
  props: {
    tramitacao: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedDate() {
      return dayjs(this.tramitacao.dataHora).format('DD/MM/YYYY HH:mm');
    }
  }
};
</script>
