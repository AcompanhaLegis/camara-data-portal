<script setup lang='ts'>
import { onMounted, watch, computed } from "vue";
import useDeputadoDetails from "@/composables/useDeputadoDetails";
import { IGabinete, IUltimoStatus } from "@/types/IDeputado";

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
  <div v-if='!loading'>
    <template v-if='deputado'>
      <section class='w-full flex flex-col w-full gap-8 items-center sm:flex-row sm:items-start'>
        <figure>
          <img class='h-60 w-60 object-cover rounded-full overflow-none ring-1 ring-slate-700'
               :src='deputado.ultimoStatus.urlFoto'
               :alt='`Foto de ${deputado.nomeCivil}`' />
        </figure>

        <section class='w-full sm:w-2/3'>
          <b class='block mt-4 text-blue-500'>Dados do parlamentar</b>
          <ul class='al-list w-full mb-6'>
            <li class='al-list-item' v-for='(item, index) in ultimoStatusList' :key='index'>
              <span class='font-bold'>{{ item.label }}:</span>
              <span>{{ item.value }}</span>
            </li>
          </ul>

          <b class='text-blue-500'>Dados do gabinete</b>
          <ul class='al-list w-full mb-6'>
            <li class='al-list-item' v-for='(item, index) in gabineteList' :key='index'>
              <span class='font-bold'>{{ item.label }}:</span>
              <span>{{ item.value }}</span>
            </li>
          </ul>
        </section>
      </section>
    </template>
  </div>
</template>

<style scoped></style>
