<script setup lang="ts">
import { inject, ref, watch } from "vue";
import { DataTable, Column } from "primevue";
import { DateLibKey } from "@/factories/DateFactory";
import type { IDateAdapter } from "@/adapters/DayJsAdapter";
import { IDeputadoExpense } from "@/types/IDeputado";

const props = defineProps<{
    maxPage: number;
    loading: boolean;
    expenses: IDeputadoExpense[];
}>();

const dateAdapter = inject<IDateAdapter>(DateLibKey)!;

const emit = defineEmits<{
    (e: "page",  page: number): void;
}>();

</script>

<template>
    <DataTable
        :value="props.expenses"
        :loading="props.loading"
        :rows="15"
        :total-records="props.maxPage*15"
        :responsiveLayout="'scroll'"
        @page="emit('page', $event.page + 1)"
        paginator
        lazy
    >
        <Column field="dataDocumento" header="Data do Documento">
            <template #body="slotProps">
                {{ dateAdapter.formatDate(slotProps.data.dataDocumento) }}
            </template>
        </Column>
        <Column field="tipoDespesa" header="Tipo de Despesa" />
        <Column field="nomeFornecedor" header="Fornecedor" />
        <Column field="cnpjCpfFornecedor" header="CNPJ/CPF do Fornecedor" />
        <Column field="valorDocumento" header="Valor do Documento">
            <template #body="slotProps">
                {{ slotProps.data.valorDocumento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
            </template>
        </Column>
        <Column field="valorGlosa" header="Valor Glosa">
            <template #body="slotProps">
                {{ slotProps.data.valorGlosa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
            </template>
        </Column>
        <Column field="valorLiquido" header="Valor Líquido">
            <template #body="slotProps">
                {{ slotProps.data.valorLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
            </template>
        </Column>
        <Column field="urlDocumento" header="Documento Completo">
            <template #body="slotProps">
                <a v-if="slotProps.data.urlDocumento" :href="slotProps.data.urlDocumento" target="_blank" class="text-blue-500 hover:underline">
                    <i class="pi pi-file" aria-hidden="true"></i> Ver Documento
                </a>
                <span v-else class="text-gray-500">Documento não disponível</span>
            </template>
        </Column>
    </DataTable>
</template>