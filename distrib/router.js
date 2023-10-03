import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5e690676 = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _0299f5ec = () => interopDefault(import('..\\pages\\test.vue' /* webpackChunkName: "pages/test" */))
const _1ef950ec = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _62cc15eb = () => interopDefault(import('..\\pages\\movie\\_details.vue' /* webpackChunkName: "pages/movie/_details" */))
const _18286e90 = () => interopDefault(import('..\\pages\\show\\_details.vue' /* webpackChunkName: "pages/show/_details" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _5e690676,
    name: "about"
  }, {
    path: "/test",
    component: _0299f5ec,
    name: "test"
  }, {
    path: "/",
    component: _1ef950ec,
    name: "index"
  }, {
    path: "/movie/:details?",
    component: _62cc15eb,
    name: "movie-details"
  }, {
    path: "/show/:details?",
    component: _18286e90,
    name: "show-details"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
