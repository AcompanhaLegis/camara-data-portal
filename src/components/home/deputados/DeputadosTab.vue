<script setup lang="ts">
import { ref } from 'vue';
import { IDeputadoSummary } from '@/types/IDeputado';
import BuscaDeputados from '@/components/home/deputados/BuscaDeputados.vue';

const selectedDeputado = ref<IDeputadoSummary|null>(null);
</script>

<template>
  <section>
    <BuscaDeputados v-model="selectedDeputado"/>
  </section>
</template>
