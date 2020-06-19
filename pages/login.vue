<template>
  <a-card id="login-card">
    <img src="~/assets/logo_dark.svg" class="login-logo" />
    <section class="form">
      <a-form @submit.prevent="doLogin">
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
          <a-button type="primary" html-type="submit" block>
            Entrar
          </a-button>
        </a-form-item>
      </a-form>
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
      if (!this.credentials.username || !this.credentials.password) {
        this.$notification.error({
          message: 'Preencha os campos',
          description:
            'Por favor, preencha seu email e senha para realizar o login!'
        });
        return;
      }
      try {
        await this.$auth.loginWith('local', {
          data: this.credentials
        });
        this.$router.push('/proposicoes');
      } catch (err) {
        if (err.response?.status) {
          this.$notification.error({
            message: 'Credenciais incorretas',
            description: 'Email ou senha incorretos, revise seus dados!'
          });
        }
        this.$notification.error({
          message: 'Erro',
          description:
            'Nāo foi possível realizar seu login, por favor, tente novamente!'
        });
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

@media screen and (max-height: 700px) {
  #login-card {
    width: 25vw;
    top: 60%;
    .login-logo {
      width: 10vw;
    }
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
