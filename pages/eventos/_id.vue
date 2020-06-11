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

          <a-tab-pane key="2" tab="Participantes">
            <section class="deputados">
              <deputado-card
                v-for="deputado in deputados"
                :key="deputado.id"
                :deputado="deputado"
                no-img
              />
            </section>
          </a-tab-pane>
          <a-tab-pane key="3" tab="Pauta">
            <section class="proposicoes">
              <section v-for="item in pauta" :key="item.ordem">
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

    const resDep = await this.$openData.get(
      `/eventos/${this.$route.params.id}/deputados`
    );
    this.deputados = resDep.data.dados;

    const resPauta = await this.$openData.get(
      `/eventos/${this.$route.params.id}/pauta`
    );
    this.pauta = resPauta.data.dados;
  },
  data() {
    return {
      event: null,
      deputados: null,
      pauta: null
    };
  },
  methods: {
    formattedDate(dt) {
      return this.$moment(dt).format('LLL');
    }
  }
};
</script>

<style lang="scss">
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
