<template>
  <a-card id="login-card">
    <img src="~/assets/logo_dark.svg" class="login-logo" />
    <section class="form">
      <a-form-item label="Email">
        <a-input placeholder="Email" v-model="credentials.username" />
      </a-form-item>

      <a-form-item label="Senha">
        <a-input
          placeholder="Senha"
          type="password"
          v-model="credentials.password"
          @keyup.enter="doLogin"
        />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" @click="doLogin" block>
          Entrar
        </a-button>
      </a-form-item>
    </section>
  </a-card>
</template>

<script>
export default {
  auth: false,
  layout: 'default',
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    async doLogin() {
      try {
        await this.$auth.loginWith('local', {
          data: this.credentials
        });
        this.$router.push('/proposicoes');
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss">
#login-card {
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
    width: 20vw;
    margin: auto;
  }
  .form {
    border-top: 1px solid #e8e8e8;
    padding-top: 20px;
    margin-top: 20px;
    flex: 1;
  }
}

@media screen and (max-width: 1024px) {
  #login-card {
    width: 50vw;
  }
}

@media screen and (max-width: 800px) {
  #login-card {
    width: 80vw;
  }
}
</style>
