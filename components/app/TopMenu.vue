<template>
  <a-menu
    mode="horizontal"
    theme="light"
    :default-selected-keys="[$nuxt.$route.name]"
  >
    <a-menu-item class="item-right" key="profile">
      <n-link to="/profile">
        <a-icon type="user" />
        Perfil
      </n-link>
    </a-menu-item>

    <a-menu-item class="item-right" key="notifications">
      <a-icon type="bell" />
      Notificaçōes
    </a-menu-item>
  </a-menu>
</template>

<style lang="scss">
.item-right {
  float: right;
}
</style>
