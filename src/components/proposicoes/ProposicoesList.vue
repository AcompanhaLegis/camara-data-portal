<script setup lang='ts'>
import { defineEmits, defineProps, ref, watch } from "vue";
import { IProposicaoSummary } from "@/types/IProposicao";
import ALSkeletonLoading from "@/components/ui/ALSkeletonLoading.vue";
import ALPagination from "@/components/ui/ALPagination.vue";

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
  <ul class='flex flex-col w-full gap-2'>
    <template v-if='isLoading'>
      <ALSkeletonLoading class='mb-6' rows='3' v-for='mocks in 10' :key='mocks' />
    </template>
    <template v-else>
      <li class='p-2 ring-1 ring-primary rounded text-slate-700' v-for='p in props.proposicoes' :key='p.id'>
        <p>
          <b class='al-avatar al-avatar-sm text-xs inline-flex justify-center items-center text-primary'>
            {{ p.siglaTipo }}
          </b>
          {{ p.numero }}/{{ p.ano }}
        </p>
        <hr class='my-2' />
        <p>{{ p.ementa }}</p>
      </li>
    </template>

    <ALPagination
      v-if='props.showPagination'
      v-model='page'
      :totalPages='props.totalPages'
    />
  </ul>
</template>