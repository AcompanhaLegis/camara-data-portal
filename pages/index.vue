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

          <HomeInitialContent />
        </v-container>
      </section>
    </main>
  </v-app>
</template>

<script>
import Header from '@/components/website/Header.vue';
import HomeInitialContent from '@/components/website/HomeInitialContent.vue';

export default {
  auth: false,
  components: {
    Header,
    HomeInitialContent
  },
  layout: 'default'
};
</script>

<style lang="scss">
@import '~assets/css/utils.scss';

#home {
  background-color: #f2f6ff;

  .v-btn__content {
    font-weight: 600;
    font-size: 1.5rem;
  }

  .home-section {
    height: 100vh;
    width: 100vw;
    padding: 4rem 12% 0 12%;
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
