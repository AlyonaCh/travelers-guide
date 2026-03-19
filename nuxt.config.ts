// https://nuxt.com/docs/api/configuration/nuxt-config
// В проекте может не быть node-typings, а в конфиге нужен `process.env`.
declare const process: { env: Record<string, string | undefined> }

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {deployEnv: process.env.NUXT_PUBLIC_DEPLOY_ENV ?? 'default'
    }
  },
  nitro: {
    // GitHub Pages не умеет запускать SSR-сервер, поэтому собираем статический сайт.
    preset: 'static',
  },
})
