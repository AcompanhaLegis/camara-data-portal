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
          <n-link to="/eventos">
            <a-button type="primary">
              Ir para eventos
            </a-button>
          </n-link>
        </template>
      </a-result>
    </template>
    <template v-else>
      <div class="event-container">
        <h2>
          {{ event.descricaoTipo }} em {{ formattedDate(event.dataHoraInicio) }}
        </h2>
        <br />
        <br />
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" tab="Detalhes">
            <b>Local:</b> {{ event.localExterno || event.localCamara.nome }}
            <br />
            <br />
            <b>Situação: </b>{{ event.situacao }}
            <br />
            <br />
            <p class="justify">
              <b>Descrição:</b>
              {{ event.descricao }}
            </p>
            <b>Órgãos:</b>
            <a-list>
              <a-list-item v-for="orgao in event.orgaos" :key="orgao.id">
                {{ orgao.sigla }} - {{ orgao.apelido }} - {{ orgao.nome }}
              </a-list-item>
            </a-list>
          </a-tab-pane>

          <a-tab-pane
            v-if="(deputados && deputados.length) || loadingDeputados"
            key="2"
            tab="Participantes"
          >
            <section class="deputados">
              <a-spin v-if="loadingDeputados" size="large" />
              <deputado-card
                v-for="deputado in deputados"
                v-else
                :key="deputado.id"
                :deputado="deputado"
                no-img
                external
              />
            </section>
          </a-tab-pane>
          <a-tab-pane
            v-if="(pauta && pauta.length) || loadingPauta"
            key="3"
            tab="Pauta"
          >
            <section class="proposicoes">
              <a-spin v-if="loadingPauta" size="large" />
              <section v-for="item in pauta" v-else :key="item.ordem">
                <a-tag color="orange">
                  {{ item.regime }} - Ordem {{ item.ordem }}</a-tag
                >
                <proposicao-list-item :proposicao="item.proposicao_" />
                <a-divider />
              </section>
            </section>
          </a-tab-pane>
        </a-tabs>
      </div>
    </template>
  </main>
</template>

<script>
import DeputadoCard from '~/components/app/deputados/DeputadoCard';
import ProposicaoListItem from '~/components/app/proposicoes/ProposicaoListItem';
export default {
  layout: 'auth',
  components: {
    DeputadoCard,
    ProposicaoListItem
  },
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  async fetch() {
    const response = await this.$openData.get(
      `/eventos/${this.$route.params.id}`
    );
    this.event = response.data.dados;
  },
  data() {
    return {
      event: null,
      deputados: null,
      pauta: null,
      loadingDeputados: false,
      loadingPauta: false
    };
  },
  mounted() {
    this.loadingDeputados = true;
    this.loadingPauta = true;
    this.$openData
      .get(`/eventos/${this.$route.params.id}/deputados`)
      .then((resDep) => {
        this.deputados = resDep.data.dados;
      })
      .finally(() => {
        this.loadingDeputados = false;
      });

    this.$openData
      .get(`/eventos/${this.$route.params.id}/pauta`)
      .then((resPauta) => {
        this.pauta = resPauta.data.dados;
      })
      .finally(() => {
        this.loadingPauta = false;
      });
  },
  methods: {
    formattedDate(dt) {
      return this.$moment(dt).format('LLL');
    }
  }
};
</script>

<style lang="scss" scoped>
.tramitacoes {
  margin-top: 20px;
}

.deputados {
  display: flex;
  flex-wrap: wrap;
  > div {
    margin: 10px;
  }
}

.clickable {
  cursor: pointer;
}
.justify {
  text-align: justify;
}
</style>
