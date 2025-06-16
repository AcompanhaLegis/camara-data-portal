<script lang="ts" setup>
import { inject, ref, watch } from "vue";
import { Tabs, Tab, TabList, TabPanels, TabPanel, DataTable, Column } from "primevue";
import useDeputadoExpenses from "@/composables/useDeputadoDespesas";
import DeputadoExpenseTable from "./DeputadoExpenseTable.vue";

const props = defineProps<{
    deputadoId: number;
}>();

const activeTab = ref("0");

const { loading, error, expenses, getDeputadoExpenses, maxPage} = useDeputadoExpenses();
const loadDeputadoExpensePage = async (page: number) => {
    await getDeputadoExpenses(props.deputadoId, page);
};

watch(activeTab, async (newValue) => {
    if (newValue === "0") {
        await getDeputadoExpenses(props.deputadoId);
    }
}, { immediate: true });


</script>

<template>
    <Tabs v-model:value="activeTab" class="max-h-[80vh] overflow-y-hidden">
        <TabList>
            <Tab value="0">Despesas</Tab>
        </TabList>
        <TabPanels class="overflow-y-auto max-h-[80vh] pb-2">
            <TabPanel value="0">
                <DeputadoExpenseTable
                    v-if="expenses"
                    :maxPage="maxPage"
                    :loading="loading"
                    :expenses="expenses"
                    @page="loadDeputadoExpensePage"
                />
                <p v-if="error" class="text-red-500">Erro ao carregar despesas: {{ error }}</p>
            </TabPanel>
        </TabPanels>
    </Tabs>
</template>