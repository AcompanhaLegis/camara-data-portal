<template>
  <div class="container">
    <main class="full-height-section">
      <section class="btn-holder">
        <a-button type="primary" size="large">
          Saiba mais
        </a-button>

        <nuxt-link :to="loginRoute">
          <a-button size="large">
            Já sou cadastrado
          </a-button>
        </nuxt-link>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  auth: false,
  computed: {
    loginRoute() {
      if (this.$auth.loggedIn) {
        return '/proposicoes';
      }
      return '/login';
    }
  }
};
</script>

<style lang="scss">
.container {
  margin: 0 auto;

  .full-height-section {
    min-height: 100vh;
  }

  .btn-holder {
    display: flex;
    justify-content: center;
    button {
      margin: 10px;
    }
  }
}
</style>
