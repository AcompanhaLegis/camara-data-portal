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

      <section class="home-section second-section">
        <HomeAbout />
        <div class="interpage-cube desktop-only" role="none" />
        <div class="interpage-cube-inner desktop-only" role="none" />
      </section>

      <div v-for="cube in 8" :key="cube" class="cube" role="none" />
    </main>
  </v-app>
</template>

<script>
import Header from '@/components/website/Header.vue';
import HomeInitialContent from '@/components/website/HomeInitialContent.vue';
import HomeAbout from '@/components/website/HomeAbout.vue';

export default {
  auth: false,
  components: {
    Header,
    HomeInitialContent,
    HomeAbout
  },
  layout: 'default'
};
</script>

<style lang="scss">
@import '~assets/css/utils.scss';
@import '~assets/css/variables.scss';

#home {
  background-color: $light-bg-color;

  .v-btn__content {
    font-weight: 600;
    font-size: 1.5rem;
  }

  .home-section {
    min-height: 100vh;
    width: 100vw;
    padding: 4rem 12% 0 12%;
    position: relative;
    z-index: 3;
  }

  .first-section {
    background-color: $light-bg-color;
  }

  .second-section {
    background-color: white;
  }
}
@media screen and (max-width: 1024px) {
  #home {
    .v-btn__content {
      font-weight: 600;
      font-size: 1rem;
    }
    .home-section {
      padding: 10px 5px;
    }
  }
}

.interpage-cube {
  position: absolute;
  top: -250px;
  right: -120px;
  width: 500px;
  height: 500px;
  background-color: $primary-color;
  border-radius: 8px;
  transform: rotate(45deg);
  z-index: -2;
}

.interpage-cube-inner {
  position: absolute;
  border: 9px solid white;
  background-color: transparent;
  transform: rotate(45deg);
  z-index: -1;
  width: 222px;
  height: 222px;
  top: -111px;
  right: -90px;
}

/** based on https://codepen.io/BjornRombaut/details/mOLGgX */
.cube {
  position: absolute;
  top: 80vh;
  left: 45vw;
  width: 12px;
  height: 12px;
  border-radius: 1px;
  border: solid 1px $primary-color;
  transform-origin: top left;
  transform: scale(0) rotate(0deg) translate(-50%, -50%);
  animation: cube 12s ease-in forwards infinite;
  z-index: 4;

  &:nth-child(2n) {
    border-color: lighten($primary-color, 10%);
  }

  &:nth-child(2) {
    animation-delay: 2s;
    left: 25vw;
    top: 40vh;
  }

  &:nth-child(3) {
    animation-delay: 4s;
    right: 20vw;
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
    top: 120vh;
  }

  &:nth-child(6) {
    animation-delay: 4s;
    left: 25vw;
    top: 160vh;
  }

  &:nth-child(7) {
    animation-delay: 6s;
    right: 2vw;
    top: 110vh;
  }

  &:nth-child(8) {
    animation-delay: 2s;
    left: 80vw;
    top: 185vh;
  }
}

@keyframes cube {
  from {
    transform: scale(0) rotate(0deg) translate(-50%, -50%);
    opacity: 1;
  }
  to {
    transform: scale(14) rotate(960deg) translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
