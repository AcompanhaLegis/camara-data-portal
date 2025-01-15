<script setup lang='ts'>
import { Skeleton } from "primevue";
interface IProps {
  rows: number;
}

const props = defineProps<IProps>();
</script>

<template>
  <div role='status' class='w-full animate-pulse rounded p-4'>
    <template v-for='r in props.rows' :key='r'>
      <Skeleton class="mb-2 w-full"></Skeleton>
      <Skeleton class="mb-2 w-3/4"></Skeleton>
    </template>
  </div>
</template>