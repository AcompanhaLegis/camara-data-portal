<script setup lang="ts">
import { onBeforeMount } from "vue";
import useProposicoesTramitacoes from "@/composables/useProposicoesTramitacoes";
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from "primevue";
import ALSkeletonLoading from "@/components/ui/ALSkeletonLoading.vue";
import ProposicaoTimeline from "@/components/proposicoes/panels/ProposicaoTimeline.vue";

interface IProps {
  proposicaoId: number;
}

const props = defineProps<IProps>();

const {
    tramitacoes, loading, error, getTramitacoesByPropsicaoId
} = useProposicoesTramitacoes();

const checkTramitacoes = async () => {
    if (tramitacoes.value.length === 0) {
        await getTramitacoesByPropsicaoId(props.proposicaoId);
    }
};

</script>

<template>
  <Accordion @tab-open="checkTramitacoes">
    <AccordionPanel value="0">
      <AccordionHeader>
        <span class="font-bold text-primary dark:text-primary-300">
          Linha do tempo de tramitações
        </span>
      </AccordionHeader>

      <AccordionContent>
        <ALSkeletonLoading :rows="5" v-if="loading" />
        <div v-else-if="error" class="text-red-500">
          <p>Erro ao carregar a linha do tempo de tramitações</p>
          <p>{{ error }}</p>
        </div>

        <ProposicaoTimeline
          v-else
          :tramitacoes="tramitacoes"
        />
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<style scoped>

</style>