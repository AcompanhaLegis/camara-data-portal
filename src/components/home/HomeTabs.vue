<script setup lang='ts'>
import { onMounted, ref, watch } from "vue";
import {useRoute, useRouter} from "vue-router";
import { Tabs, Tab, TabPanels, TabList, TabPanel } from "primevue";
import DeputadosTab from "../deputados/DeputadosTab.vue";
import ProposicoesTab from "../proposicoes/ProposicoesTab.vue";

const route = useRoute();
const router = useRouter();
const selectedTab = ref<number>(0);

onMounted(() => {
    const tab = route.query.tab;
    if (tab) {
        const index = tabs.findIndex((t) => t.tab === tab);
        if (index >= 0) {
            selectedTab.value = index;
        }
    }
});

const tabs = [
    { label: "Proposições", tab: "proposicoes" },
    { label: "Deputados", tab: "deputados" },
];

watch(selectedTab, (index) => {
    const { tab } = tabs[index];
    router.push({ query: { tab }});
});
</script>

<template>
  <Tabs v-model:value="selectedTab">
    <TabList>
      <Tab v-for="(tab, idx) in tabs" :key="tab.label" :value="idx">
        {{ tab.label }}
      </Tab>
    </TabList>

    <TabPanels>
      <TabPanel :value="0">
        <ProposicoesTab />
      </TabPanel>

      <TabPanel :value="1">
        <DeputadosTab />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>
