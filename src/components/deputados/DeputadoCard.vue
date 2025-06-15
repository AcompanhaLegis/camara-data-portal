<script setup lang="ts">
import { computed } from 'vue';
import { IDeputado, IGabinete, IUltimoStatus } from '@/types/IDeputado';
import { Tag } from 'primevue';

interface IKeyValue {
  label: string;
  value: string;
}

const props = defineProps<{
  deputado: Partial<IDeputado>;
}>();
</script>

<template>
      <section class="w-full flex flex-col gap-10 lg:flex-row items-center md:items-start">
        <figure class="flex-shrink-0">
          <img class="h-60 w-auto ring-1 ring-slate-700 rounded"
               :src="props.deputado.ultimoStatus?.urlFoto"
               :alt="`Foto de ${props.deputado.nomeCivil}`" />
        </figure>

        <div class="w-full">
          <div class="flex flex-col gap-2 min-w-max">
            <h1 class="block text-blue-500 md:text-2xl text-xl mb-4">{{ props.deputado.nomeCivil }}</h1>
            <section class="flex flex-row gap-4 items-center">
                <p>{{ props.deputado.ultimoStatus?.siglaPartido }} - {{ props.deputado.ultimoStatus?.siglaUf }}</p>
                <Tag
                    class="text-sm"
                    :severity="props.deputado.ultimoStatus?.situacao === 'Exercício' ? 'success' : 'danger'"
                    :value="`Situação: ${props.deputado.ultimoStatus?.situacao}`"
                >
                </Tag>
            </section>

            <section class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                <div class="flex flex-row gap-2 items-center">
                    <i class="pi pi-envelope" role="presentation"></i>
                    <a v-if="props.deputado.ultimoStatus?.email" :href="`mailto:${props.deputado.ultimoStatus?.email}`" class="text-blue-500 hover:underline">
                    {{ props.deputado.ultimoStatus?.email }}
                    </a> 
                    <span v-else class="text-gray-500">Email não disponível</span>
                </div>

                <div class="flex flex-row gap-2 items-center">
                    <i class="pi pi-phone" role="presentation"></i>
                    <span v-if="props.deputado.ultimoStatus?.gabinete.telefone">
                        {{ props.deputado.ultimoStatus?.gabinete.telefone }}
                    </span>
                    <span v-else class="text-gray-500">Telefone não disponível</span>
                </div>
            </section>

            <section class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full">
                <div class="flex flex-row gap-2 items-center">
                    <i class="pi pi-globe" role="presentation"></i>
                    <span v-if="props.deputado.urlWebsite">{{ props.deputado.urlWebsite}}</span>
                    <span v-else class="text-gray-500">Website não disponível</span>
                </div>
                <div class="flex flex-row gap-2 items-center">
                    <i class="pi pi-building" role="presentation"></i>
                    <span>{{ props.deputado.ultimoStatus?.gabinete?.predio }}, {{ props.deputado.ultimoStatus?.gabinete?.andar }}º andar, Sala {{ props.deputado.ultimoStatus?.gabinete?.sala }}</span>
                </div>
            </section>
          </div>
        </div>
      </section>
</template>