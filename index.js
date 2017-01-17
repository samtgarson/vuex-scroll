'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vuexScrollMixin = exports.vuexScroll = undefined;

var _scrollEvents = require('scroll-events');

var _scrollEvents2 = _interopRequireDefault(_scrollEvents);

var _debounce = require('debounce');

var _debounce2 = _interopRequireDefault(_debounce);

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
        progress = _ref.progress,
        direction = _ref.direction,
        speed = _ref.speed;

    s.status = status;
    s.progress = progress;
    s.direction = direction;
    s.speed = speed;
  }
};
/* eslint-enable no-param-reassign */

var vuexScroll = exports.vuexScroll = {
  namespaced: true,
  state: state,
  mutations: mutations
};

var vuexScrollMixin = exports.vuexScrollMixin = function vuexScrollMixin(opts) {
  return {
    mounted: function mounted() {
      var _this = this;

      if (!this.$store) throw new Error('This plugin requires a Vuex store');
      var scrollEvents = new _scrollEvents2.default();
      var u = function u(status) {
        _this.$store.commit('vuexScroll/update', {
          status: status,
          progress: scrollEvents.y,
          direction: scrollEvents.directionY,
          speed: scrollEvents.speedY
        });
      };
      var delay = typeof opts.delay === 'undefined' ? 200 : opts.delay;
      var update = opts.delay === 0 || opts.delay === false ? u : (0, _debounce2.default)(u, delay);

      scrollEvents.on('scroll:start', function () {
        return update('start');
      });
      scrollEvents.on('scroll:progress', function () {
        return update('progress');
      });
      scrollEvents.on('scroll:stop', function () {
        return update('stop');
      });
    }
  };
};