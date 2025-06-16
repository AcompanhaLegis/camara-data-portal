<script setup lang='ts'>
import { ref, watch, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { IDeputadoSummary } from "@/types/IDeputado";
import BuscaDeputados from "@/components/deputados/BuscaDeputados.vue";
import DeputadoSummary from "@/components/deputados/DeputadoSummary.vue";
import Message from "primevue/message";

const selectedDeputado = ref<IDeputadoSummary | null>(null);

const route = useRoute();
const router = useRouter();
watch(selectedDeputado, (value) => {
    if (!value) {
        return;
    }
    router.push({ path: "/deputados", query: { ...route.query, deputadoId: value.id } });
});

onBeforeMount(() => {
    const deputadoId = route.query.deputadoId;
    if (deputadoId) {
        selectedDeputado.value = {
            id: Number(deputadoId),
            nome: "",
            siglaPartido: "",
            siglaUf: "",
            uri: "",
            urlFoto: ""
        };
    }
});
</script>

<template>
  <section class="flex flex-col gap-10">
    <div class="w-[90vw] md:w-[33vw] md:max-w-2xl mx-auto">
      <BuscaDeputados v-model="selectedDeputado"/>
  </div>

    <section>
      <DeputadoSummary
        v-if="selectedDeputado"
        :deputadoId="selectedDeputado?.id"
      />

      <Message v-else severity="info" class="w-fit mx-auto" icon="pi pi-info-circle">
        Selecione um deputado para ver os detalhes.
      </Message>
    </section>
  </section>
</template>
