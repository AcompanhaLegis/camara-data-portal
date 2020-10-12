<template>
  <a-list-item>
    <a-button
      slot="actions"
      icon="bell"
      shape="circle"
      :type="!subscribed ? 'default' : 'primary'"
      :disabled="loading"
      @click="subscriptionHandle"
    >
    </a-button>
    <a-button
      slot="actions"
      icon="heart"
      :ghost="!favorite"
      type="danger"
      :disabled="loading"
      @click="favoriteHandle"
    >
      {{ !!favorite ? 'Favorito' : 'Favoritar' }}
    </a-button>
    <n-link v-if="!full" slot="actions" :to="`/proposicoes/${proposicao.id}`">
      <a-button type="primary">
        Ver na íntegra
      </a-button>
    </n-link>

    <a-list-item-meta :description="proposicao.ementa">
      <h3 slot="title">
        {{ proposicaoNome }}
        {{ proposicao.ano || 'Ano desconhecido' }}
      </h3>
    </a-list-item-meta>
  </a-list-item>
</template>

<script>
export default {
  props: {
    proposicao: {
      type: Object,
      required: true
    },
    full: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    favorite() {
      return this.$auth.user.favorite_proposicoes.find(
        (p) => p.proposicao_id === this.proposicao.id
      );
    },
    subscribed() {
      return this.$auth.user.subscriptions?.find(
        (s) => s.external_model === 'P' && s.external_id === this.proposicao.id
      );
    },
    proposicaoNome() {
      return `${this.proposicao.siglaTipo} - ${this.proposicao.numero}`;
    }
  },
  methods: {
    async favoriteHandle() {
      this.loading = true;
      if (this.favorite) {
        await this.$axios.delete(`/favorites/proposicao/${this.favorite.id}/`);
      } else {
        await this.$axios.post('/favorites/proposicao/', {
          proposicao_id: this.proposicao.id,
          year: this.proposicao.ano,
          name: this.proposicaoNome
        });
      }

      await this.$auth.fetchUser();
      this.loading = false;
    },
    async subscriptionHandle() {
      this.loading = true;
      if (this.subscribed) {
        await this.$axios.delete(`/updates/${this.subscribed.id}/`);
      } else {
        await this.$axios.post('/updates/', {
          name: this.proposicaoNome,
          external_id: this.proposicao.id,
          external_model: 'P'
        });
      }
      await this.$auth.fetchUser();
      this.loading = false;
    }
  }
};
</script>

<style lang="scss">
.proposicao-card {
  margin: 20px 0;
  .detail-btn {
    width: 100%;
  }
}
</style>
