<script setup lang="ts">
import { defineModel, ref, watch } from "vue";
import { onMounted } from "vue";
import useDeputados from "@/composables/useDeputados";
import { AutoComplete, AutoCompleteCompleteEvent } from "primevue";
import { IDeputadoSummary } from "@/types/IDeputado";

const { deputados, loading, getDeputados } = useDeputados();
onMounted(() => {
    getDeputados();
});

const selectedDeputado = defineModel<IDeputadoSummary|null>();
const query = ref<string | IDeputadoSummary>("");

const filteredDeputados = ref<IDeputadoSummary[]>([]);

const onComplete = (event: AutoCompleteCompleteEvent) => {
    if (!deputados.value) {
        return;
    }
    if (event.query.trim().length) {
        filteredDeputados.value = deputados.value.filter(
            deputado => deputado.nome.toLowerCase().includes(event.query.toLowerCase())
        );
    } else {
        filteredDeputados.value = [...deputados.value];
    }
};

watch(query, () => {
    if (typeof query.value !== "string" && query.value.id) {
        selectedDeputado.value = query.value;
    }
});
</script>

<template>
  <div class="flex flex-col gap-1 relative">
    <label for="searchDeputados">Busca por deputados</label>
    <AutoComplete
      class="w-full"
      input-class="w-full"
      :loading="loading"
      inputId="searchDeputados"
      v-model="query"
      :suggestions="filteredDeputados"
      optionLabel="nome"
      emptySearchMessage="Nenhum deputado encontrado"
      @complete="onComplete"
    >
      <template #option="slotProps">
        <div class="flex items-center gap-2">
          <img
            :src="slotProps.option.urlFoto"
            class="w-[4rem] border border-slate-400 rounded-md"
            alt="Foto de {{ slotProps.option.nome }}"
            loading="lazy"
          />
          <div>
            <p class="!text-xl">{{ slotProps.option.nome }}</p>
            <p class="text-sm italic">
              {{ slotProps.option.siglaPartido }}
            </p>
          </div>
        </div>
      </template>
    </AutoComplete>
  </div>
</template>
