<template>
  <div class="deputados">
    <template v-if="$fetchState.pending">
      <a-spin size="large" />
    </template>
    <template v-else-if="$fetchState.error">
      Error: {{ $fetchState.error }}
    </template>
    <template v-else>
      <a-auto-complete
        v-model="query"
        style="width: 200px"
        placeholder="Procurar por deputado"
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

      <section v-if="selectedDeputado" class="info-holder">
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
      selectedDeputado: null
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

      this.query = `${d.nome} - ${d.siglaUf} (${d.siglaPartido})`;
      this.selectedDeputado = d;
    }
  }
};
</script>

<style lang="scss">
.deputados {
  width: 100%;
  height: fit-content;
  .info-holder {
    margin-top: 20px;
    display: flex;
  }
}
</style>
