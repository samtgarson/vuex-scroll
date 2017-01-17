import ScrollEvents from 'scroll-events'

const state = {
  progress: null,
  direction: null,
  speed: null,
  status: null
}

/* eslint-disable no-param-reassign */
const mutations = {
  update (s, { status, event }) {
    s.status = status
    s.progress = event.x
    s.direction = event.directionY
    s.speed = event.speedY
  }
}
/* eslint-enable no-param-reassign */

export const vuexScroll = {
  namespaced: true,
  state,
  mutations
}

export const vuexScrollMixin = {
  install (Vue, options = {}) {
    if (!Vue.$store) throw new Error('This plugin requires a Vuex store')
    Vue.mixin({
      mounted () {
        const el = options.el || window
        const scrollEvents = ScrollEvents.new(el)
        const update = (status, event) => this.$store.commit('vuexScroll/update', { status, event })

        scrollEvents.on('scroll:start', e => update('start', e))
        scrollEvents.on('scroll:progress', e => update('progress', e))
        scrollEvents.on('scroll:stop', e => update('stop', e))
      }
    })
  }
}
