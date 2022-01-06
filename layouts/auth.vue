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
        <bread-crumbs />
        <main id="content">
          <nuxt />
        </main>
      </div>
    </template>
  </div>
</template>

<script>
import LeftMenu from '~/components/app/LeftMenu.vue';
import BreadCrumbs from '~/components/app/BreadCrumbs.vue';
export default {
  components: {
    LeftMenu,
    BreadCrumbs
  },
  async fetch() {
    if (!this.$store.state.deputados.length) {
      await this.$store.dispatch('fetchDeputados');
    }
    if (!this.$store.state.proposicaoTypes.length) {
      await this.$store.dispatch('fetchProposicoes');
    }
  }
};
</script>

<style lang="scss">
.ant-btn-primary {
  color: white !important;
}
#auth {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
}

#auth-container {
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex: 1;
  flex-direction: column;
}

#content {
  padding: 40px 20px;
}
</style>
