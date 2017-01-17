import ScrollEvents from 'scroll-events'
import debounce from 'debounce'

const state = {
  progress: null,
  direction: null,
  speed: null,
  status: null
}

/* eslint-disable no-param-reassign */
const mutations = {
  update (s, { status, progress, direction, speed }) {
    s.status = status
    s.progress = progress
    s.direction = direction
    s.speed = speed
  }
}
/* eslint-enable no-param-reassign */

export const vuexScroll = {
  namespaced: true,
  state,
  mutations
}


export const vuexScrollMixin = opts => ({
  mounted () {
    if (!this.$store) throw new Error('This plugin requires a Vuex store')
    const scrollEvents = new ScrollEvents()
    const update = (status) => {
      this.$store.commit('vuexScroll/update', {
        status,
        progress: scrollEvents.y,
        direction: scrollEvents.directionY,
        speed: scrollEvents.speedY
      })
    }
    const delay = opts.delay || 200
    const sensibleUpdate = debounce(update, delay)

    scrollEvents.on('scroll:start', () => sensibleUpdate('start'))
    scrollEvents.on('scroll:progress', () => sensibleUpdate('progress'))
    scrollEvents.on('scroll:stop', () => sensibleUpdate('stop'))
  }
})
