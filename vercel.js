export default {
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ],
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
