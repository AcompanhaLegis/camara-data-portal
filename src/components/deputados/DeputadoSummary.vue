<script setup lang='ts'>
import { onMounted, watch, computed } from "vue";
import useDeputadoDetails from "@/composables/useDeputadoDetails";
import { ProgressSpinner } from "primevue";
import DeputadoCard from "./DeputadoCard.vue";

const props = defineProps<{
  deputadoId: number;
}>();

const { deputado, loading, getDeputadoDetails } = useDeputadoDetails();

onMounted(async () => {
    getDeputadoDetails(props.deputadoId);
});

watch(props, async (value) => {
    await getDeputadoDetails(value.deputadoId);
});
</script>

<template>
  <div>
    <ProgressSpinner v-if="loading"/>
    <template v-if="deputado && !loading">
      <DeputadoCard
        :deputado="deputado"
      />
    </template>
  </div>
</template>

<style scoped></style>
