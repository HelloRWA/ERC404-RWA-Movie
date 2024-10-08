import process from 'node:process'

const isDev = process.env.NODE_ENV === 'development'

// const apiBaseUrl = 'http://localhost:3001'
// const apiBaseUrl = 'https://movies-proxy.vercel.app'
const apiBaseUrl = import.meta.env.VITE_PROXY_URL

export default defineNuxtConfig({
  imports: {
    dirs: ['server/utils/share-utils/*.ts'],
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxt/image',
    '@nuxtjs/i18n',
    'nuxt-gtag',
    '@vue-macros/nuxt',
    'nuxt-lodash',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
  ],
  experimental: {
    // inlineSSRStyles: true,
    viewTransition: true,
    renderJsonPayloads: true,
  },
  // routeRules: {
  //   '/**': isDev ? {} : { cache: { swr: true, maxAge: 120, staleMaxAge: 60, headersOnly: true } },
  // },
  runtimeConfig: {
    public: {
      apiBaseUrl,
    },
  },
  devtools: {
    enabled: true,
  },
  image: {
    provider: 'proxy',
    providers: {
      proxy: {
        provider: 'ipx',
        options: {
          baseURL: `${apiBaseUrl}/ipx`,
        },
      },
    },
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  //   routeRules: {
  //     // '/**': { isr: false },
  //   },
  },
  supabase: {
    redirect: false,
    clientOptions: {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true
      },
    },
  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: 'en',
    },
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'de-DE',
        name: 'Deutsch',
        file: 'de-DE.json',
      },
      {
        code: 'es-ES',
        name: 'Español',
        file: 'es-ES.json',
      },
      {
        code: 'it',
        name: 'Italiano',
        file: 'it.json',
      },
      {
        code: 'ja',
        name: '日本語',
        file: 'ja.json',
      },
      {
        code: 'zh-CN',
        name: '简体中文',
        file: 'zh-CN.json',
      },
      {
        code: 'pt-PT',
        name: 'Português',
        file: 'pt-PT.json',
      },
      {
        code: 'pt-BR',
        name: 'Português do Brasil',
        file: 'pt-BR.json',
      },
    ],
    lazy: true,
    langDir: 'internationalization',
    defaultLocale: 'en',
  },
  vite: {
    define: {
      global: 'window',
    },
    // esbuild: {
    //   tsconfigRaw: {
    //     compilerOptions: {
    //       target: 'esnext',
    //     },
    //   },
    // },
  },
})
