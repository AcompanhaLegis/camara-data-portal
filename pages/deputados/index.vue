<template>
  <div class="deputados">
    <template v-if="$fetchState.pending">
      <section class="loading">
        <a-spin size="large" />
      </section>
    </template>
    <template v-else-if="$fetchState.error">
      Error: {{ $fetchState.error }}
    </template>
    <template v-else>
      <a-form-item label="Pesquisar deputado">
        <a-auto-complete
          v-model="query"
          style="width: 400px"
          placeholder="Procurar por deputado"
          @select="setSelectedDeputado"
          label=""
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
        <h4>Pesquisas recentes</h4>

        <a-tag
          v-for="deputadoId in recentSearch"
          :key="deputadoId"
          color="green"
          @click="setSelectedDeputado(deputadoId)"
        >
          {{ getLabel(deputados.find((d) => d.id === deputadoId)) }}
        </a-tag>
      </section>

      <section v-if="selectedDeputado" class="info-holder">
        <h2>Deputado selecionado</h2>
        <deputado-card :deputado="selectedDeputado" />
      </section>
    </template>
  </div>
</template>

<script>
import DeputadoCard from '~/components/app/deputados/DeputadoCard';

export default {
  layout: 'auth',
  components: {
    DeputadoCard
  },
  async fetch() {
    const { data } = await this.$openData.get(
      '/deputados?ordem=ASC&ordenarPor=nome'
    );
    this.deputados = data.dados;
  },
  data() {
    return {
      deputados: [],
      query: '',
      selectedDeputado: null,
      recentSearch: null
    };
  },
  computed: {
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
  methods: {
    setSelectedDeputado(deputadoId) {
      const d = this.deputados.find((d) => d.id === parseInt(deputadoId, 10));

      this.query = this.getLabel(d);
      this.selectedDeputado = d;
    },
    getLabel(d) {
      return `${d.nome} - ${d.siglaUf} (${d.siglaPartido})`;
    }
  }
};
</script>

<style lang="scss">
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
  .info-holder {
    margin-top: 20px;
  }
}
</style>
