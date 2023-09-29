<script setup lang='ts'>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import { TabGroup, Tab, TabPanels, TabList, TabPanel } from "@headlessui/vue";
import DeputadosTab from "../deputados/DeputadosTab.vue";
import ProposicoesTab from "../proposicoes/ProposicoesTab.vue";

const route = useRoute();
const router = useRouter();
const selectedTab = ref<number>(0);

onMounted(() => {
    const tab = route.query.tab;
    if (tab) {
        const index = tabs.findIndex((t) => t.route === `/?tab=${tab}`);
        if (index >= 0) {
            selectedTab.value = index;
        }
    }
});

const tabs = [
    { label: "Proposições", route: "/?tab=proposicoes" },
    { label: "Deputados", route: "/?tab=deputados" },
    //{ label: "Agenda", route: "/?tab=agenda" }
];

const changeTab = (index: number) => {
    selectedTab.value = index ;
    router.push(tabs[index].route);
};
</script>

<template>
  <TabGroup
      :selectedIndex="selectedTab"
      @change='changeTab'
  >
    <TabList
        class='flex bg-gray-200 p-1 rounded-md text-slate-700 justify-between md:justify-start md:gap-8'
    >
      <Tab
        v-for='(tab, idx) in tabs'
        :key='tab.label'
        :class="[
          'py-1 px-2 md:px-4 rounded-md outline-none cursor-pointer',
          { 'bg-white text-blue-500': selectedTab === idx },
        ]"
      >
        {{ tab.label }}
      </Tab>
    </TabList>
    <TabPanels class='mt-4'>
      <TabPanel>
        <ProposicoesTab />
      </TabPanel>
      <TabPanel>
        <DeputadosTab />
      </TabPanel>
      <TabPanel>Content 3</TabPanel>
    </TabPanels>
  </TabGroup>
</template>
