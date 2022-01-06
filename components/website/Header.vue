<template>
  <header class="website-header">
    <div class="square-background" role="none" />
    <div class="header-title">
      <img src="~/assets/logo-dark-notext.svg" />
      <h1>Acompanha Legis</h1>
    </div>
    <nav class="navbar desktop-only">
      <a href="#" @click.prevent="scrollTo('#home-about')">
        Sobre
      </a>

      <v-menu offset-y>
        <template
          #activator="{
            // eslint-disable-next-line vue/no-unused-vars
            on, attrs 
          }"
        >
          <a href="#" v-bind="attrs" v-on="on">Plataforma</a>
        </template>
        <v-list>
          <v-list-item v-for="r in routes" :key="r.to">
            <v-list-item-title>
              <router-link :to="r.to">{{ r.name }}</router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn
        color="primary"
        large
        @click.prevent="scrollTo('#home-contribute')"
      >
        Seja um contribuidor
      </v-btn>
    </nav>
  </header>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      routes: [
        { to: '/proposicoes', name: 'Proposições' },
        { to: '/deputados', name: 'Deputados' },
        { to: '/eventos', name: 'Eventos' }
      ]
    };
  },
  methods: {
    scrollTo(selector) {
      document.querySelector(selector)?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }
};
</script>

<style lang="scss">
@import '~assets/css/utils.scss';

.website-header {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  background: transparent;
  width: 100%;
  .square-background {
    z-index: -1;
    position: absolute;
    width: 680px;
    height: 680px;
    top: -48%;
    left: 0;
    transform: rotate(42deg);
    background-color: white;
    border-radius: 20px;
  }
  .header-title {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 1rem;
    align-items: center;
    z-index: 3;
    h1 {
      font-size: 1.5rem;
    }
  }
  .navbar {
    display: grid;
    grid-template-columns: max-content max-content max-content;
    grid-gap: 2rem;
    align-items: center;
    justify-content: end;
    z-index: 3;
    a {
      color: #000;
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
}

@media screen and (max-width: 1024px) {
  .website-header {
    .square-background {
      width: 340px;
      height: 340px;
    }
    .navbar {
      display: grid;
      grid-template-columns: max-content max-content max-content;
      grid-gap: 10px;
      align-items: center;
      justify-content: end;
      a {
        text-decoration: none;
        font-size: 1.2rem;
        font-weight: bold;
      }
    }
  }
}
</style>
