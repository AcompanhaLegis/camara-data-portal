<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { TabGroup, Tab, TabPanels, TabList, TabPanel } from '@headlessui/vue';
import DeputadosTab from './deputados/DeputadosTab.vue';

const route = useRoute();
const selectedTab = computed(() => {
    const tab = route.query.tab;
    if (tab === 'legislauras') {
        return 'Legislauras';
    } else if (tab === 'deputados') {
        return 'Deputados';
    } else if (tab === 'agenda') {
        return 'Agenda';
    } else {
        return 'Legislauras';
    }
});
const tabs = [
    { label: 'Legislauras', route: '/?tab=legislauras' },
    { label: 'Deputados', route: '/?tab=deputados' },
    { label: 'Agenda', route: '/?tab=agenda' },
];
</script>

<template>
  <TabGroup>
    <TabList class="flex gap-2 md:gap-8 border-b border-gray">
      <Tab
        v-for="tab in tabs"
        :key="tab.label"
        :class="[
          'py-2',
          'px-4',
          'md:px-6',
          { 'border-b-2 border-blue-500': selectedTab === tab.label },
        ]"
        @click="() => $router.push(tab.route)"
      >
        {{ tab.label }}
      </Tab>
    </TabList>
    <TabPanels class="p-4">
      <TabPanel>Content 1</TabPanel>
      <TabPanel>
        <DeputadosTab />
      </TabPanel>
      <TabPanel>Content 3</TabPanel>
    </TabPanels>
  </TabGroup>
</template>
