<script setup lang="ts">
import {IStatusProposicao} from "@/types/IProposicao";
import {computed} from "vue";
import { Accordion, AccordionHeader, AccordionPanel, AccordionContent } from "primevue";

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
  <Accordion>
    <AccordionPanel value="0">
      <AccordionHeader>
        <span class="font-bold text-primary dark:text-primary-300">
          {{ props.statusProposicao.descricaoSituacao || "Status desconhecido" }}
        </span>
      </AccordionHeader>

      <AccordionContent>
        <dl class="grid grid-cols-2 md:grid-cols-1 gap-1">
          <template v-for="status in labeledStatus" :key="status.label">
            <dt class="col-span-2 text-primary-emphasis">{{ status.label }}</dt>
            <dd class="col-span-4 mb-4 text-slate-800 dark:text-zinc-100">{{ status.value || '-' }}</dd>
          </template>
        </dl>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<style scoped>

</style>
