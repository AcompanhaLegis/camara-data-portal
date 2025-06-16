<script setup lang='ts'>
import { onMounted, watch, computed } from "vue";
import useDeputadoDetails from "@/composables/useDeputadoDetails";
import { ProgressSpinner } from "primevue";
import DeputadoCard from "./DeputadoCard.vue";
import Divider from "primevue/divider";
import DeputadoTabs from "./DeputadoTabs.vue";

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
  <div class="w-full md:max-w-[60vw] mx-auto p-4">
    <ProgressSpinner v-if="loading" />
    <template v-if="deputado && !loading">
      <div class="flex flex-col rounded ring-1 ring-slate-200 bg-white dark:bg-slate-800">
        <div class="p-4">
          <DeputadoCard :deputado="deputado" />
        </div>

        <Divider class="pt-4" />

        <div>
          <DeputadoTabs :deputadoId="deputado.id" />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
