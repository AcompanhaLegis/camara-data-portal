<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="!drawer"
    dark
    permanent
    app
    class="left-menu"
  >
    <v-list-item>
      <v-img :src="logo" class="logo" />
    </v-list-item>

    <v-btn icon class="collapse-btn" @click.stop="drawer = !drawer">
      <v-icon>{{ `mdi-chevron-${drawer ? 'left' : 'right'}` }}</v-icon>
    </v-btn>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
        v-for="item in routes"
        :key="item.title"
        link
        @click="$router.push({ path: item.to })"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-title>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Logo from '~/assets/logo_light.svg';

export default {
  data() {
    return {
      routes: [
        {
          to: '/proposicoes',
          title: 'Proposições',
          icon: 'mdi-book-open-variant'
        },
        {
          to: '/deputados',
          title: 'Deputados',
          icon: 'mdi-card-account-details-star'
        },
        { to: '/eventos', title: 'Eventos', icon: 'mdi-calendar-alert' }
      ],
      drawer: true,
      mini: true,
      collapsed: false,
      logo: Logo
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/variables.scss';

.left-menu {
  padding: 20px 0;
  .collapse-btn {
    display: flex;
    margin: 10px 10px 10px auto;
  }
  .logo {
    margin-bottom: 20px;
    > img {
      max-width: 100%;
    }
  }
  .route {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 20px;
    color: white;
  }

  a.nuxt-link-active {
    color: $primary-color !important;
  }
}
</style>
