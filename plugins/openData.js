export default ({ $axios }, inject) => {
  const openData = $axios.create({
    headers: {
      common: {
        Accept: 'application/json'
      }
    }
  });

  openData.setBaseURL('https://dadosabertos.camara.leg.br/api/v2');

  inject('openData', openData);
};
