<template>
  <div>
    <h2>Proposições do deputado por ano e tipo</h2>

    <div class="deputado-proposicoes-chart">
      <template v-if="option && !error">
        <v-chart :option="option" />
      </template>
      <a-alert v-else-if="error">
        {{ error }}
      </a-alert>
    </div>
  </div>
</template>

<script>
import { use } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import {
  TooltipComponent,
  TitleComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';

import VChart from 'vue-echarts';

import colors from '../utils/colors';

use([
  CanvasRenderer,
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  BarChart
]);

export default {
  components: {
    VChart
  },
  props: {
    deputadoId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      chartData: null,
      error: null
    };
  },
  async fetch() {
    await this.loadData();
  },
  computed: {
    yearsArray() {
      if (!this.chartData) {
        return null;
      }
      return Object.keys(this.chartData);
    },
    typesArray() {
      if (!this.chartData) {
        return null;
      }
      return Object.values(this.chartData).map((dt) => dt.types);
    },
    allUniqueProposicaoTypes() {
      if (!this.chartData) {
        return null;
      }
      return Array.from(
        new Set(this.typesArray.map((t) => Object.keys(t)).flat())
      ).sort();
    },
    option() {
      if (!this.chartData) {
        return null;
      }
      return {
        legend: {
          data: this.allUniqueProposicaoTypes.map((t) => ({
            name: t,
            icon: 'pin',
            itemStyle: {
              color: colors[this.allUniqueProposicaoTypes.indexOf(t)]
            }
          })),
          type: 'scroll'
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            const header = `<b>Ano: ${params[0].axisValueLabel}<b><br>`;
            return `
              ${header}
              <div style="display: flex; flex-wrap: wrap; gap: 10px; max-width: 450px;">
                ${params
                  .map((item, idx) => {
                    return item.value
                      ? `<div>${item.marker} ${item.data.groupId}: ${item.value}</div>`
                      : '';
                  })
                  .join('')}
              </div>
              `;
          }
        },
        xAxis: {
          data: Object.keys(this.chartData)
        },
        yAxis: {},
        series: this.allUniqueProposicaoTypes.map((type) => ({
          name: type,
          data: this.yearsArray.map((y) => ({
            groupId: type,
            value: this.chartData[y].types?.[type] || 0,
            itemStyle: {
              color: colors[this.allUniqueProposicaoTypes.indexOf(type)]
            }
          })),
          type: 'bar',
          stack: 'legislacoes'
        }))
      };
    },
    total() {
      if (!this.chartData) {
        return 0;
      }
      return Object.values(this.chartData).reduce(
        (ttl, dt) => dt.amount + ttl,
        0
      );
    }
  },
  watch: {
    deputadoId() {
      this.loadData();
    },
    '$vuetify.breakpoint.name'() {
      /*
       * Hack thing to force chart to redraw on resize.
       * It can't be with $nextTick because it's not late enough to resize the container.
       */
      const restore = { ...this.chartData };
      this.chartData = null;
      setTimeout(() => {
        this.chartData = restore;
      }, 300);
    }
  },
  methods: {
    async loadData() {
      try {
        const res = await this.$chartData.get(`dep_${this.deputadoId}.json`);
        this.chartData = res.data.proposicoes_by_year;
      } catch {
        this.error = 'Não foi possível carregar os dados';
      }
    }
  }
};
</script>

<style lang="scss">
.deputado-proposicoes-chart {
  width: 100%;
  height: 600px;
  margin: 50px 0;
  .chart-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
}
</style>
