export const NuxtLogo = () => import('../..\\components\\NuxtLogo.vue' /* webpackChunkName: "components/nuxt-logo" */).then(c => wrapFunctional(c.default || c))
export const Timeline = () => import('../..\\components\\Timeline.vue' /* webpackChunkName: "components/timeline" */).then(c => wrapFunctional(c.default || c))
export const Tutorial = () => import('../..\\components\\Tutorial.vue' /* webpackChunkName: "components/tutorial" */).then(c => wrapFunctional(c.default || c))
export const Welcome = () => import('../..\\components\\Welcome.vue' /* webpackChunkName: "components/welcome" */).then(c => wrapFunctional(c.default || c))
export const SubcomponentsDropdown = () => import('../..\\components\\subcomponents\\Dropdown.vue' /* webpackChunkName: "components/subcomponents-dropdown" */).then(c => wrapFunctional(c.default || c))
export const SubcomponentsFooter = () => import('../..\\components\\subcomponents\\Footer.vue' /* webpackChunkName: "components/subcomponents-footer" */).then(c => wrapFunctional(c.default || c))
export const SubcomponentsLine = () => import('../..\\components\\subcomponents\\Line.vue' /* webpackChunkName: "components/subcomponents-line" */).then(c => wrapFunctional(c.default || c))
export const SubcomponentsScrollingBanner = () => import('../..\\components\\subcomponents\\ScrollingBanner.vue' /* webpackChunkName: "components/subcomponents-scrolling-banner" */).then(c => wrapFunctional(c.default || c))
export const SubcomponentsTimelineBuilder = () => import('../..\\components\\subcomponents\\TimelineBuilder.vue' /* webpackChunkName: "components/subcomponents-timeline-builder" */).then(c => wrapFunctional(c.default || c))
export const SubcomponentsToggle = () => import('../..\\components\\subcomponents\\toggle.vue' /* webpackChunkName: "components/subcomponents-toggle" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
