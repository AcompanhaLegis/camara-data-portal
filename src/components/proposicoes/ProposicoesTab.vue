<script setup lang="ts">
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
  <section class="flex flex-col gap-8 md:flex-row">
    <ProposicoesSearchFilters />

    <section class="h-full w-full">
      <ProposicoesList
        :proposicoes="store.curProposicoes"
        :is-loading="store.loadingProposicoes"
        :totalPages="store.totalPagesProposicoes"
        @pageChange="store.getProposicoes"
      />
    </section>
  </section>
</template>
