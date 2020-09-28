<template>
  <a-card id="logo-card">
    <header class="login-logo">
      <img src="~/assets/logo_dark.svg" />
    </header>
    <section class="content">
      <slot></slot>
    </section>
  </a-card>
</template>

<script>
export default {
  name: 'LogoCard'
};
</script>

<style lang="scss" scoped>
#logo-card {
  width: 30vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  > .ant-card-body {
    display: flex;
    flex-direction: column;
  }
  .login-logo {
    text-align: center;
    > img {
      width: 14vw;
    }
  }
  .content {
    border-top: 1px solid #e8e8e8;
    padding-top: 20px;
    margin-top: 20px;
    flex: 1;
  }
}

@media screen and (max-height: 700px) {
  #logo-card {
    width: 25vw;
    top: 60%;
    .login-logo {
      > img {
        width: 10vw;
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  #logo-card {
    width: 50vw;
  }
}

@media screen and (max-width: 800px) {
  #logo-card {
    width: 80vw;
  }
}
</style>
