<template>
  <div class="deputados">
    <a-form-item label="Pesquisar deputado">
      <a-auto-complete
        v-model="query"
        style="width: 400px"
        placeholder="Procurar por deputado"
        @select="setSelectedDeputado"
        label=""
        allowClear
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
          @click="subscribe"
          :disabled="subscriptionLoading"
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

      <a-spin v-if="loadingInfo" class="loading-info" />
      <section class="deputado-info" v-else>
        <a-list>
          <h3>Últimos discursos</h3>
          <a-alert
            v-if="!speeches || !speeches.length"
            description="Sem informaçōes"
            show-icon
          />
          <a-list-item v-else v-for="(s, idx) in speeches" :key="idx">
            <b>{{ s.faseEvento.titulo }}</b>
            <br />
            <a-tag color="cyan">
              {{ formattedDate(s.dataHoraInicio) }}
            </a-tag>
            <br />
            <b>Tipo: </b> {{ s.tipoDiscurso || '-' }}
            <br />
            <b>Sumário: </b> {{ s.sumario || '-' }}
            <br />
            <b>Transcriçāo: </b> {{ s.transcricao || '-' }}
          </a-list-item>
        </a-list>

        <a-divider />

        <h3>Últimos eventos</h3>
        <deputado-events :events="events" />
      </section>
    </section>
  </div>
</template>

<script>
import DeputadoCard from '~/components/app/deputados/DeputadoCard';
import DeputadoEvents from '~/components/app/deputados/DeputadoEvents';

export default {
  layout: 'auth',
  components: {
    DeputadoCard,
    DeputadoEvents
  },
  data() {
    return {
      query: '',
      selectedDeputado: null,
      recentSearch: null,
      speeches: null,
      metrics: null,
      events: null,
      loadingInfo: false,
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
  mounted() {
    this.$nextTick(() => {
      if (this.$route.query.id && !this.selectedDeputado) {
        this.setSelectedDeputado(this.$route.query.id);
      }
    });
  },
  methods: {
    async subscribe() {
      this.subscriptionError = '';
      this.subscriptionLoading = true;
      try {
        await this.$axios.post('/updates/', {
          external_id: this.selectedDeputado.id,
          external_model: 'D',
          name: this.selectedDeputado.nome
        });
      } catch (err) {
        console.log(err);
        this.subscriptionError =
          'Erro ao cadastrar deputado em suas notificaçōes, por favor, tente novamente';
      }
      this.$auth.fetchUser();
      this.subscriptionLoading = false;
    },
    formattedDate(dt) {
      return this.$moment(dt).format('LLL');
    },
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
      this.loadingInfo = true;

      const id = this.selectedDeputado.id;

      try {
        this.metrics = await this.$axios.$get(`/metrics/deputado/${id}/`);
      } catch (err) {
        console.log(err);
      }

      const resSpeeches = await this.$openData.$get(
        `/deputados/${id}/discursos`
      );
      this.speeches = resSpeeches.dados;

      const resEvents = await this.$openData.$get(`/deputados/${id}/eventos`);
      this.events = resEvents.dados;
      this.loadingInfo = false;
    }
  },
  watch: {
    selectedDeputado() {
      this.getDeputadoDetails();
    }
  },
  watchQuery(q, oldQ) {
    if (parseInt(q.id, 10) !== this.selectedDeputado.id) {
      this.setSelectedDeputado(q.id);
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
