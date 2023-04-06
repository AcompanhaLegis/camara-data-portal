<script setup lang="ts">
import ALFooter from './ALFooter.vue';
import ALHeader from './ALHeader.vue';
</script>

<template>
  <div class="container mx-auto h-screen">
    <ALHeader />

    <main>
      <slot />
    </main>

    <ALFooter />
  </div>
</template>

<style scoped>
</style>