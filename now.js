export default {
  "version": 2,
  "builds": [
  {
    "src": "nuxt.config.js",
    "use": "@nuxtjs/now-builder",
    "config": {
      "serverFiles": ["package.json"]
    }
  }
],
  "routes": [
  { "src": "/_nuxt/.+", "headers": { "Cache-Control": "max-age=31557600" } },
  {
    "src": "/sw.js",
    "dest": "/_nuxt/static/sw.js",
    "headers": {
      "cache-control": "public, max-age=43200, immutable",
      "Service-Worker-Allowed": "/"
    }
  },
  { "src": "/(.*)", "dest": "/" }
]
}
