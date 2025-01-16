<script setup lang="ts">
import type {IProposicaoSummary} from "@/types/IProposicao";
import { Avatar } from "primevue";

defineProps<{
  proposicao: IProposicaoSummary
}>();
</script>

<template>
  <p class="flex items-center gap-2 !text-xl">
    <Avatar
      :label="proposicao.siglaTipo"
      :class="['mr-2', { '!text-base': proposicao.siglaTipo.length > 2 }]"
      size="large"
    />

    {{ proposicao.numero }}/{{ proposicao.ano }}
  </p>

  <hr class="my-2 border-slate-800 dark:border-zinc-300" />

  <p>{{ proposicao.ementa }}</p>
</template>

<style scoped>

</style>
