<template>
  <div>
    <a-form-item label="Email">
      <a-input placeholder="Email" v-model="credentials.username" />
    </a-form-item>

    <a-form-item label="Senha">
      <a-input
        placeholder="Senha"
        type="password"
        v-model="credentials.password"
      />
    </a-form-item>

    <a-form-item>
      <a-button type="primary" @click="doLogin">
        Entrar
      </a-button>
    </a-form-item>
  </div>
</template>

<script>
export default {
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
