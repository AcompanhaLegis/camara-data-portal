<template>
  <section class="content">
    <section class="profile">
      <h2>Mudança de senha</h2>
      <a-form type="vertical">
        <a-alert
          v-show="passwordErr"
          type="error"
          message="Erro"
          :description="passwordErr"
          show-icon
        />
        <a-form-item label="Nova senha">
          <a-input v-model="newPass.password" type="password" />
        </a-form-item>

        <a-form-item label="Confirmar senha">
          <a-input v-model="newPass.confirm_password" type="password" />
        </a-form-item>

        <a-button type="primary" @click="changePassword">
          Enviar
        </a-button>
      </a-form>
    </section>
    <a-divider />

    <section class="subscriptions">
      <h2>Notificaçōes ativas:</h2>
      <section class="lists">
        <a-list>
          <h3>Proposiçōes</h3>
          <a-list-item v-if="!subProposicoes.length">
            <a-alert
              message="Sem notificaçōes ativas para proposiçōes"
              description="Siga para aba de proposiçōes para ativar e receber notificaçōes."
              show-icon
            />
          </a-list-item>
          <a-list-item v-for="s in subProposicoes" :key="s.id">
            {{ s.name }}
            <a-popconfirm
              slot="actions"
              title="Confirmar"
              ok-text="Sim"
              cancel-text="Nāo"
              @confirm="deleteSubscription(s.id)"
            >
              <a-button type="danger">
                <a-icon type="delete" />
                Remover
              </a-button>
            </a-popconfirm>
          </a-list-item>
        </a-list>

        <a-list>
          <h3>Deputados</h3>
          <a-list-item v-if="!subDeputados.length">
            <a-alert
              message="Sem notificaçōes ativas para deputados"
              description="Siga para aba de deputados para ativar e receber notificaçōes."
              show-icon
            />
          </a-list-item>
          <a-list-item v-for="s in subDeputados" :key="s.id">
            {{ s.name }}
            <a-button
              shape="circle"
              @click="
                $router.push({
                  path: '/deputados',
                  query: { id: s.external_id }
                })
              "
            >
              <a-icon type="link" />
            </a-button>
            <a-popconfirm
              slot="actions"
              title="Confirmar"
              ok-text="Sim"
              cancel-text="Nāo"
              @confirm="deleteSubscription(s.id)"
            >
              <a-button type="danger">
                <a-icon type="delete" />
                Remover
              </a-button>
            </a-popconfirm>
          </a-list-item>
        </a-list>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      newPass: {
        password: '',
        confirm_password: ''
      },
      passwordErr: ''
    };
  },
  computed: {
    subscriptions() {
      return (this.$auth.loggedIn && this.$auth.user.subscriptions) || [];
    },
    subProposicoes() {
      return this.subscriptions.filter((s) => s.external_model === 'P');
    },
    subDeputados() {
      return this.subscriptions.filter((s) => s.external_model === 'D');
    }
  },
  methods: {
    async deleteSubscription(id) {
      await this.$axios.delete(`/updates/${id}/`);
      await this.$auth.fetchUser();
    },
    async changePassword() {
      if (this.newPass.password !== this.newPass.confirm_password) {
        this.passwordErr = 'As senhas nāo conferem!';
        return;
      }
      try {
        await this.$axios.post('/reset_password/', { ...this.newPass });
        this.$auth.logout();
      } catch (err) {
        this.passwordErr = err;
      }
    }
  }
};
</script>

<style lang="scss">
.profile {
  width: 40%;
  min-width: 300px;
  margin-bottom: 20px;
}

.subscriptions {
  .lists {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    > .ant-list {
      h3 {
        color: #1890ff;
      }
      flex: 1;
      margin: 0 20px;
    }
  }
}
</style>
