<script setup lang="ts">
import { ref } from "vue";

interface Link {
  label: string;
  route: string;
}

const links = ref<Link[]>([
    { label: "Home", route: "/" },
    { label: "Sobre", route: "/about" },
]);
</script>

<template>
  <header class="h-16 bg-white shadow flex justify-between items-center p-4 dark:bg-slate-600">
      <router-link to="/" class="flex gap-4 !items-center">
        <img class="h-[90%]" alt="Logo do Acompanha Legis" src="/acompanha_legis.svg"/>
        <p class="hidden md:block !text-xl !dark:text-primary-100 !text-primary !text-bold">Acompanha Legis</p>
      </router-link>

      <nav>
        <ul class="flex gap-12 text-slate-900 dark:text-zinc-100">
          <router-link :to="link.route" :key="link.label" v-for="link in links" activeClass="font-bold">
            {{ link.label }}
          </router-link>
        </ul>
      </nav>
  </header>
</template>