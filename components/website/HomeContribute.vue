<template>
  <div id="home-contribute">
    <h2>
      Contribua com o projeto
    </h2>

    <section class="home-contribute-section">
      <img src="~/assets/home-octocat.png" class="octocat" />
      <a href="https://github.com/acompanhalegis" target="_blank">
        <v-btn>
          Construa junto com a gente!
        </v-btn>
      </a>
    </section>
  </div>
</template>

<style lang="scss">
#home-contribute {
  padding: 4rem 0;
  position: relative;
  h2 {
    font-size: 2.5rem;
    padding-left: calc(0.5rem + 8px);
    margin-bottom: 9%;
    color: white;
  }
  .home-contribute-section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 2;
    .octocat {
      width: 100%;
      max-width: 400px;
      margin-bottom: 2rem;
    }
  }
}
</style>
