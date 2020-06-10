<template>
  <div id="home">
    <a-menu mode="horizontal" theme="dark" class="menu">
      <a-menu-item class="item-right">
        <n-link to="/login">
          Login
        </n-link>
      </a-menu-item>

      <a-menu-item class="item-right">
        <n-link to="/">
          Planos
        </n-link>
      </a-menu-item>

      <a-menu-item class="item-right">
        <n-link to="/">
          Home
        </n-link>
      </a-menu-item>
    </a-menu>

    <main class="full-height-section">
      <section class="presentation">
        <img src="~/assets/home_laptop.png" class="home-laptop" />
        <section class="presentation-text">
          <h1>Acompanha Legis</h1>
          <h2>
            A plataforma que possibilita acompanhar proposiçōes, deputados e
            outras atividades na camara dos deputados!
          </h2>
          <a-button size="large">Assine agora!</a-button>
        </section>
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
#home {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  .menu {
    width: 100vw;
  }
  .full-height-section {
    min-height: calc(100vh - 46px);
  }

  .btn-holder {
    display: flex;
    justify-content: center;
    button {
      margin: 10px;
    }
  }

  .presentation {
    position: relative;
    .home-laptop {
      width: 750px;
      position: absolute;
      top: 80px;
      right: 5%;
      z-index: 99;
    }
    .presentation-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 50%);
      background: linear-gradient(
        0deg,
        rgba(24, 144, 255, 1) 0%,
        rgba(0, 126, 245, 1) 100%
      );
      padding: 50px 100px;
      width: 100vw;
      h1 {
        font-size: 3rem;
        color: white;
      }
      h2 {
        font-size: 2rem;
        width: 35vw;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .presentation {
      .home-laptop {
        display: none;
      }
    }
  }
}
</style>
