<template>
  <div id="tramitacao-search">
    <template v-if="$fetchState.pending">
      <a-spin size="large" />
    </template>
    <template v-else-if="$fetchState.error">
      Error: {{ $fetchState.error }}
    </template>
    <template v-else>
      <a-form layout="inline">
        <a-form-item label="Tipo">
          <a-select v-model="search.siglaTipo" style="width: 400px;">
            <a-select-option value="">
              Selecione um tipo
            </a-select-option>
            <a-select-option
              v-for="tipo in tipos"
              :key="tipo.sigla"
              :value="tipo.sigla"
            >
              {{ getTipoLabel(tipo) }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Número">
          <a-input
            v-model.number="search.numero"
            type="number"
            @keyup.enter="onSearch"
          />
        </a-form-item>

        <a-form-item label="Ano">
          <a-input
            v-model.number="search.ano"
            type="number"
            @keyup.enter="onSearch"
          />
        </a-form-item>

        <a-form-item label="Data de apresentaçāo">
          <a-date-picker
            v-model="search.dataApresentacaoInicio"
            :locale="$calendarLocale"
            format="DD/MM/YYYY"
          />
        </a-form-item>
      </a-form>

      <a-form layout="vertical">
        <a-form-item label="Temas:">
          <a-select
            v-model="search.codTema"
            mode="multiple"
            :filter-option="false"
          >
            <a-select-option
              v-for="tema in temas"
              :key="tema.cod"
              :value="tema.cod"
            >
              {{ tema.nome }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-row>
          <a-button type="primary" icon="search" @click="onSearch"
            >Procurar</a-button
          >
        </a-row>
      </a-form>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        numero: '',
        siglaTipo: '',
        ano: '',
        dataApresentacaoInicio: null
      },
      lastSearch: '',
      temas: []
    };
  },
  async fetch() {
    const resTemas = await this.$openData.get(
      '/referencias/proposicoes/codTema'
    );
    this.temas = resTemas.data.dados;
  },
  computed: {
    tipos() {
      return this.$store.state.proposicaoTypes
        .reduce((acc, s) => {
          if (s.sigla && !acc.find((siglas) => siglas.sigla === s.sigla)) {
            acc.push(s);
          }
          return acc;
        }, [])
        .sort((s1, s2) => s1.sigla.localeCompare(s2.sigla));
    },
    deputados() {
      return this.$store.state.deputados;
    }
  },
  methods: {
    getTipoLabel(tipo) {
      return `${tipo.sigla} (${tipo.nome})`;
    },
    onSearch() {
      if (this.lastSearch !== JSON.stringify(this.search)) {
        this.$emit('search', {
          ...this.search,
          siglaTipo: this.search.siglaTipo ? [this.search.siglaTipo] : null,
          dataApresentacaoInicio: this.search.dataApresentacaoInicio
            ? this.$moment(this.search.dataApresentacaoInicio).format(
                'YYYY-MM-DD'
              )
            : null
        });
        this.lastSearch = JSON.stringify(this.search);
      }
    }
  }
};
</script>

<style lang="scss">
#tramitacao-search {
}
</style>
