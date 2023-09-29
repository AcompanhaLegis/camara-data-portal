<script setup lang='ts'>
import { ref, computed } from "vue";
import { onMounted } from "vue";
import useDeputados from "@/composables/useDeputados";
import {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption
} from "@headlessui/vue";
import debounce from "@/utils/debounce";
import { IDeputadoSummary } from "@/types/IDeputado";

const props = defineProps<{
  modelValue: IDeputadoSummary | null;
}>();
const { deputados, loading, getDeputados } = useDeputados();
onMounted(() => {
    getDeputados();
});

const emit = defineEmits(["update:modelValue"]);

const selectedDeputado = computed({
    get: () => {
        return props.modelValue;
    },
    set: (value) => {
        emit("update:modelValue", value);
    }
});

const query = ref("");
const filteredDeputados = computed(() => {
    return deputados.value
        .filter((deputado) => {
            return deputado.nome.toLowerCase().includes(query.value.toLowerCase());
        })
        .slice(0, 20);
});
const setQueryDebounce = debounce((value: string) => {
    query.value = value;
}, 200);

const displayName = (deputado: unknown) => {
    if (deputado) {
        return (deputado as IDeputadoSummary).nome;
    }
    return "";
};
</script>

<template>
  <div class='flex flex-col gap-1 w-full md:w-1/2 relative'>
    <label>Busca por deputados</label>
    <template v-if='!loading'>
      <Combobox v-model='selectedDeputado'>
        <ComboboxInput
          class='al-input'
          :displayValue='displayName'
          @change='setQueryDebounce($event.target.value)'
        />
        <ComboboxOptions class='al-dropdown' v-show='filteredDeputados.length'>
          <ComboboxOption
            v-for='deputado in filteredDeputados'
            :key='deputado.id'
            :value='deputado'
            v-slot='{ active, selected }'
            as='template'
          >
            <li
              :class="[
                'al-dropdown-option',
                { 'al-dropdown-option-active': active },
                { 'al-dropdown-option-selected': selected },
              ]"
            >
              <div class='flex items-center gap-2'>
                <img
                  :src='deputado.urlFoto'
                  class='al-avatar'
                  alt='Foto de {{ deputado.nome }}'
                  loading='lazy'
                />
                <div>
                  <div>{{ deputado.nome }}</div>
                  <div class='text-sm text-gray-500'>
                    {{ deputado.siglaPartido }}
                  </div>
                </div>
              </div>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </Combobox>
    </template>
  </div>
</template>
