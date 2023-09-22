<script setup lang="ts">

import {IStatusProposicao} from "@/types/IProposicao";
import {computed} from "vue";
import ALAccordion from "@/components/ui/ALAccordion.vue";

const props = defineProps<{
  statusProposicao: IStatusProposicao;
}>();

const labeledStatus = computed(() => {
    const labelMap: { [key: string]: string } = {
        dataHora: "Data/Hora",
        descricaoTramitacao: "Descrição da tramitação",
        despacho: "Despacho",
        orgao: "Órgão",
        apreciacao: "Apreciação",
    };
    return Object.keys(labelMap).map((key: string) => {
        return {
            label: labelMap[key],
            // @ts-ignore
            value: props.statusProposicao[key],
        };
    });
});
</script>

<template>
  <ALAccordion>
    <template #button>
      Status: <b class="font-bold text-primary">{{ props.statusProposicao.descricaoSituacao }}</b>
    </template>

    <template #panel>

      <div class="grid grid-cols-2 md:grid-cols-1 gap-2">
        <template v-for="status in labeledStatus" :key="status.label">
          <b class="col-span-2 font-bold text-primary">{{ status.label }}</b>
          <p class="col-span-4">{{ status.value || '-' }}</p>
        </template>
      </div>
    </template>
  </ALAccordion>
</template>

<style scoped>

</style>