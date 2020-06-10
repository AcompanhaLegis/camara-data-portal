<template>
  <a-calendar @panelChange="changeMonth">
    <ul slot="dateCellRender" slot-scope="value" class="events">
      <li v-for="item in getListData(value)" :key="item.id">
        <a-tag color="cyan">{{ item.descricaoTipo }}</a-tag>
      </li>
    </ul>
    <template slot="monthCellRender" slot-scope="value">
      <div v-if="getMonthData(value)" class="notes-month">
        <section>{{ getMonthData(value) }}</section>
        <span>Backlog number</span>
      </div>
    </template>
  </a-calendar>
</template>
<script>
export default {
  layout: 'auth',
  data() {
    return {
      events: []
    };
  },
  created() {
    const today = this.$moment();
    this.fetchEventos(today.month(), today.year());
  },
  methods: {
    changeMonth(date) {
      this.fetchEventos(date.month(), date.year());
    },
    getListData(value) {
      const listData = this.events.filter(
        (event) =>
          this.$moment(event.dataHoraInicio).date() === value.date() &&
          this.$moment(event.dataHoraInicio).month() === value.month() &&
          this.$moment(event.dataHoraInicio).year() === value.year()
      );
      return listData || [];
    },

    getMonthData(value) {
      if (value.month() === 8) {
        return 1394;
      }
    },
    fetchEventos(month, year) {
      const initialDate = this.$moment()
        .month(month)
        .year(year)
        .startOf('month')
        .format('YYYY-MM-DD');
      const finalDate = this.$moment()
        .month(month)
        .year(year)
        .endOf('month')
        .format('YYYY-MM-DD');
      this.$openData
        .get(
          `/eventos?dataInicio=${initialDate}&dataFim=${finalDate}&ordem=ASC&ordenarPor=dataHoraInicio`
        )
        .then((response) => {
          this.events = response.data.dados;
        });
    }
  }
};
</script>
<style scoped>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
</style>
