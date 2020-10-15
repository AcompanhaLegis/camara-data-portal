<template>
  <a-menu
    id="top-menu"
    mode="horizontal"
    theme="light"
    :style="{ boxShadow: '0 -4px 10px #1890ff' }"
    :default-selected-keys="[$nuxt.$route.name]"
  >

    <a-menu-item v-if="$auth.loggedIn" key="profile" class="item-right">
      <n-link to="/profile">
        <a-icon type="user" />
        Perfil
      </n-link>
    </a-menu-item>

    <a-menu-item v-else key="login" class="item-right">
      <n-link to="/login">
        <a-icon type="user" />
        Login
      </n-link>
    </a-menu-item>
    
    <a-menu-item v-if="false" key="notifications" class="item-right">
      <a-icon type="bell" />
      Notificaçōes
    </a-menu-item>
  </a-menu>
</template>

<style lang="scss">
#top-menu {
  position: sticky;
  top: 0;
  z-index: 999;
  .item-right {
    float: right;
  }
}
</style>
