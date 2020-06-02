<template>
  <a-card hoverable class="deputado-card" style="width: 280px;">
    <img slot="cover" :alt="deputado.nome" :src="deputado.urlFoto" />
    <template slot="actions" class="ant-card-actions" v-if="deputado.email">
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
    }
  },
  data() {
    return {
      partido: null
    };
  },
  async fetch() {
    if (this.deputado.uriPartido) {
      const { data } = await this.$axios.get(this.deputado.uriPartido);
      this.partido = data.dados;
    }
  },
  computed: {
    descriptionDeputado() {
      return `Deputadx do estado ${this.deputado.siglaUf ||
        'não informado'} é afilhado ao partido ${this.deputado.siglaPartido}.`;
    }
  },
  methods: {
    sendMail() {
      window.location.href = `mailto:${this.deputado.email}`;
    }
  }
};
</script>
