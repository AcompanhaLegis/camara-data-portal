<template>
  <a-card hoverable class="deputado-card" style="width: 280px;">
    <img
      v-if="!noImg"
      slot="cover"
      :alt="deputado.nome"
      :src="deputado.urlFoto"
    />
    <template v-if="deputado.email" slot="actions" class="ant-card-actions">
      <a-icon key="mail" type="mail" @click="sendMail" />
      <a-icon key="info" type="idcard" @click="sendMail" />
    </template>
    <a-card-meta :title="deputado.nome" :description="descriptionDeputado">
      <a-avatar v-if="partido" slot="avatar" :src="partido.urlLogo" />
    </a-card-meta>
  </a-card>
</template>

<script>
export default {
  props: {
    deputado: {
      type: Object,
      required: true
    },
    noImg: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      partido: null
    };
  },
  computed: {
    descriptionDeputado() {
      return `Deputadx do estado ${this.deputado.siglaUf ||
        'não informado'} é afilhado ao partido ${this.deputado.siglaPartido}.`;
    }
  },
  watch: {
    deputado: {
      immediate: true,
      handler() {
        this.fetchPartido();
      }
    }
  },
  methods: {
    sendMail() {
      window.location.href = `mailto:${this.deputado.email}`;
    },
    async fetchPartido() {
      this.partido = null;
      if (this.deputado.uriPartido) {
        const { data } = await this.$openData.get(this.deputado.uriPartido);
        this.partido = data.dados;
      }
    }
  }
};
</script>
