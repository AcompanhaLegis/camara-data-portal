<template>
  <v-app>
    <main id="home">
      <section class="home-section first-section">
        <v-container>
          <v-row no-gutters>
            <v-col cols="12" sm="12">
              <Header />
            </v-col>
          </v-row>
        </v-container>
      </section>
    </main>
  </v-app>
</template>

<script>
import Header from '@/components/website/Header.vue';

export default {
  auth: false,
  components: {
    Header
  },
  layout: 'default'
};
</script>

<style lang="scss">
#home {
  background-color: #f2f6ff;

  .home-section {
    height: 100vh;
    width: 100vw;
    padding: 4rem 10rem 0 4rem;
    position: relative;
  }

  .first-section {
    background-color: #f2f6ff;
  }
}
@media screen and (max-width: 1024px) {
  #home {
    .home-section {
      padding: 10px 5px;
    }
  }
}
</style>
