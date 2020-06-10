<template>
  <div id="left-menu">
    <div class="logo">
      <img src="~/assets/logo_light.svg" />
    </div>
    <a-menu
      :default-selected-keys="[$nuxt.$route.name]"
      mode="inline"
      theme="dark"
      class="full-menu"
    >
      <a-menu-item key="proposicoes">
        <n-link to="/proposicoes">
          <a-icon type="book" />
          <span>Proposições</span>
        </n-link>
      </a-menu-item>

      <a-menu-item key="deputados">
        <n-link to="/deputados">
          <a-icon type="idcard" />
          <span>Deputados</span>
        </n-link>
      </a-menu-item>

      <a-sub-menu key="favoritos">
        <span slot="title"><a-icon type="heart" /><span>Favoritos</span></span>
        <a-sub-menu key="favoriteProposicoes">
          <span slot="title"><span>Proposições</span></span>
          <a-menu-item v-for="p in favoriteProposicoes" :key="p.id">
            <n-link :to="`/proposicoes/${p.proposicao_id}`">
              <span>{{ p.name }}</span>
            </n-link>
          </a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  computed: {
    favoriteProposicoes() {
      return this.$auth.user.favorite_proposicoes;
    }
  }
};
</script>

<style lang="scss">
#left-menu {
  width: 260px;
  height: 100vh;
  overflow: hidden;
  .logo {
    background-color: #001529;
    padding: 20px 0;
    text-align: center;
    border-bottom: 1px solid white;
    > img {
      max-width: 100%;
    }
  }
  .full-menu {
    width: 100%;
    height: 100%;
    li:first-child {
      margin-top: 0;
    }
  }
}
</style>
