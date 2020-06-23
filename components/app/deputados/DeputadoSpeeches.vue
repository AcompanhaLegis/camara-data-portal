<template>
  <a-list>
    <a-alert
      v-if="!speeches || !speeches.length"
      description="Sem informaçōes"
      show-icon
    />
    <a-list-item v-else v-for="(s, idx) in speeches" :key="idx">
      <b>{{ s.faseEvento.titulo }}</b>
      <br />
      <a-tag color="cyan">
        {{ $moment(s.dataHoraInicio).format('LLL') }}
      </a-tag>
      <br />
      <b>Tipo: </b> {{ s.tipoDiscurso || '-' }}
      <br />
      <b>Sumário: </b> {{ s.sumario || '-' }}
      <br />
      <b>Transcriçāo: </b> {{ s.transcricao || '-' }}
    </a-list-item>
  </a-list>
</template>

<script>
export default {
  props: {
    speeches: {
      type: Array,
      required: true
    }
  }
};
</script>
