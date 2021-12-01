<template>
  <logo-card>
    <a-form @submit.prevent="doLogin">
      <a-form-item label="Email">
        <a-input v-model="credentials.username" placeholder="Email" />
      </a-form-item>

      <a-form-item label="Senha">
        <a-input
          v-model="credentials.password"
          placeholder="Senha"
          type="password"
        />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" block>
          Entrar
        </a-button>
      </a-form-item>

      <n-link to="/register">Ainda nāo sou cadastrado</n-link>
    </a-form>
  </logo-card>
</template>

<script>
import LogoCard from '@/components/website/LogoCard';

export default {
  auth: false,
  components: {
    LogoCard
  },
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
        if (err.response?.status === 400) {
          this.$notification.error({
            message: 'Credenciais incorretas',
            description: 'Email ou senha incorretos, revise seus dados!'
          });
          return;
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
