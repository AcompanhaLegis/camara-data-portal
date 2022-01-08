<template>
  <div class="deputados">
    <a-form-item label="Pesquisar deputado">
      <a-auto-complete
        v-model="query"
        style="width: 400px"
        placeholder="Procurar por deputado"
        label=""
        allow-clear
        @select="setSelectedDeputado"
      >
        <template slot="dataSource">
          <a-select-option
            v-for="d in filteredDeputados"
            :key="d.id"
            :value="d.id.toString()"
          >
            {{ `${d.nome} - ${d.siglaUf} (${d.siglaPartido})` }}
          </a-select-option>
        </template>
      </a-auto-complete>
    </a-form-item>

    <section v-if="recentSearch" class="recent-search">
      <h3>Pesquisas recentes</h3>

      <a-tag
        v-for="deputadoId in recentSearch"
        :key="deputadoId"
        color="green"
        @click="setSelectedDeputado(deputadoId)"
      >
        {{ getLabel(deputados.find((d) => d.id === deputadoId)) }}
      </a-tag>
    </section>

    <h2 v-if="selectedDeputado">Deputado selecionado</h2>
    <section v-if="selectedDeputado" class="info-holder">
      <section class="deputado-profile">
        <deputado-card :deputado="selectedDeputado" />
        <br />
        <a-button
          v-if="notSubscribed"
          :disabled="subscriptionLoading"
          @click="subscribe"
          ><a-icon type="bell" />Ativar notificaçōes</a-button
        >
        <a-alert v-else type="info" description="Notificaçōes ativas" />
        <a-alert
          v-if="subscriptionError"
          type="error"
          :description="subscriptionError"
          show-icon
        />
      </section>

      <a-tabs class="deputado-info" default-active-key="1">
        <a-tab-pane key="1" tab="Geral">
          <a-spin v-if="loadingInfo" class="loading-info" />
          <section v-else>
            <h3>Últimos discursos</h3>
            <deputado-speeches :speeches="speeches" />

            <a-divider />

            <h3>Últimos eventos</h3>
            <deputado-events :events="events" />
          </section>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Proposições">
          <section>
            <a-list>
              <h3>Autor</h3>
              <a-alert
                v-if="!proposicao || !proposicao.length"
                description="Sem informaçōes"
                show-icon
              />
              <proposicao-list-item
                v-for="(prop, idx) in proposicao"
                v-else
                :key="idx"
                :proposicao="prop"
              >
              </proposicao-list-item>
            </a-list>
          </section>
        </a-tab-pane>
      </a-tabs>
    </section>
  </div>
</template>

<script>
import DeputadoCard from '~/components/app/deputados/DeputadoCard';
import DeputadoEvents from '~/components/app/deputados/DeputadoEvents';
import ProposicaoListItem from '~/components/app/proposicoes/ProposicaoListItem';
import DeputadoSpeeches from '~/components/app/deputados/DeputadoSpeeches';

export default {
  auth: false,
  components: {
    DeputadoCard,
    DeputadoEvents,
    ProposicaoListItem,
    DeputadoSpeeches
  },
  layout: 'auth',
  data() {
    return {
      query: '',
      selectedDeputado: null,
      recentSearch: null,
      speeches: null,
      metrics: null,
      events: null,
      loadingInfo: false,
      proposicao: null,
      subscriptionError: null,
      subscriptionLoading: false
    };
  },
  computed: {
    deputados() {
      return this.$store.state.deputados;
    },
    notSubscribed() {
      if (
        this.$auth.loggedIn &&
        this.$auth.user.subscriptions.find(
          (s) =>
            s.external_model === 'D' &&
            s.external_id === this.selectedDeputado.id
        )
      ) {
        return false;
      }
      return true;
    },
    filteredDeputados() {
      if (this.query) {
        return this.deputados
          .filter((d) => {
            return d.nome.toLowerCase().includes(this.query.toLowerCase());
          })
          .slice(0, 20);
      }
      return this.deputados.slice(0, 20);
    }
  },
  watch: {
    selectedDeputado() {
      this.getDeputadoDetails();
    }
  },
  watchQuery(q) {
    if (parseInt(q.id, 10) !== this.selectedDeputado.id) {
      this.setSelectedDeputado(q.id);
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.query.id && !this.selectedDeputado) {
        this.setSelectedDeputado(this.$route.query.id);
      }
    });
  },
  methods: {
    setSelectedDeputado(deputadoId) {
      const d = this.deputados.find((d) => d.id === parseInt(deputadoId, 10));
      if (d) {
        this.$router.push({ query: { id: deputadoId } });

        this.query = this.getLabel(d);
        this.selectedDeputado = d;
      }
    },
    getLabel(d) {
      return `${d.nome} - ${d.siglaUf} (${d.siglaPartido})`;
    },
    async getDeputadoDetails() {
      this.metrics = null;
      this.speeches = null;
      this.events = null;
      this.proposicao = null;
      this.loadingInfo = true;

      const id = this.selectedDeputado.id;

      const resSpeeches = await this.$openData.$get(
        `/deputados/${id}/discursos`
      );
      this.speeches = resSpeeches.dados;

      const resEvents = await this.$openData.$get(
        `/deputados/${id}/eventos?ordem=desc&ordenarPor=dataHoraInicio`
      );
      this.events = resEvents.dados;

      const resProp = await this.$openData.$get(
        `/proposicoes?idDeputadoAutor=${id}`
      );
      this.proposicao = resProp.dados;
      this.loadingInfo = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.deputados {
  width: 100%;
  min-height: 100vh;
  position: relative;
  .loading {
    width: fit-content;
    height: fit-content;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .loading-info {
    margin: auto;
  }
  .info-holder {
    margin-top: 20px;
    display: flex;
    h3 {
      font-size: 1.5rem;
      color: #1890ff;
    }
    .deputado-profile {
      display: flex;
      flex-direction: column;
    }
    .deputado-info {
      flex: 1;
      padding: 0 20px;
    }
  }
}
</style>
