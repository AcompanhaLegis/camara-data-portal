<script setup lang='ts'>
import { onMounted } from "vue";
import useProposicoesStore from "@/stores/proposicoesStore";
import ProposicoesList from "@/components/proposicoes/ProposicoesList.vue";
import ProposicoesSearchFilters from "@/components/proposicoes/ProposicoesSearchFilters.vue";

const store = useProposicoesStore();

onMounted(() => {
    store.getProposicoes(1);
});
</script>

<template>
  <section class='flex gap-8'>
    <ProposicoesSearchFilters />

    <section class='h-full'>
      <ProposicoesList :proposicoes='store.curProposicoes' />
    </section>
  </section>
</template>