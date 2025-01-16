<script setup lang="ts">
import ALFooter from "./ALFooter.vue";
import ALHeader from "./ALHeader.vue";
import { Breadcrumb } from "primevue";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const home = ref({
    icon: "pi pi-home",
    route: "/"
});

const route = useRoute();
const items = computed(() => route.matched.map((route) => ({
    label: route.meta.breadcrumb,
})));
</script>

<template>
  <div class='mx-auto min-h-screen w-screen! flex flex-col overflow-y-auto overflow-x-none'>
    <ALHeader />

    <main class="p-2 md:p-8 pb-8">
      <Breadcrumb :home="home" :model="items">
        <template #item="{ item, props }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">
              <span :class="[item.icon, 'text-color']" />
              <span class="text-primary font-semibold">{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else :href="item.url" :target="item.target" v-bind="props.action">
            <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
          </a>
        </template>
      </Breadcrumb>
      <slot />
    </main>

    <ALFooter />
  </div>
</template>

<style scoped>
</style>