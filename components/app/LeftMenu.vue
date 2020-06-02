<template>
  <div id="left-menu">
    <a-menu
      :default-selected-keys="['proposicoes']"
      mode="inline"
      theme="dark"
      class="full-menu"
    >
      <a-menu-item key="proposicoes">
        <n-link to="/proposicoes">
          <a-icon type="book" />
          <span>Proposições</span>
        </n-link>
      </a-menu-item>

      <a-menu-item key="deputados">
        <n-link to="/deputados">
          <a-icon type="idcard" />
          <span>Deputados</span>
        </n-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<style lang="scss">
#left-menu {
  width: 260px;
  height: 100vh;
  overflow: hidden;
  .full-menu {
    padding-top: 30px;
    width: 100%;
    height: 100%;
  }
}
</style>
