<template>
  <a-card
    class="deputado-card"
    style="width: 320px;"
    :loading="loading"
    :title="deputado.nome"
  >
    <img
      v-if="!noImg"
      slot="cover"
      :alt="deputado.nome"
      :src="deputado.urlFoto"
      style="margin-top: 2px;"
    />
    <template slot="actions" class="ant-card-actions">
      <a-icon
        v-if="external"
        key="link"
        type="link"
        @click="
          $router.push({ path: '/deputados', query: { id: `${deputado.id}` } })
        "
      />
      <a :href="twitter" target="_blank" key="link" v-if="twitter">
        <a-icon type="twitter" />
      </a>
      <a :href="youtube" target="_blank" key="link" v-if="youtube">
        <a-icon type="youtube" />
      </a>
    </template>
    <a-avatar v-if="partido" slot="avatar" :src="partido.urlLogo" />
    <div v-if="fullInfo">
      <div>
        <p><b>Estado: </b>{{ deputado.siglaUf }}</p>
        <p><b>Partido: </b>{{ fullInfo.ultimoStatus.siglaPartido }}</p>
        <p><b>Email: </b>{{ deputado.email }}</p>
        <p>
          <b>Telefone Gabinete: </b
          >{{ fullInfo.ultimoStatus.gabinete.telefone }}
        </p>
      </div>
    </div>
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
      loading: false
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
