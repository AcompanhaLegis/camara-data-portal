<script setup lang='ts'>
import { computed, ref } from "vue";
import ALInput from "@/components/ui/ALInput.vue";
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
  <form @submit.prevent='doFilter' class='flex flex-col gap-2 bg-zinc-100 p-4 rounded w-full'>
    <ALInput label='Ano(s)' v-model='ano' />

    <button type='submit' class='al-btn al-btn-primary block text-center'>Buscar</button>
  </form>
</template>