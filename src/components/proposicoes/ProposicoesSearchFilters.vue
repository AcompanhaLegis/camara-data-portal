<script setup lang='ts'>
import { computed, ref } from "vue";
import { InputText, Button } from "primevue";
import useProposicoesStore from "@/stores/proposicoesStore";

const store = useProposicoesStore();

const ano = ref("");

const query = computed(() => {
    return `ano=${ano.value}`;
});
const doFilter = () => {
    store.getProposicoes(1, query.value);
};
</script>

<template>
  <form @submit.prevent='doFilter' class='flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-700 p-4 rounded w-max min-w-[20vw]'>
    <div class="flex flex-col gap-2">
      <label for="ano">Ano(s)</label>
      <InputText id="ano" v-model='ano' />
    </div>

    <Button type='submit' class='al-btn al-btn-primary block text-center'>Buscar</Button>
  </form>
</template>
