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
  <header class="h-16 bg-white shadow flex justify-between align-center p-4">
      <router-link to="/" class="flex">
        <img alt="Logo do Acompanha Legis" src="/acompanha_legis.svg"/>
        <p class="hidden md:block text-slate-700 ml-4">Acompanha Legis</p>
      </router-link>
      <nav>
        <ul class="flex gap-12 text-slate-500">
          <router-link :to="link.route" :key="link.label" v-for="link in links" activeClass="font-bold text-slate-700">
            {{ link.label }}
          </router-link>
        </ul>
      </nav>
  </header>
</template>