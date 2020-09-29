<template>
  <div :class="['left-menu', { collapsed }]">
    <div class="logo">
      <img src="~/assets/logo_light.svg" />
    </div>
    <a-menu
      :default-selected-keys="[$nuxt.$route.name]"
      mode="inline"
      theme="dark"
      class="full-menu"
      :inline-collapsed="collapsed"
    >
      <a-menu-item key="deputados">
        <n-link to="/deputados">
          <a-icon type="idcard" />
          <span>Deputados</span>
        </n-link>
      </a-menu-item>

      <a-menu-item key="proposicoes">
        <n-link to="/proposicoes">
          <a-icon type="book" />
          <span>Proposições</span>
        </n-link>
      </a-menu-item>

      <a-menu-item key="eventos">
        <n-link to="/eventos">
          <a-icon type="calendar" />
          <span>Eventos</span>
        </n-link>
      </a-menu-item>

      <a-sub-menu v-if="$auth.loggedIn" key="favoritos">
        <span slot="title">
          <a-icon type="heart" />
          <span>Favoritos</span>
        </span>
        <a-sub-menu key="favoriteProposicoes">
          <span slot="title">
            <span>Proposições</span>
          </span>
          <a-menu-item v-for="p in favoriteProposicoes" :key="p.id">
            <n-link :to="`/proposicoes/${p.proposicao_id}`">
              <span>{{ p.name }}</span>
            </n-link>
          </a-menu-item>
        </a-sub-menu>
      </a-sub-menu>

      <a-menu-item v-if="$auth.loggedIn" class="last" @click="$auth.logout()">
        <a-icon type="logout" />
        <span>Logout</span>
      </a-menu-item>
    </a-menu>
    <a-icon
      class="collapse-icon"
      :type="collapsed ? 'right-circle' : 'left-circle'"
      @click="collapsed = !collapsed"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    favoriteProposicoes() {
      return (
        (this.$auth.loggedIn && this.$auth.user.favorite_proposicoes) || []
      );
    }
  }
};
</script>

<style lang="scss">
.left-menu {
  width: 260px;
  height: 100vh;
  overflow: hidden;
  position: relative;
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
  }
  .last {
    position: absolute;
    bottom: 0;
  }
  .collapse-icon {
    position: absolute;
    top: 30px;
    left: 20px;
    font-size: 1rem;
    color: white;
  }
}
.collapsed {
  width: fit-content;
  > ul {
    margin-right: 0;
  }
}
</style>
