# Vuex Scroll

> Keep vuex state updated with scroll stats

This library packs some helpers to keep scroll state in your Vuex store. It uses [scroll-events](https://www.npmjs.com/package/scroll-events) under the hood.

## Usage

This lib comes with 2 helpers—a Vue mixin and a Vuex plugin. Use them both to get started. _(N.B. `vuex-scroll` only supports scrolling on `window` at this time. See below for roadmap)_

_index.js_
```js
import Vue from 'vue'
import { vuexScrollMixin} from 'vuex-store'
const scrollMixin = vuexScrollMixin({
  delay: 100 // Debounce delay    
})
...

export new Vue({
  mixins: [scrollMixin],
  ...
})
```

_store/index.js_
```js
import Vue from 'vue'
import Vuex from 'vuex'
import { vuexScroll } from 'vuex-store'

Vue.use(Vuex)

...

export new Vuex.Store({
  modules: { vuexScroll },
  ...
})

```

Once you've included both, you should have a module in your Vuex store which looks like:

```js
{
  vuexScroll: {
    direction: null // 1 or -1
    progress: null // Y distance in px
    speed: null // Number representing speed
    status: null // start, stop or progress
  }
}

```

Inject this into your components to get reactive updates when the window scrolls (see: https://vuex.vuejs.org/en/modules.html)

_component.vue
```js
import 'mapState' from 'vuex'

export default {
  computed: {
    ...mapState('vuexScroll', ['progress'])
  }
}
```

## Todo

- [ ] Tests ⚠️
- [ ] Enable passing a selector in as an option to listen for scroll events on a specific object.
- [ ] Enable specifying horizontal as an option

## Contribute

Please submit issues/PRs. Make sure your code passes `yarn test` and to do a `yarn build` before pushing.
