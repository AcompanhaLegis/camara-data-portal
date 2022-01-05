import path from 'path';
import fs from 'fs';
import redirectSSL from 'redirect-ssl';

let config = {
  /*
   ** Headers of the page
   */
  head: {
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
  plugins: ['@/plugins/antd-ui', '@/plugins/openData', '@/plugins/moment'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/auth'
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/', method: 'post', propertyName: 'token' },
          logout: false,
          user: { url: '/profile/', method: 'get', propertyName: 'user' }
        },
        tokenType: 'Token',
        globalToken: true
      }
    }
  },
  router: {
    middleware: ['auth']
  },
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
    }
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
    treeShake: process.env.NODE_ENV === 'production',
  },
};

if (process.env.NODE_ENV === 'production') {
  config = {
    ...config,
    vue: {
      config: {
        productionTip: true,
        devtools: false
      }
    },
    serverMiddleware: [
      redirectSSL.create({
        enabled: true
      })
    ],
    server: {
      https: {
        key: fs.readFileSync(path.resolve(__dirname, 'privkey.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, 'fullchain.pem'))
      }
    }
  };
}

export default config;
