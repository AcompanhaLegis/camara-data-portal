<script setup lang="ts">
import { Timeline, Card, Tag } from "primevue";
import { formatDateTime } from "../../../utils/dateUtils";
import type { ITramitacao } from "@/types/IProposicao";

interface IProps {
  tramitacoes: ITramitacao[];
}

const props = defineProps<IProps>();

</script>

<template>
  <div data-testid="proposicoes-timeline" class="overflow-x-auto max-w-full">
    <Timeline :value="tramitacoes">
      <template #content="slotProps">
        <Card class="w-full mb-10">
          <template #title>
            <h3 class="text-secondary">
              {{ slotProps.item.descricaoTramitacao }}
            </h3>
          </template>

          <template #subtitle>
            <div class="flex flex-col gap-2">
              <dl class="grid grid-cols-2 md:grid-cols-1 gap-1">
                  <dt class="col-span-2 text-primary-emphasis">Órgão: </dt>
                  <dd class="col-span-4 mb-4 text-slate-800 dark:text-zinc-100">
                    {{ slotProps.item.siglaOrgao }}
                  </dd>
              </dl>

              <dl class="grid grid-cols-2 md:grid-cols-1 gap-1">
                <dt class="col-span-2 text-primary-emphasis">Situação: </dt>
                <dd class="col-span-4 mb-4 text-slate-800 dark:text-zinc-100">
                  {{ slotProps.item.descricaoSituacao || '?' }}
                </dd>
              </dl>
            </div>
          </template>

          <template #content>
            <p>{{ slotProps.item.despacho }}</p>
          </template>
        </Card>
      </template>
    </Timeline>
  </div>
</template>

<style>
.p-timeline-event-opposite {
  @apply hidden;
}
</style>