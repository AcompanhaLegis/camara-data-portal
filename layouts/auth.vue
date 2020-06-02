<template>
  <div id="auth">
    <left-menu />
    <div id="auth-container">
      <nuxt />
    </div>
  </div>
</template>

<script>
import LeftMenu from '~/components/app/LeftMenu.vue';
export default {
  components: {
    LeftMenu
  }
};
</script>

<style lang="scss">
#auth {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
}

#auth-container {
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
  width: calc(100vw - 260px);
}
</style>
