<template functional>
  <header class="website-header">
    <div class="header-title">
      <img src="~/assets/logo-dark-notext.svg" />
      <h1>Acompanha Legis</h1>
    </div>
    <nav class="navbar">
      <n-link to="/">
        Sobre
      </n-link>

      <n-link to="/proposicoes">
        Proposições
      </n-link>

      <v-btn color="primary" large>Seja um apoiador</v-btn>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.website-header {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  background: transparent;
  .header-title {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 1rem;
    align-items: center;
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
    a {
      color: #000;
      text-decoration: none;
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
}

@media screen and (max-width: 1024px) {
  .website-header {
    .header-title {
      h1 {
        display: none;
      }
    }
    .navbar {
      display: grid;
      grid-template-columns: max-content max-content max-content;
      grid-gap: 10px;
      align-items: center;
      justify-content: end;
      a {
        text-decoration: none;
        font-size: 1.5rem;
        font-weight: bold;
      }
    }
  }
}
</style>
