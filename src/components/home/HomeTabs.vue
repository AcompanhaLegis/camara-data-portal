<script setup lang='ts'>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { TabGroup, Tab, TabPanels, TabList, TabPanel } from "@headlessui/vue";
import DeputadosTab from "./deputados/DeputadosTab.vue";

const route = useRoute();
const selectedTab = computed(() => {
    const tab = route.query.tab;
    if (tab === "proposicoes") {
        return "Proposições";
    } else if (tab === "deputados") {
        return "Deputados";
    } else if (tab === "agenda") {
        return "Agenda";
    } else {
        return "Proposições";
    }
});
const tabs = [
    { label: "Proposições", route: "/?tab=proposicoes" },
    { label: "Deputados", route: "/?tab=deputados" },
    { label: "Agenda", route: "/?tab=agenda" }
];
</script>

<template>
  <TabGroup>
    <TabList class='flex bg-gray-200 p-1 rounded-md text-slate-700 justify-between md:justify-start md:gap-8'>
      <Tab
        v-for='tab in tabs'
        :key='tab.label'
        :class="[
          'py-1 px-2 md:px-4 rounded-md outline-none cursor-pointer',
          { 'bg-white text-blue-500': selectedTab === tab.label },
        ]"
        @click='() => $router.push(tab.route)'
      >
        {{ tab.label }}
      </Tab>
    </TabList>
    <TabPanels class='mt-4'>
      <TabPanel>Content 1</TabPanel>
      <TabPanel>
        <DeputadosTab />
      </TabPanel>
      <TabPanel>Content 3</TabPanel>
    </TabPanels>
  </TabGroup>
</template>
