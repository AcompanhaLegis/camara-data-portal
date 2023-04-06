<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Navbar, NavbarLogo, NavbarCollapse, NavbarLink } from 'flowbite-vue';

interface Link {
  label: string;
  route: string;
}

const route = useRoute();
const links = ref<Link[]>([
  { label: 'Home', route: '/' },
  { label: 'Sobre', route: '/about' },
]);
const currentPath = computed(() => route.path);
</script>

<template>
  <Navbar>
    <template #logo>
      <NavbarLogo link="/" alt="Logo do Acompanha Legis" image-url="acompanha_legis.svg">
        Acompanha Legis
      </NavbarLogo>
    </template>
    <template #default="{isShowMenu}">
      <NavbarCollapse :isShowMenu="isShowMenu">
          <NavbarLink  v-for="link in links" :key="link.route" :isActive="currentPath === link.route">
            <router-link :to="link.route">
            {{ link.label }} {{ currentPath === link.route }}
            </router-link>
          </NavbarLink>
      </NavbarCollapse>
    </template>
  </Navbar>
</template>