'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vuexScrollMixin = exports.vuexScroll = undefined;

var _scrollEvents = require('scroll-events');

var _scrollEvents2 = _interopRequireDefault(_scrollEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
  progress: null,
  direction: null,
  speed: null,
  status: null
};

/* eslint-disable no-param-reassign */
var mutations = {
  update: function update(s, _ref) {
    var status = _ref.status,
        event = _ref.event;

    s.status = status;
    s.progress = event.x;
    s.direction = event.directionY;
    s.speed = event.speedY;
  }
};
/* eslint-enable no-param-reassign */

var vuexScroll = exports.vuexScroll = {
  namespaced: true,
  state: state,
  mutations: mutations
};

var vuexScrollMixin = exports.vuexScrollMixin = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!Vue.$store) throw new Error('This plugin requires a Vuex store');
    Vue.mixin({
      mounted: function mounted() {
        var _this = this;

        var el = options.el || window;
        var scrollEvents = _scrollEvents2.default.new(el);
        var update = function update(status, event) {
          return _this.$store.commit('vuexScroll/update', { status: status, event: event });
        };

        scrollEvents.on('scroll:start', function (e) {
          return update('start', e);
        });
        scrollEvents.on('scroll:progress', function (e) {
          return update('progress', e);
        });
        scrollEvents.on('scroll:stop', function (e) {
          return update('stop', e);
        });
      }
    });
  }
};