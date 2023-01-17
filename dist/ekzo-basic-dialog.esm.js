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
  data() {
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
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var comp = this;
      if (this.enableEsc) document.addEventListener('keyup', function (e) {
        if (comp.Show && e.keyCode == 27) comp.CloseCallback();
      });
      if (this.autoShow) this.Open();
    },
    CloseCallback: function () {
      let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.$emit('dialog:result', value);
      if (this.closeOnClick) this.Show = false;
    },
    Open: function () {
      this.Show = true;
    },
    EnableOk: function () {
      this.showOk = true;
    },
    DisableOk: function () {
      this.showOk = false;
    },
    dragMouseDown: function (event) {
      event.preventDefault();
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      document.onmousemove = this.elementDrag;
      document.onmouseup = this.closeDragElement;
    },
    elementDrag: function (event) {
      event.preventDefault();
      this.positions.movementX = this.positions.clientX - event.clientX;
      this.positions.movementY = this.positions.clientY - event.clientY;
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      // set the element's new position:
      this.$refs.draggableContainer.style.top = this.$refs.draggableContainer.offsetTop - this.positions.movementY + 'px';
      this.$refs.draggableContainer.style.left = this.$refs.draggableContainer.offsetLeft - this.positions.movementX + 'px';
    },
    closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  },
  computed: {
    cssClassesList() {
      var classes = [];
      if (this.cssClasses.length > 0) classes = this.cssClasses.split(' ');
      return ['modal-' + this.theme, ...classes];
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
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
  }, [_c('div', {
    staticClass: "modal__wrapper"
  }), _vm._v(" "), _c('div', {
    staticClass: "modal__container draggable"
  }, [_c('div', {
    staticClass: "modal__header",
    on: {
      "mousedown": _vm.dragMouseDown
    }
  }, [_vm._v("\n            " + _vm._s(_vm.title) + "\n        ")]), _vm._v(" "), _c('div', {
    staticClass: "modal__content"
  }, [_vm._t("default")], 2), _vm._v(" "), _vm.showOk | _vm.showClose ? _c('div', {
    staticClass: "modal__controls"
  }, [_c('button', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.showClose,
      expression: "showClose"
    }],
    ref: "closebtn",
    staticClass: "modal__button modal__close-btn",
    on: {
      "click": function ($event) {
        return _vm.CloseCallback();
      }
    }
  }, [_vm._v("\n                    " + _vm._s(_vm.cancelText) + "\n            ")]), _vm._v(" "), _c('button', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.showOk,
      expression: "showOk"
    }],
    ref: "okbtn",
    staticClass: "modal__button modal__confirm-btn",
    class: _vm.theme,
    attrs: {
      "autofocus": ""
    },
    on: {
      "click": function ($event) {
        return _vm.CloseCallback(true);
      }
    }
  }, [_vm._v("\n                    " + _vm._s(_vm.okText) + "\n            ")])]) : _vm._e()])]);
};
var __vue_staticRenderFns__ = [];

/* style */
const __vue_inject_styles__ = undefined;
/* scoped */
const __vue_scope_id__ = "data-v-7aaf5cef";
/* module identifier */
const __vue_module_identifier__ = undefined;
/* functional template */
const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);
var component = __vue_component__;

// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = component;

  // Attach install function executed by Vue.use()
  installable.install = Vue => {
    Vue.component('EkzoBasicDialog', installable);
  };
  return installable;
})();

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export { entry_esm as default };
