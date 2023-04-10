<script setup lang='ts'>
import { ref, watch, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IDeputadoSummary } from '@/types/IDeputado';
import BuscaDeputados from '@/components/home/deputados/BuscaDeputados.vue';
import DeputadoDetails from '@/components/home/deputados/DeputadoDetails.vue';

const selectedDeputado = ref<IDeputadoSummary | null>(null);

const route = useRoute();
const router = useRouter();
watch(selectedDeputado, (value: IDeputadoSummary) => {
    if (!value) {
        return;
    }
    router.push({ path: '/', query: { ...route.query, deputadoId: value.id } });
});

onBeforeMount(() => {
    const deputadoId = route.query.deputadoId;
    if (deputadoId) {
        selectedDeputado.value = {
            id: Number(deputadoId),
            nome: '',
            siglaPartido: '',
            siglaUf: '',
            uri: '',
            urlFoto: ''
        };
    }
});
</script>

<template>
  <section class='flex flex-col'>
    <BuscaDeputados v-model='selectedDeputado' />

    <section class='mt-4'>
      <DeputadoDetails v-if='selectedDeputado' :deputadoId='selectedDeputado?.id' />
    </section>
  </section>
</template>
