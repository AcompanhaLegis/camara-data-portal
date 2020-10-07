<template>
  <img src="~/assets/logo.svg" class="NuxtLogo" :alt="logo" />
</template>

<style>
.NuxtLogo {
  animation: 1s appear;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
