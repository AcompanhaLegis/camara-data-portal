<script setup lang='ts'>
import { computed, ref } from "vue";
import { InputNumber, Button } from "primevue";
import useProposicoesStore from "@/stores/proposicoesStore";

const store = useProposicoesStore();

const ano = ref<number|null>(null);

const query = computed(() => {
    return `ano=${ano.value}`;
});
const doFilter = () => {
    store.getProposicoes(1, query.value);
};

const currentYear = computed<number>(() => {
    return new Date().getFullYear();
});
</script>

<template>
  <form @submit.prevent="doFilter" class="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-700 p-4 rounded w-full md:w-max min-w-[20vw]">
    <div class="flex flex-col gap-2">
      <label for="ano">Ano(s)</label>
      <InputNumber
        id="ano"
        v-model.number="ano"
        :min="0"
        :max="currentYear"
        :useGrouping="false"
      />
    </div>

    <Button type="submit" class="al-btn al-btn-primary block text-center">Buscar</Button>
  </form>
</template>
