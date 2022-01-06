<template functional>
  <div id="home-about" role="complementary">
    <h2>Sobre</h2>

    <section class="home-about-text">
      <p>
        O projeto começou como um projeto privado para fornecer dados compilados
        de proposições e deputados, para que gabinetes pudessem acompanhar as
        atividades da câmara dos deputados.
      </p>

      <p>
        Em 2020 projeto foi transformado em um projeto público e aberto (Open
        Source), para que todos possam acompanhar essas atividades no governo.
      </p>

      <p>
        Hoje o projeto está em constante desenvolvimento e utilizamos nosso
        <a href="https://github.com/acompanhalegis" target="_blank">GitHub</a>
        para gerenciar o código fonte e o roadmap.
      </p>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import '~assets/css/variables.scss';

#home-about {
  padding: 4rem 0;
  h2 {
    font-size: 2.5rem;
    border-left: 8px solid $primary-color;
    padding-left: 0.5rem;
    margin-bottom: 9%;
  }

  .home-about-text {
    padding: 0 9%;
    p {
      font-size: 2rem;
      color: #000;
    }
  }
}

@media screen and (max-width: 960px) {
  #home-about {
    h2 {
      font-size: 2rem;
    }

    .home-about-text {
      p {
        font-size: 1.2rem;
        color: #000;
      }
    }
  }
}
</style>
