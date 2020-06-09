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
            <proposicao-list-item :proposicao="proposicao" full />

            <a-collapse accordion v-if="propPrincipal">
              <a-collapse-panel
                key="1"
                :header="
                  `Proposicao principal: ${propPrincipal.siglaTipo} - ${propPrincipal.numero} / ${propPrincipal.ano}`
                "
              >
                <proposicao-list-item :proposicao="propPrincipal" />
              </a-collapse-panel>
            </a-collapse>

            <br />
            <br />
            <a
              :href="proposicao.urlInteiroTeor"
              v-if="proposicao.urlInteiroTeor"
              target="_blank"
            >
              <a-button icon="download" type="secondary">
                Download - Inteiro teor
              </a-button>
            </a>

            <br />
            <br />
            <section v-if="temas && temas.length">
              Temas:
              <a-tag
                v-for="tema in temas"
                :key="tema.codTema"
                color="blue"
                class="clickable"
              >
                {{ tema.tema }}
              </a-tag>
            </section>
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
          <a-timeline mode="alternate" reverse>
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
import ProposicaoListItem from '~/components/app/proposicoes/ProposicaoListItem';

export default {
  layout: 'auth',
  components: {
    TramitacaoCard,
    DeputadoCard,
    ProposicaoListItem
  },
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  async fetch() {
    try {
      const resProp = await this.$openData.get(
        `/proposicoes/${this.$route.params.id}`
      );
      const resTra = await this.$openData.get(
        `/proposicoes/${this.$route.params.id}/tramitacoes`
      );
      this.proposicao = resProp.data.dados;
      this.tramitacoes = resTra.data.dados;

      const resAut = await this.$openData.get(this.proposicao.uriAutores);
      this.autores = resAut.data.dados;

      const resTemas = await this.$openData.get(
        `/proposicoes/${this.proposicao.id}/temas`
      );
      this.temas = resTemas.data.dados;

      if (this.proposicao.uriPropPrincipal) {
        const resPropPrincipal = await this.$openData.get(
          this.proposicao.uriPropPrincipal
        );
        this.propPrincipal = resPropPrincipal.data.dados;
      }
    } catch (err) {
      console.log(err.response);
      throw err;
    }
  },
  data() {
    return {
      proposicao: null,
      tramitacoes: null,
      autores: [],
      temas: [],
      propPrincipal: null
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

.clickable {
  cursor: pointer;
}
</style>
