<template>
  <div :class="['left-menu', { collapsed }]">
    <div class="logo">
      <a-button
        class="collapsed-button"
        type="primary"
        shape="circle"
        @click="collapsed = !collapsed"
      >
        <a-icon
          class="collapse-icon"
          :type="collapsed ? 'right-circle' : 'left-circle'"
        />
      </a-button>
      <br />
      <img
        :src="
          require(!collapsed
            ? '~/assets/logo_light.svg'
            : '~/assets/logo-light-notext.svg')
        "
      />
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

      <a-menu-item v-if="$auth.loggedIn" class="last" @click="$auth.logout()">
        <a-icon type="logout" />
        <span>Logout</span>
      </a-menu-item>
    </a-menu>
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
    padding: 5px 0 20px 0;
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
  .collapsed-button {
    position: fixed;
    left: 1px;
    background-color: #001529;
    border: none;
  }
  .collapse-icon {
    font-size: 1rem;
    color: white;
  }
}
.collapsed {
  width: 80px;
  > ul {
    margin-right: 0;
  }
  .logo {
    > img {
      max-width: 50%;
      padding: 10px 0 0 0;
    }
  }
}
</style>
