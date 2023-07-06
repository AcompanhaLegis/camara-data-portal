<script setup lang='ts'>
import { defineProps } from "vue";

interface IProps {
  rows: number;
}

const props = defineProps<IProps>();
</script>

<template>
  <div role='status' class='w-full animate-pulse ring-1 ring-slate-700 rounded p-4'>
    <template v-for='r in props.rows' :key='r'>
      <div class='h-3 w-1/2 bg-slate-200 rounded-full dark:bg-slate-800 mb-4'></div>
      <div class='h-2 bg-slate-200 rounded-full dark:bg-slate-800 mb-4'></div>
      <div class='h-2 bg-slate-200 rounded-full dark:bg-slate-800 mb-4'></div>
    </template>
  </div>
</template>