import colors from 'vuetify/es5/util/colors'

export default {
  publicRuntimeConfig: {
    name: process.env.APP_NAME,
    url: process.env.APP_URL,
    api: process.env.API_URL,
    blog: process.env.BLOG_URL,
    paypal: process.env.PAYPAL_KEY,
  },

  router: {
    middleware: 'main',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ' + process.env.APP_NAME,
    title: process.env.APP_NAME,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      themes: {
        light: {
          background: '#f7f8fb',
          primary: colors.blue.darken2,
          secondary: colors.grey.darken3,
          accent: colors.cyan.darken1,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      },
      options: {
        customProperties: true
      }
    }
  },

  loading: {
    color: colors.blue.darken2,
  },

  sweetalert: {
    confirmButtonColor: colors.blue.darken2,
    cancelButtonColor: colors.grey.darken3,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/dotenv',
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'vue-sweetalert2/nuxt',
    'cookie-universal-nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
