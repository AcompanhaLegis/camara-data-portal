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
        Status: <b class="font-bold text-primary">{{ props.statusProposicao.descricaoSituacao }}</b>
      </AccordionHeader>
      <AccordionContent>
        <div class="grid grid-cols-2 md:grid-cols-1 gap-2">
          <template v-for="status in labeledStatus" :key="status.label">
            <b class="col-span-2 font-bold text-primary">{{ status.label }}</b>
            <p class="col-span-4">{{ status.value || '-' }}</p>
          </template>
        </div>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<style scoped>

</style>
