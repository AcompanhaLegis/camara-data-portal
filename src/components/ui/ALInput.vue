<script setup lang='ts'>
interface IProps {
  label: string;
  modelValue: string;
  type?: string;
}

defineProps<IProps>();
const emit = defineEmits(["update:modelValue"]);

const handleChange = (e: Event) => {
    emit("update:modelValue", ((e.target as HTMLInputElement).value));
};
</script>

<template>
  <div class='flex flex-col'>
    <label class='text-primary' for='{{ label }}'>{{ label }}</label>
    <input
      :id='label'
      :value='modelValue'
      :type='type || "text"'
      @change='handleChange'
      class='ring-1 ring-secondary rounded-md p-2'
    />
  </div>
</template>
