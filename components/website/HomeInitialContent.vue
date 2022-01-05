<template>
  <v-row id="home-initial-content">
    <v-col cols="12" md="6" sm="12" xs="12">
      <p class="home-initial-text">
        Acompanha Legis é a plataforma que possibilita acompanhar proposiçōes,
        deputados e outras atividades na camara dos deputados!
      </p>
    </v-col>

    <v-col cols="12" md="6" sm="12" xs="12">
      <img
        alt="Figura ilustrativa com uma pessoa em frente a um dashboard"
        src="~/assets/home-initial.svg"
      />
    </v-col>

    <v-col cols="12">
      <v-btn color="primary" large>Acompanhe aqui o governo</v-btn>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">
#home-initial-content {
  margin-top: 9%;
  .home-initial-text {
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.5;
    color: #000;
  }
}
</style>
