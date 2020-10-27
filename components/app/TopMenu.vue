<template>
  <a-menu
    id="top-menu"
    mode="horizontal"
    theme="light"
    :style="{ boxShadow: '0 -4px 10px #1890ff' }"
    :default-selected-keys="[$nuxt.$route.name]"
  >
    <a-menu-item v-if="$auth.loggedIn" key="profile" class="item-right">
      <n-link to="/profile">
        <a-icon type="user" />
        Perfil
      </n-link>
    </a-menu-item>

    <a-menu-item v-else key="login" class="item-right">
      <n-link to="/login">
        <a-icon type="user" />
        Login
      </n-link>
    </a-menu-item>

    <a-menu-item v-if="false" key="notifications" class="item-right">
      <a-icon type="bell" />
      Notificaçōes
    </a-menu-item>
    <a-dropdown class="fav-item-margin" v-if="$auth.loggedIn" key="favoritos">
      <a-menu class="fav-list" slot="overlay" @click="handleMenuClick">
        <template v-if="$auth.user.favorite_proposicoes.length">
          <a-menu-item>
            <a-input
              v-model="searchFav"
              placeholder="Procurar em favoritos"
              @click.prevent.stop
            />
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item v-for="p in favoriteProposicoes" :key="p.id">
            <n-link :to="`/proposicoes/${p.proposicao_id}`">
              <a-icon />{{ p.name }}
            </n-link>
          </a-menu-item>
        </template>
        <a-menu-item class="no-favs" v-else>Não existem favoritos</a-menu-item>
      </a-menu>
      <a-button class="item-right">
        <a-icon type="heart" />Favoritos <a-icon type="down" />
      </a-button>
    </a-dropdown>
  </a-menu>
</template>
<script>
export default {
  data() {
    return {
      searchFav: ''
    };
  },
  methods: {
    handleMenuClick(e) {
      console.log('click', e);
    }
  },
  computed: {
    favoriteProposicoes() {
      return (
        (this.$auth.loggedIn && this.$auth.user.favorite_proposicoes) ||
        []
      ).filter((favItem) => {
        return favItem.name
          .toLowerCase()
          .includes(this.searchFav.toLowerCase());
      });
    }
  }
};
</script>
<style lang="scss">
#top-menu {
  position: sticky;
  top: 0;
  z-index: 999;
  .item-right {
    float: right;
  }
  .fav-item-margin {
    margin-top: 8px;
  }
}
.fav-list {
  max-height: 30vh;
  overflow-y: auto;
}
.no-favs {
  font-weight: 200;
  font-size: 15px;
  font-style: italic;
}
</style>
