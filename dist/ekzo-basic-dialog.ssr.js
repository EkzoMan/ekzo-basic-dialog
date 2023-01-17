'use strict';function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  name: 'ekzo-basic-dialog',
  props: {
    title: {
      type: String,
      default: undefined
    },
    theme: {
      type: String,
      default: 'default'
    },
    okText: {
      type: String,
      default: 'OK'
    },
    cancelText: {
      type: String,
      default: 'Close'
    },
    enableEsc: {
      type: Boolean,
      default: true
    },
    showOk: {
      type: Boolean,
      default: false
    },
    cssClasses: {
      type: String,
      default: ''
    },
    showClose: {
      type: Boolean,
      default: true
    },
    autoShow: {
      type: Boolean,
      default: false
    },
    closeOnClick: {
      type: Boolean,
      default: true
    }
  },
  emits: ['dialog:result'],
  data: function data() {
    return {
      uid: Math.round(Math.random() * 10),
      Show: false,
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      }
    };
  },
  mounted: function mounted() {
    this.init();
  },
  methods: {
    init: function init() {
      var comp = this;
      if (this.enableEsc) document.addEventListener('keyup', function (e) {
        if (comp.Show && e.keyCode == 27) comp.CloseCallback();
      });
      if (this.autoShow) this.Open();
    },
    CloseCallback: function CloseCallback() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.$emit('dialog:result', value);
      if (this.closeOnClick) this.Show = false;
    },
    Open: function Open() {
      this.Show = true;
    },
    EnableOk: function EnableOk() {
      this.showOk = true;
    },
    DisableOk: function DisableOk() {
      this.showOk = false;
    },
    dragMouseDown: function dragMouseDown(event) {
      event.preventDefault();
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      document.onmousemove = this.elementDrag;
      document.onmouseup = this.closeDragElement;
    },
    elementDrag: function elementDrag(event) {
      event.preventDefault();
      this.positions.movementX = this.positions.clientX - event.clientX;
      this.positions.movementY = this.positions.clientY - event.clientY;
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      // set the element's new position:
      this.$refs.draggableContainer.style.top = this.$refs.draggableContainer.offsetTop - this.positions.movementY + 'px';
      this.$refs.draggableContainer.style.left = this.$refs.draggableContainer.offsetLeft - this.positions.movementX + 'px';
    },
    closeDragElement: function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  },
  computed: {
    cssClassesList: function cssClassesList() {
      var classes = [];
      if (this.cssClasses.length > 0) classes = this.cssClasses.split(' ');
      return ['modal-' + this.theme].concat(_toConsumableArray(classes));
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.Show,
      expression: "Show"
    }],
    ref: "draggableContainer",
    staticClass: "modal",
    class: this.cssClassesList,
    attrs: {
      "id": 'modal-dialog-' + this.uid
    }
  }, [_vm._ssrNode("<div class=\"modal__wrapper\" data-v-7aaf5cef></div> "), _vm._ssrNode("<div class=\"modal__container draggable\" data-v-7aaf5cef>", "</div>", [_vm._ssrNode("<div class=\"modal__header\" data-v-7aaf5cef>" + _vm._ssrEscape("\n            " + _vm._s(_vm.title) + "\n        ") + "</div> "), _vm._ssrNode("<div class=\"modal__content\" data-v-7aaf5cef>", "</div>", [_vm._t("default")], 2), _vm._ssrNode(" " + (_vm.showOk | _vm.showClose ? "<div class=\"modal__controls\" data-v-7aaf5cef><button class=\"modal__button modal__close-btn\"" + _vm._ssrStyle(null, null, {
    display: _vm.showClose ? '' : 'none'
  }) + " data-v-7aaf5cef>" + _vm._ssrEscape("\n                    " + _vm._s(_vm.cancelText) + "\n            ") + "</button> <button autofocus=\"autofocus\"" + _vm._ssrClass("modal__button modal__confirm-btn", _vm.theme) + _vm._ssrStyle(null, null, {
    display: _vm.showOk ? '' : 'none'
  }) + " data-v-7aaf5cef>" + _vm._ssrEscape("\n                    " + _vm._s(_vm.okText) + "\n            ") + "</button></div>" : "<!---->"))], 2)], 2);
};
var __vue_staticRenderFns__ = [];

/* style */
var __vue_inject_styles__ = undefined;
/* scoped */
var __vue_scope_id__ = "data-v-7aaf5cef";
/* module identifier */
var __vue_module_identifier__ = "data-v-7aaf5cef";
/* functional template */
var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);
var component$1 = __vue_component__;// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = component$1;

  // Attach install function executed by Vue.use()
  installable.install = function (Vue) {
    Vue.component('EkzoBasicDialog', installable);
  };
  return installable;
})();

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default':component});// Attach named exports directly to component. IIFE/CJS will
// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)
Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    exportName = _ref2[0],
    exported = _ref2[1];
  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;