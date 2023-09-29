<script setup lang="ts">
import {Disclosure, DisclosureButton, DisclosurePanel, TransitionRoot} from "@headlessui/vue";
</script>

<template>
  <div>
    <Disclosure>
      <DisclosureButton class="text-left w-full px-4 py-2 text-sm bg-slate-200 rounded-lg hover:bg-sky-100 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
        <slot name="button"></slot>
      </DisclosureButton>

      <TransitionRoot
          enter="transition ease-in-out duration-300 transform"
          enter-from="scale-y-60 opacity-50"
          enter-to="scale-y-100 opacity-100"
          leave="transition ease-in-out duration-300 transform"
          leave-from="scale-y-100 opacity-100"
          leave-to="scale-y-0 opacity-0"
      >
        <DisclosurePanel class="bg-white ring-1 ring-slate-500 p-6 rounded mt-1 shadow-md">
          <slot name="panel"></slot>
        </DisclosurePanel>
      </TransitionRoot>
    </Disclosure>
  </div>
</template>

<style scoped>

</style>