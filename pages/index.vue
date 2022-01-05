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
      <div v-for="cube in 6" :key="cube" class="cube" />
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

/** based on https://codepen.io/BjornRombaut/details/mOLGgX */
.cube {
  position: absolute;
  top: 80vh;
  left: 45vw;
  width: 10px;
  height: 10px;
  border-radius: 0.8px;
  border: solid 1px #1976d2;
  transform-origin: top left;
  transform: scale(0) rotate(0deg) translate(-50%, -50%);
  animation: cube 12s ease-in forwards infinite;

  &:nth-child(2n) {
    border-color: lighten(#1976d2, 10%);
  }

  &:nth-child(2) {
    animation-delay: 2s;
    left: 25vw;
    top: 40vh;
  }

  &:nth-child(3) {
    animation-delay: 4s;
    right: -50%;
    top: 50vh;
  }

  &:nth-child(4) {
    animation-delay: 6s;
    left: 90vw;
    top: 10vh;
  }

  &:nth-child(5) {
    animation-delay: 8s;
    left: 10vw;
    top: 85vh;
  }

  &:nth-child(6) {
    animation-delay: 10s;
    left: 50vw;
    top: 10vh;
  }
}

@keyframes cube {
  from {
    transform: scale(0) rotate(0deg) translate(-50%, -50%);
    opacity: 1;
  }
  to {
    transform: scale(20) rotate(960deg) translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
