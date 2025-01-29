<script setup lang='ts'>
import { onMounted, watch, computed } from "vue";
import useDeputadoDetails from "@/composables/useDeputadoDetails";
import { IGabinete, IUltimoStatus } from "@/types/IDeputado";
import { ProgressSpinner } from "primevue";

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

interface IKeyValue {
  label: string;
  value: string;
}

const ultimoStatusList = computed(() => {
    const labelMapping = {
        nomeEleitoral: "Nome Eleitoral",
        email: "Email",
        siglaPartido: "Partido",
        siglaUf: "UF",
        situacao: "Situação",
        condicaoEleitoral: "Condição Eleitoral"
    } as IUltimoStatus;
    if (deputado.value === null) {
        return [];
    }
    return Object.keys(labelMapping).map((key: string) => ({
        label: labelMapping[key as keyof IUltimoStatus],
        value: deputado.value?.ultimoStatus[key as keyof IUltimoStatus] || ""
    }) as IKeyValue);
});

const gabineteList = computed(() => {
    const labelMapping = Object.freeze({
        predio: "Prédio",
        sala: "Sala",
        andar: "Andar",
        telefone: "Telefone",
        email: "Email",
        nome: "Nome"
    });
    if (!deputado.value) {
        return [];
    }
    return Object.keys(labelMapping).map((key: string) => {
        return ({
            label: labelMapping[key as keyof IGabinete],
            value: deputado.value?.ultimoStatus.gabinete[key as keyof IGabinete] || ""
        });
    });
});
</script>

<template>
  <div>
    <ProgressSpinner v-if="loading"/>
    <template v-if="deputado && !loading">
      <section class="w-full flex flex-col gap-10 lg:flex-row items-center md:items-start xl:justify-center">
        <figure>
          <img class="h-60 w-auto ring-2 ring-slate-400"
               :src="deputado.ultimoStatus.urlFoto"
               :alt="`Foto de ${deputado.nomeCivil}`" />
        </figure>

        <section class="flex flex-col md:flex-row sm:w-2/3 md:items-baseline gap-6 md:gap-10">
          <div class="flex flex-col gap-2 min-w-max">
            <h2 class="block mt-4 text-blue-500">Dados do parlamentar</h2>
            <ul class="al-list w-full mb-6">
              <li class="al-list-item" v-for="(item, index) in ultimoStatusList" :key="index">
                <span class="font-bold">{{ item.label }}:</span>
                <span>{{ item.value }}</span>
              </li>
            </ul>
          </div>

          <div class="flex flex-col gap-2 min-w-max">
            <h2 class="text-blue-500">Dados do gabinete</h2>
            <ul class="al-list w-full mb-6">
              <li class="al-list-item" v-for="(item, index) in gabineteList" :key="index">
                <span class="font-bold">{{ item.label }}:</span>
                <span>{{ item.value }}</span>
              </li>
            </ul>
          </div>
        </section>
      </section>
    </template>
  </div>
</template>

<style scoped></style>
