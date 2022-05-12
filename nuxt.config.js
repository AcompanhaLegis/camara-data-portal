const config = {
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'pt-br'
    },
    title: 'Portal Acompanha Legis',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=IBM+Plex+Mono'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['ant-design-vue/dist/antd.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/antd-ui', '@/plugins/openData', '@/plugins/moment', '@/plugins/chartData'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics',
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
  ],
  router: {},
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000/'
        : '/api',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
        options: {
          fix: true
        }
      });
    },
    transpile: [/echarts/, /zrender/],
  },

  /*
   ** Google Analytics
   */
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID
  },

  /**
   * Vuetify
   */
  vuetify: {
    customVariables: ['~/assets/css/variables.scss'],
    treeShake: process.env.NODE_ENV === 'production'
  },

  /**
   * Vue
   */
  vue: {
    config: {
      productionTip: process.env.NODE_ENV === 'production',
      devtools: process.env.NODE_ENV !== 'production'
    }
  },
  
  target: 'static',
};

export default config;
