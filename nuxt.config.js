import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - client",
    title: "FoodEX",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // server: {
  //   host: "192.168.1.5",
  //   port: 8000, // default: 3000
  // },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: "~/plugins/api.js",
    },
    {
      src: "~/plugins/constants.js",
    },
  ],

  axios: {
    baseUrl: `https://foodexx.herokuapp.com/api/v2`,
    // baseUrl: `http://localhost:8080/api/v2`,
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxtjs/toast",
    "nuxt-socket-io",
  ],

  io: {
    // module options
    sockets: [
      {
        name: "main",
        url: "https://foodexx.herokuapp.com/",
      },
    ],
  },

  toast: {
    position: "top-right",
    duration: 3000,
  },

  // router: {
  //   middleware: ["auth"],
  // },
  // auth: {
  //   strategies: {
  //     local: {
  //       token: {
  //         property: "token",
  //         global: true,
  //         required: true,
  //         type: "Bearer",
  //       },
  //       user: {
  //         property: "",
  //         // autoFetch: true
  //       },
  //       endpoints: {
  //         login: { url: "/login", method: "post" },
  //         logout: { url: "/logout", method: "post" },
  //         user: { url: "/user", method: "get" },
  //       },
  //     },
  //   },
  // },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
