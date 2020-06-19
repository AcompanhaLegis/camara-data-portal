import Vue from 'vue';
import moment from 'moment';

moment.locale('pt-br');

Vue.prototype.$moment = moment;
Vue.prototype.$calendarLocale = {
  lang: {
    locale: 'pt_BR',
    placeholder: 'Selecionar data',
    rangePlaceholder: ['Data inicial', 'Data final'],
    today: 'Hoje',
    now: 'Agora',
    backToToday: 'Voltar para hoje',
    ok: 'Ok',
    clear: 'Limpar',
    month: 'Mês',
    year: 'Ano',
    timeSelect: 'Selecionar hora',
    dateSelect: 'Selecionar data',
    monthSelect: 'Escolher mês',
    yearSelect: 'Escolher ano',
    decadeSelect: 'Escolher década',
    yearFormat: 'YYYY',
    dateFormat: 'DD/MM/YYYY',
    dayFormat: 'DD',
    dateTimeFormat: 'DD/MM/YYYY HH:mm:ss',
    monthFormat: 'MMMM',
    monthBeforeYear: true,
    previousMonth: 'Mês anterior',
    nextMonth: 'Próximo mês',
    previousYear: 'Último ano',
    nextYear: 'Próximo ano',
    previousDecade: 'Última década',
    nextDecade: 'Próxima década',
    previousCentury: 'Último século',
    nextCentury: 'Próximo século'
  },
  timePickerLocale: {
    placeholder: 'Selecionar hora'
  },
  dateFormat: 'DD/MM/YYYY',
  dateTimeFormat: 'DD/MM/YYYY HH:mm:ss',
  weekFormat: 'YYYY-wo',
  monthFormat: 'YYYY-MM'
};
