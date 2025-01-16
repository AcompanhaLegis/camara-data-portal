<script setup lang='ts'>
import { ref, watch } from "vue";
import { IProposicaoSummary } from "@/types/IProposicao";
import ALSkeletonLoading from "@/components/ui/ALSkeletonLoading.vue";
import ALPagination from "@/components/ui/ALPagination.vue";
import ProposicaoSummary from "@/components/proposicoes/ProposicaoSummary.vue";

interface IProps {
  proposicoes: IProposicaoSummary[];
  isLoading: boolean;
  showPagination?: boolean;
  totalPages?: number;
}

const emits = defineEmits(["pageChange"]);
const props = withDefaults(defineProps<IProps>(), { showPagination: true });
const page = ref(1);
watch(page, () => {
    window.scroll({ top: 0, behavior: "smooth" });
    emits("pageChange", page.value);
});
</script>

<template>
  <ul class="flex flex-col w-full gap-2">
    <template v-if="isLoading">
      <ALSkeletonLoading class="mb-6" :rows="3" v-for="mocks in 10" :key="mocks" />
    </template>
    <template v-else>
      <li
          class="p-2 ring-1 ring-primary rounded cursor-pointer hover:bg-slate-200 dark:hover:bg-zinc-700"
          v-for="p in props.proposicoes"
          :key="p.id"
          @click="$router.push(`/proposicoes/${p.id}`)"
      >
        <ProposicaoSummary :proposicao="p"/>
      </li>
    </template>

    <ALPagination
      v-if="props.showPagination"
      v-model="page"
      :total-pages="props.totalPages || 0"
    />
  </ul>
</template>