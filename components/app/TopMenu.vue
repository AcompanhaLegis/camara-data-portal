<template>
  <a-menu
    mode="horizontal"
    theme="light"
    :style="{ boxShadow: '0 -4px 10px #1890ff' }"
    :default-selected-keys="[$nuxt.$route.name]"
    id="top-menu"
  >
    <a-menu-item class="item-right" key="profile">
      <n-link to="/profile">
        <a-icon type="user" />
        Perfil
      </n-link>
    </a-menu-item>

    <a-menu-item class="item-right" key="notifications" v-if="false">
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
