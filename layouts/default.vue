<template functional>
  <nuxt />
</template>

<style lang="scss">
html,
body {
  width: 100vw;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

/**
* .v-application overwrite for development mode, 
* threeShake on development mode prevents some components to
* be automatically imported and it is necessary for customVariable usage.
* https://github.com/nuxt-community/vuetify-module#treeShake
*/
.v-application {
  font-family: 'IBM Plex Mono' !important;
}
</style>
