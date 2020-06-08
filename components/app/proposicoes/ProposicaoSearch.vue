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
          <a-select v-model="search.siglaTipo" style="width: 120px;">
            <a-select-option v-for="tipo in tipos" :key="tipo" :value="tipo">
              {{ tipo }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Número">
          <a-input
            type="number"
            v-model.number="search.numero"
            @keyup.enter="onSearch"
          />
        </a-form-item>

        <a-form-item label="Ano">
          <a-input
            type="number"
            v-model.number="search.ano"
            @keyup.enter="onSearch"
          />
        </a-form-item>

        <a-form-item label="Data de abertura">
          <a-date-picker
            :locale="$calendarLocale"
            v-model="search.dataApresentacaoInicio"
            format="DD/MM/YYYY"
          />
        </a-form-item>

        <a-row>
          <a-form-item label="Temas">
            <a-select
              mode="multiple"
              v-model="search.codTema"
              style="min-width: 600px;"
              :filter-option="false"
              :not-found-content="fetching ? undefined : null"
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
        </a-row>

        <a-row>
          <a-button color="primary" icon="search" @click="onSearch"
            >Procurar</a-button
          >
        </a-row>
      </a-form>
    </template>
  </div>
</template>

<script>
export default {
  async fetch() {
    const resSigla = await this.$openData.get(
      '/referencias/proposicoes/siglaTipo'
    );
    this.tipos = Array.from(
      new Set(resSigla.data.dados.map((s) => s.sigla))
    ).sort();
    const resTemas = await this.$openData.get(
      '/referencias/proposicoes/codTema'
    );
    this.temas = resTemas.data.dados;
  },
  data() {
    return {
      search: {
        numero: '',
        siglaTipo: '',
        ano: '',
        dataApresentacaoInicio: null
      },
      tipos: [],
      temas: []
    };
  },
  methods: {
    getTipoLabel(tipo) {
      return `${tipo.sigla} (${tipo.nome})`;
    },
    onSearch() {
      this.$emit('search', {
        ...this.search,
        siglaTipo: this.search.siglaTipo ? [this.search.siglaTipo] : null,
        dataApresentacaoInicio: this.search.dataApresentacaoInicio
          ? this.$moment(this.search.dataApresentacaoInicio).format(
              'YYYY-MM-DD'
            )
          : null
      });
    }
  }
};
</script>

<style lang="scss">
#tramitacao-search {
}
</style>
