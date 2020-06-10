<template>
  <div id="auth">
    <left-menu />
    <div id="auth-container">
      <top-menu />
      <main id="content">
        <nuxt />
      </main>
    </div>
  </div>
</template>

<script>
import LeftMenu from '~/components/app/LeftMenu.vue';
import TopMenu from '~/components/app/TopMenu.vue';
export default {
  components: {
    LeftMenu,
    TopMenu
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
  height: 100vh;
  overflow-y: auto;
  width: calc(100vw - 260px);
  display: flex;
  flex-direction: column;
}

#content {
  padding: 40px 20px;
}
</style>
