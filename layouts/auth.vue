<template>
  <v-app>
    <template v-if="$fetchState.pending">
      <section class="loading">
        <a-spin size="large" />
      </section>
    </template>
    <template v-else-if="$fetchState.error">
      Error: {{ $fetchState.error }}
    </template>
    <template v-else>
      <LeftMenu />
      <v-main>
        <div id="auth-container">
          <bread-crumbs />
          <main id="content">
            <nuxt />
          </main>
        </div>
      </v-main>
    </template>
  </v-app>
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
@import '~assets/css/variables.scss';

.ant-btn-primary {
  color: white !important;
}

#auth-container {
  overflow-y: auto;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px;
}
</style>
