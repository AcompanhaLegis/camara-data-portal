<script setup lang='ts'>
import { computed } from "vue";
import {Button} from "primevue";

interface IProps {
  modelValue: number;
  totalPages: number;
}

const props = defineProps<IProps>();
const emits = defineEmits(["update:modelValue"]);

const onPageClick = (page: number) => {
    emits("update:modelValue", page);
};
const showingPages = computed(() => {
    const pages: number[] = [];
    const currentPage = props.modelValue;

    if (props.totalPages <= 5) {
        for (let i = 1; i <= props.totalPages; i++) {
            pages.push(i);
        }
    } else {
        if (currentPage <= 3) {
            pages.push(1, 2, 3, 4, 5);
        } else if (currentPage + 2 >= props.totalPages) {
            pages.push(props.totalPages - 4, props.totalPages - 3, props.totalPages - 2, props.totalPages - 1, props.totalPages);
        } else {
            pages.push(currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2);
        }
    }

    return pages;
});
</script>

<template>
  <div class="flex gap-2 justify-center align-center md:text-base">
    <Button
      :disabled="modelValue === 1"
      @click="onPageClick(1)"
      aria-label="Primeira página"
      severity="secondary"
      rounded
      icon="pi pi-angle-double-left"
    />
    <Button
      class="hidden md:block"
      :disabled="modelValue === 1"
      severity="secondary"
      @click="onPageClick(modelValue - 1)"
      aria-label="Página anterior"
      rounded
      icon="pi pi-angle-left"
    />
    <Button
      v-for="pg in showingPages"
      :key="pg"
      :severity="pg === modelValue ? 'primary' : 'secondary'"
      :class="`${pg === modelValue ? 'text-primary font-bold' : 'text-secondary'} pageButton`"
      @click="onPageClick(pg)"
      :aria-label="`Página ${pg} ${pg === modelValue ? 'selecionada' : ''}`"
    >
      {{ pg }}
    </Button>
    <Button
      class="hidden md:block"
      :disabled="modelValue === totalPages"
      severity="secondary"
      @click="onPageClick(modelValue + 1)"
      aria-label="Página seguinte"
      rounded
      icon="pi pi-angle-right"
    />
    <Button
      :disabled="modelValue === totalPages"
      @click="onPageClick(totalPages)"
      aria-label="Última página"
      severity="secondary"
      rounded
      icon="pi pi-angle-double-right"
    />
  </div>
</template>

<style scoped>
.pageButton {
  @apply rounded-sm p-2 text-lg;
}
</style>