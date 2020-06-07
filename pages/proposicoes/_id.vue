<template>
  <main>
    <template v-if="$fetchState.pending">
      <a-spin size="large" />
    </template>
    <template v-else-if="$fetchState.error">
      <a-result
        status="error"
        :title="$fetchState.error.response.data.title"
        :sub-title="$fetchState.error.response.data.detail"
      >
        <template #extra>
          <n-link to="/proposicoes">
            <a-button type="primary">
              Ir para proposições
            </a-button>
          </n-link>
        </template>
      </a-result>
    </template>
    <template v-else>
      <div class="proposicao-container">
        <h1>{{ proposicao.siglaTipo }} - {{ proposicao.numero }}</h1>

        <a-tabs default-active-key="1">
          <a-tab-pane key="1" tab="Informações gerais">
            {{ proposicao.siglaTipo }} - {{ proposicao.numero }}
            {{ proposicao.ano || 'Ano desconhecido' }}
            {{ proposicao.ementa }}
            <a
              :href="proposicao.urlInteiroTeor"
              v-if="proposicao.urlInteiroTeor"
              target="_blank"
            >
              <a-button icon="download"></a-button>
            </a>
          </a-tab-pane>

          <a-tab-pane key="2" tab="Autores">
            <section class="autores">
              <deputado-card
                v-for="d in autores"
                :key="d.id"
                :deputado="d"
                no-img
              />
            </section>
          </a-tab-pane>
        </a-tabs>

        <br />

        <section class="tramitacoes">
          <h2>Tramitações</h2>
          <br />
          <a-timeline mode="alternate">
            <a-timeline-item v-for="t in tramitacoes" :key="t.id">
              <tramitacao-card :tramitacao="t" />
            </a-timeline-item>
          </a-timeline>
        </section>
      </div>
    </template>
  </main>
</template>

<script>
import TramitacaoCard from '~/components/app/proposicoes/TramitacaoCard';
import DeputadoCard from '~/components/app/deputados/DeputadoCard';

export default {
  layout: 'auth',
  components: {
    TramitacaoCard,
    DeputadoCard
  },
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  async fetch() {
    try {
      const baseURL = '/proposicoes';
      const resProp = await this.$openData.get(
        `${baseURL}/${this.$route.params.id}`
      );
      const resTra = await this.$openData.get(
        `${baseURL}/${this.$route.params.id}/tramitacoes`
      );
      this.proposicao = resProp.data.dados;
      this.tramitacoes = resTra.data.dados;
      const resAut = await this.$openData.get(this.proposicao.uriAutores);
      this.autores = resAut.data.dados;
    } catch (err) {
      console.log(err.response);
      throw err;
    }
  },
  data() {
    return {
      proposicao: null,
      tramitacoes: null,
      autores: []
    };
  }
};
</script>

<style lang="scss">
.tramitacoes {
  margin-top: 20px;
}

.autores {
  display: flex;
  flex-wrap: wrap;
  > div {
    margin: 10px;
  }
}
</style>
