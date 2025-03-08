<script setup lang="ts">
import {computed, onBeforeMount} from "vue";
import useProposicaoDetails from "@/composables/useProposicoesDetails";
import {useRoute} from "vue-router";
import ALSkeletonLoading from "@/components/ui/ALSkeletonLoading.vue";
import ProposicaoStatusPanel from "@/components/proposicoes/panels/ProposicaoStatusPanel.vue";
import { Button } from "primevue";
import ProposicaoTimelinePanel from "@/components/proposicoes/panels/ProposicaoTimelinePanel.vue";

const route = useRoute();
const {
    proposicao, loading, getProposicaoDetails, error
} = useProposicaoDetails();

const keywords = computed<string[]>(() => {
    return proposicao.value?.keywords?.split(",") ?? [];
});

onBeforeMount(async () => {
    const proposicaoId = route.params.id as string;
    if (!proposicaoId || new RegExp("^[0-9]+$").test(proposicaoId) === false) {
        return;
    }
    await getProposicaoDetails(parseInt(proposicaoId, 10));
});
</script>

<template>
  <section class="mt-4">
    <ALSkeletonLoading :rows="20" v-if="loading" />

    <div v-else-if="error" class="text-red-500">
      <p>Erro ao carregar a proposição</p>
      <p>{{ error }}</p>
    </div>

    <template v-else-if="proposicao">
      <h2 class="text-center">
        {{ proposicao.siglaTipo }} - {{ proposicao.numero }}/{{ proposicao.ano }}
      </h2>

      <h3>
        Palavras-chave
      </h3>
      <div class="flex gap-2 mb-4 flex-wrap">
        <span v-for="key in keywords" :key="key" class="text-xs rounded px-2 py-1 capitalize text-zinc-100 bg-slate-800">{{ key }}</span>
      </div>

      <h3>
        Ementa
      </h3>
      <p>{{ proposicao.ementa }}</p>
      <br>
      <p>{{ proposicao.ementaDetalhada }}</p>
      <Button
        class="mb-4"
        severity="secondary"
        icon="pi pi-download"
        label="Download Inteiro Teor"
        as="a"
        :href="proposicao.urlInteiroTeor"
        target="_blank"
        download
      />

      <div class="flex flex-col w-full mt-4 gap-4">
        <ProposicaoStatusPanel
          :status-proposicao="proposicao.statusProposicao"
        />

        <ProposicaoTimelinePanel
          :proposicao-id="proposicao.id"
        />
      </div>
    </template>

    <div v-else>
      <p>Proposição não encontrada</p>
    </div>
  </section>
</template>