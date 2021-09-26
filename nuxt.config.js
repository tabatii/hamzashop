import colors from 'vuetify/es5/util/colors'

export default {
  publicRuntimeConfig: {
    name: process.env.APP_NAME,
    url: process.env.APP_URL,
    api: process.env.API_URL,
    blog: process.env.BLOG_URL,
    paypal: process.env.PAYPAL_ID,
    paymentwall: process.env.PW_KEY,
    googleAnalytics: {
      id: process.env.GA_ID
    }
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
    '~/plugins/mask.js',
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
    '@nuxtjs/google-analytics',
    'cookie-universal-nuxt',
    'vue-sweetalert2/nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    //
  },

  firebase: {
    config: {
      apiKey: 'AIzaSyD2fiOhO-baooLKT2oOyJAQ-fk-3Gj4QLQ',
      authDomain: 'hamzashop-63ed8.firebaseapp.com',
      projectId: 'hamzashop-63ed8',
      storageBucket: 'hamzashop-63ed8.appspot.com',
      messagingSenderId: '938373796993',
      appId: '1:938373796993:web:554c4746809fc7ff6ae980',
    },
    services: {
      storage: true,
    }
  },

  googleAnalytics: {
    ignoreRoutes: [
      '/admin',
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'vuetify/lib',
      'tiptap',
    ]
  }
}
