import colors from 'vuetify/es5/util/colors'

export default {
  publicRuntimeConfig: {
    name: process.env.APP_NAME,
    url: process.env.APP_URL,
    api: process.env.API_URL,
    blog: process.env.BLOG_URL,
    paypal: process.env.PAYPAL_ID,
  },

  router: {
    middleware: [
      'currency',
    ],
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
    },
    breakpoint: {
      thresholds: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200
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
    '~/assets/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/admin.js',
    '~/plugins/language.js',
    '~/plugins/currency.js',
    '~/plugins/tiptap.js',
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
    '@nuxtjs/firebase',
    'vue-sweetalert2/nuxt',
    'cookie-universal-nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
  },

  firebase: {
    config: {
      apiKey: 'AIzaSyBiJM_1W_m06P7x9fykKNEIUKSMfw_vKsA',
      authDomain: 'hamzashop-afb8f.firebaseapp.com',
      projectId: 'hamzashop-afb8f',
      storageBucket: 'hamzashop-afb8f.appspot.com',
      messagingSenderId: '873529793056',
      appId: '1:873529793056:web:f69698fcfa2151f11f3a45',
      measurementId: 'G-DEXQSHEBP2',
    },
    services: {
      storage: true,
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'vuetify/lib',
      'tiptap',
    ]
  }
}
