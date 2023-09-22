<script setup lang='ts'>
import ALFooter from "./ALFooter.vue";
import ALHeader from "./ALHeader.vue";
</script>

<template>
  <div class='mx-auto min-h-screen w-screen! flex flex-col overflow-y-auto overflow-x-none'>
    <ALHeader />

    <main class="p-2 md:p-8 pb-8">
      <slot />
    </main>

    <ALFooter />
  </div>
</template>

<style scoped>
</style>