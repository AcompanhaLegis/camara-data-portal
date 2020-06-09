<template>
  <a-list-item>
    <a-button icon="bell" slot="actions">
      Adicionar à lista de notificações
    </a-button>
    <a-button
      icon="heart"
      slot="actions"
      :ghost="!favorite"
      type="danger"
      :disable="loading"
      @click="favoriteHandle"
    >
      {{ !!favorite ? 'Favorito' : 'Favoritar' }}
    </a-button>
    <router-link
      v-if="!full"
      slot="actions"
      :to="`/proposicoes/${proposicao.id}`"
    >
      Ver na íntegra
    </router-link>

    <a-list-item-meta :description="proposicao.ementa">
      <h3 slot="title">
        {{ this.proposicaoNome }}
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
