<template>
  <div>
    <a-menu
      mode="horizontal"
      theme="dark"
      class="menu"
      :default-selected-keys="[$nuxt.$route.name]"
    >

      <a-menu-item v-if="!$auth.loggedIn" key="login" class="item-right">
        <n-link to="/login">
          Login
        </n-link>
      </a-menu-item>

      <a-menu-item key="proposicoes" class="item-right">
        <n-link to="/proposicoes">
          Proposicoes
        </n-link>
      </a-menu-item>

      <a-menu-item key="index" class="item-right">
        <n-link to="/">
          Home
        </n-link>
      </a-menu-item>
    </a-menu>
    <nuxt />
  </div>
</template>

<script>
export default {};
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.menu {
  width: 100vw;
}
.item-right {
  float: right;
}
</style>
