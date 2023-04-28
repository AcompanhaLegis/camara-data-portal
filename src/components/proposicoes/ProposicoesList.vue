<script setup lang='ts'>
import { defineProps } from "vue";
import { IProposicaoSummary } from "@/types/IProposicao";

interface IProps {
  proposicoes: IProposicaoSummary[];
}

const props = defineProps<IProps>();
</script>

<template>
  <ul class='flex flex-col w-full gap-2'>
    <li class='p-2 ring-1 ring-primary rounded text-slate-700' v-for='p in proposicoes' :key='p.id'>
      <p><b class='al-avatar al-avatar-sm text-xs inline-flex justify-center items-center text-primary'>{{ p.siglaTipo
        }}</b>
        {{ p.numero
        }}/{{ p.ano }}
      </p>
      <hr class='my-2' />
      <p>{{ p.ementa }}</p>
    </li>
  </ul>
</template>