<script setup lang="ts">
import {IProposicaoSummary} from "@/types/IProposicao";

defineProps<{
  proposicao: IProposicaoSummary
}>();
</script>

<template>
  <p>
    <b class='al-avatar al-avatar-sm text-xs inline-flex justify-center items-center text-primary'>
      {{ proposicao.siglaTipo }}
    </b>
    {{ proposicao.numero }}/{{ proposicao.ano }}
  </p>
  <hr class='my-2' />
  <p>{{ proposicao.ementa }}</p>
</template>

<style scoped>

</style>
