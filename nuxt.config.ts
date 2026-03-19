// https://nuxt.com/docs/api/configuration/nuxt-config
// В проекте может не быть node-typings, а в конфиге нужен `process.env`.
declare const process: { env: Record<string, string | undefined> }

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    // Для GitHub Pages (project site) baseURL должен быть вида `/${repo}/`
    baseURL: process.env.NUXT_BASE_URL ?? '/',
  },
  nitro: {
    // GitHub Pages не умеет запускать SSR-сервер, поэтому собираем статический сайт.
    preset: 'static',
  },
})
