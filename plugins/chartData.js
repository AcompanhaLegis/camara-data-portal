export default ({ $axios }, inject) => {
  const chartData = $axios.create({
    headers: {
      common: {
        Accept: 'application/json'
      }
    }
  });

  const baseURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:9000/'
      : 'https://acompanha-legis.s3-sa-east-1.amazonaws.com/';

  chartData.setBaseURL(baseURL);

  inject('chartData', chartData);
};
