<template>
  <div id="auth">
    <template v-if="$fetchState.pending">
      <section class="loading">
        <a-spin size="large" />
      </section>
    </template>
    <template v-else-if="$fetchState.error">
      Error: {{ $fetchState.error }}
    </template>
    <template v-else>
      <left-menu />
      <div id="auth-container">
        <top-menu />
        <main id="content">
          <nuxt />
        </main>
      </div>
    </template>
  </div>
</template>

<script>
import LeftMenu from '~/components/app/LeftMenu.vue';
import TopMenu from '~/components/app/TopMenu.vue';
export default {
  components: {
    LeftMenu,
    TopMenu
  },
  async fetch() {
    if (!this.$store.state.deputados.length) {
      await this.$store.dispatch('fetchDeputados');
    }
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
