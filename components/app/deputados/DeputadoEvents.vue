<template>
  <a-alert
    v-if="!events || !events.length"
    description="Sem informaçōes"
    show-icon
  />
  <a-list v-else>
    <a-list-item v-for="e in events" :key="e.id">
      <b>{{ e.descricaoTipo }}</b>
      <br />
      <a-tag color="cyan">
        {{ $moment(e.dataHoraInicio).format('LLL') }}
      </a-tag>
      <br />
      <b>Local:</b> {{ e.localExterno || e.localCamara.nome }}
      <br />
      {{ e.descricao }}
    </a-list-item>
  </a-list>
</template>

<script>
export default {
  props: {
    events: {
      type: Array,
      required: true
    }
  }
};
</script>
