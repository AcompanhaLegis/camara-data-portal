<template>
  <v-card v-if="!loading" max-width="800">
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="text-h5" v-text="deputado.nome"></v-card-title>

        <v-card-subtitle
          v-text="`${fullInfo.ultimoStatus.siglaPartido} - ${deputado.siglaUf}`"
        ></v-card-subtitle>
        <v-card-subtitle v-text="`${deputado.email}`"></v-card-subtitle>
        <v-card-subtitle
          v-text="`${fullInfo.ultimoStatus.gabinete.telefone}`"
        ></v-card-subtitle>
      </div>

      <v-avatar class="ma-3" size="200">
        <v-img :src="deputado.urlFoto"></v-img>
      </v-avatar>
    </div>
  </v-card>
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
    },
    external: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      partido: null,
      fullInfo: null,
      loading: true
    };
  },
  computed: {
    twitter() {
      const twitter = this.fullInfo?.redeSocial?.find((sm) =>
        sm.includes('twitter')
      );
      if (!twitter) return null;
      return twitter.startsWith('http') ? twitter : `https://${twitter}`;
    },
    youtube() {
      const youtube = this.fullInfo?.redeSocial?.find((sm) =>
        sm.includes('youtube')
      );
      if (!youtube) return null;
      return youtube.startsWith('http') ? youtube : `https://${youtube}`;
    }
  },
  watch: {
    deputado: {
      immediate: true,
      async handler() {
        this.fetchPartido();
        this.loading = true;
        const { dados } = await this.$openData.$get(
          `/deputados/${this.deputado.id}`
        );
        this.fullInfo = dados;
        this.loading = false;
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
<style scoped>
.email {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
