var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/blocks/Main/Main.js
var Main_exports = {};
__export(Main_exports, {
  Main: () => Main
});
var Main;
var init_Main = __esm({
  "src/blocks/Main/Main.js"() {
    Main = (node) => {
      node.classList.add("container");
      node.classList.add("mx-auto");
      node.classList.add("my-5");
      node.classList.add("px-5");
      node.classList.add("py-5");
      node.classList.add("border");
      node.classList.add("border-5");
      node.classList.add("border-primary");
      node.classList.add("rounded-3");
      node.classList.add("bg-light");
      node.classList.add("shadow-lg");
    };
  }
});

// node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/utils.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
var init_utils = __esm({
  "node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/utils.js"() {
  }
});

// node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/environment.js
var init_environment = __esm({
  "node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/environment.js"() {
    init_utils();
  }
});

// node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/loop.js
var init_loop = __esm({
  "node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/loop.js"() {
    init_environment();
  }
});

// node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/globals.js
var globals;
var init_globals = __esm({
  "node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/globals.js"() {
    globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
      // @ts-ignore Node typings have this
      global
    );
  }
});

// node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/ResizeObserverSingleton.js
var ResizeObserverSingleton;
var init_ResizeObserverSingleton = __esm({
  "node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/ResizeObserverSingleton.js"() {
    init_globals();
    ResizeObserverSingleton = class _ResizeObserverSingleton {
      /** @param {ResizeObserverOptions} options */
      constructor(options) {
        /**
         * @private
         * @readonly
         * @type {WeakMap<Element, import('./private.js').Listener>}
         */
        __publicField(this, "_listeners", "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0);
        /**
         * @private
         * @type {ResizeObserver}
         */
        __publicField(this, "_observer");
        /** @type {ResizeObserverOptions} */
        __publicField(this, "options");
        this.options = options;
      }
      /**
       * @param {Element} element
       * @param {import('./private.js').Listener} listener
       * @returns {() => void}
       */
      observe(element2, listener) {
        this._listeners.set(element2, listener);
        this._getObserver().observe(element2, this.options);
        return () => {
          this._listeners.delete(element2);
          this._observer.unobserve(element2);
        };
      }
      /**
       * @private
       */
      _getObserver() {
        return this._observer ?? (this._observer = new ResizeObserver((entries) => {
          for (const entry of entries) {
            _ResizeObserverSingleton.entries.set(entry.target, entry);
            this._listeners.get(entry.target)?.(entry);
          }
        }));
      }
    };
    ResizeObserverSingleton.entries = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;
  }
});

// node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/dom.js
function start_hydrating() {
  is_hydrating = true;
}
function end_hydrating() {
  is_hydrating = false;
}
function append(target, node) {
  target.appendChild(node);
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i])
      iterations[i].d(detaching);
  }
}
function element(name) {
  return document.createElement(name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function toggle_class(element2, name, toggle) {
  element2.classList.toggle(name, !!toggle);
}
function get_custom_elements_slots(element2) {
  const result = {};
  element2.childNodes.forEach(
    /** @param {Element} node */
    (node) => {
      result[node.slot || "default"] = true;
    }
  );
  return result;
}
var is_hydrating;
var init_dom = __esm({
  "node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/dom.js"() {
    init_utils();
    init_ResizeObserverSingleton();
    is_hydrating = false;
  }
});

// node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/style_manager.js
var init_style_manager = __esm({
  "node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/style_manager.js"() {
    init_dom();
    init_environment();
  }
});

// node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/animations.js
var init_animations = __esm({
  "node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/animations.js"() {
    init_utils();
    init_environment();
    init_loop();
    init_style_manager();
  }
});

// node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/lifecycle.js
function set_current_component(component) {
  current_component = component;
}
var current_component;
var init_lifecycle = __esm({
  "node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/lifecycle.js"() {
    init_dom();
  }
});

// node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/scheduler.js
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function flush_render_callbacks(fns) {
  const filtered = [];
  const targets = [];
  render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
  targets.forEach((c) => c());
  render_callbacks = filtered;
}
var dirty_components, binding_callbacks, render_callbacks, flush_callbacks, resolved_promise, update_scheduled, seen_callbacks, flushidx;
var init_scheduler = __esm({
  "node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/scheduler.js"() {
    init_utils();
    init_lifecycle();
    dirty_components = [];
    binding_callbacks = [];
    render_callbacks = [];
    flush_callbacks = [];
    resolved_promise = /* @__PURE__ */ Promise.resolve();
    update_scheduled = false;
    seen_callbacks = /* @__PURE__ */ new Set();
    flushidx = 0;
  }
});

// node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/transitions.js
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
var outroing;
var init_transitions = __esm({
  "node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/transitions.js"() {
    init_utils();
    init_environment();
    init_loop();
    init_style_manager();
    init_dom();
    init_scheduler();
    outroing = /* @__PURE__ */ new Set();
  }
});

// node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/await_block.js
var init_await_block = __esm({
  "node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/await_block.js"() {
    init_utils();
    init_transitions();
    init_scheduler();
    init_lifecycle();
  }
});

// node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/each.js
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
var init_each = __esm({
  "node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/each.js"() {
    init_transitions();
    init_utils();
  }
});

// node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/spread.js
var init_spread = __esm({
  "node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/spread.js"() {
  }
});

// node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/shared/boolean_attributes.js
var _boolean_attributes, boolean_attributes;
var init_boolean_attributes = __esm({
  "node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/shared/boolean_attributes.js"() {
    _boolean_attributes = /** @type {const} */
    [
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "inert",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ];
    boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);
  }
});

// node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/shared/utils/names.js
var init_names = __esm({
  "node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/shared/utils/names.js"() {
  }
});

// node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/ssr.js
var init_ssr = __esm({
  "node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/ssr.js"() {
    init_lifecycle();
    init_utils();
    init_boolean_attributes();
    init_each();
    init_names();
  }
});

// node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/Component.js
function mount_component(component, target, anchor) {
  const { fragment, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  add_render_callback(() => {
    const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
    if (component.$$.on_destroy) {
      component.$$.on_destroy.push(...new_on_destroy);
    } else {
      run_all(new_on_destroy);
    }
    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    flush_render_callbacks($$.after_update);
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance2, create_fragment2, not_equal, props, append_styles = null, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: [],
    // state
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      start_hydrating();
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    end_hydrating();
    flush();
  }
  set_current_component(parent_component);
}
function get_custom_element_value(prop, value, props_definition, transform) {
  const type = props_definition[prop]?.type;
  value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
  if (!transform || !props_definition[prop]) {
    return value;
  } else if (transform === "toAttribute") {
    switch (type) {
      case "Object":
      case "Array":
        return value == null ? null : JSON.stringify(value);
      case "Boolean":
        return value ? "" : null;
      case "Number":
        return value == null ? null : value;
      default:
        return value;
    }
  } else {
    switch (type) {
      case "Object":
      case "Array":
        return value && JSON.parse(value);
      case "Boolean":
        return value;
      case "Number":
        return value != null ? +value : value;
      default:
        return value;
    }
  }
}
var SvelteElement, SvelteComponent;
var init_Component = __esm({
  "node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/Component.js"() {
    init_scheduler();
    init_lifecycle();
    init_utils();
    init_dom();
    init_transitions();
    if (typeof HTMLElement === "function") {
      SvelteElement = class extends HTMLElement {
        constructor($$componentCtor, $$slots, use_shadow_dom) {
          super();
          /** The Svelte component constructor */
          __publicField(this, "$$ctor");
          /** Slots */
          __publicField(this, "$$s");
          /** The Svelte component instance */
          __publicField(this, "$$c");
          /** Whether or not the custom element is connected */
          __publicField(this, "$$cn", false);
          /** Component props data */
          __publicField(this, "$$d", {});
          /** `true` if currently in the process of reflecting component props back to attributes */
          __publicField(this, "$$r", false);
          /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
          __publicField(this, "$$p_d", {});
          /** @type {Record<string, Function[]>} Event listeners */
          __publicField(this, "$$l", {});
          /** @type {Map<Function, Function>} Event listener unsubscribe functions */
          __publicField(this, "$$l_u", /* @__PURE__ */ new Map());
          this.$$ctor = $$componentCtor;
          this.$$s = $$slots;
          if (use_shadow_dom) {
            this.attachShadow({ mode: "open" });
          }
        }
        addEventListener(type, listener, options) {
          this.$$l[type] = this.$$l[type] || [];
          this.$$l[type].push(listener);
          if (this.$$c) {
            const unsub = this.$$c.$on(type, listener);
            this.$$l_u.set(listener, unsub);
          }
          super.addEventListener(type, listener, options);
        }
        removeEventListener(type, listener, options) {
          super.removeEventListener(type, listener, options);
          if (this.$$c) {
            const unsub = this.$$l_u.get(listener);
            if (unsub) {
              unsub();
              this.$$l_u.delete(listener);
            }
          }
        }
        async connectedCallback() {
          this.$$cn = true;
          if (!this.$$c) {
            let create_slot = function(name) {
              return () => {
                let node;
                const obj = {
                  c: function create() {
                    node = element("slot");
                    if (name !== "default") {
                      attr(node, "name", name);
                    }
                  },
                  /**
                   * @param {HTMLElement} target
                   * @param {HTMLElement} [anchor]
                   */
                  m: function mount(target, anchor) {
                    insert(target, node, anchor);
                  },
                  d: function destroy(detaching) {
                    if (detaching) {
                      detach(node);
                    }
                  }
                };
                return obj;
              };
            };
            await Promise.resolve();
            if (!this.$$cn) {
              return;
            }
            const $$slots = {};
            const existing_slots = get_custom_elements_slots(this);
            for (const name of this.$$s) {
              if (name in existing_slots) {
                $$slots[name] = [create_slot(name)];
              }
            }
            for (const attribute of this.attributes) {
              const name = this.$$g_p(attribute.name);
              if (!(name in this.$$d)) {
                this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
              }
            }
            this.$$c = new this.$$ctor({
              target: this.shadowRoot || this,
              props: {
                ...this.$$d,
                $$slots,
                $$scope: {
                  ctx: []
                }
              }
            });
            const reflect_attributes = () => {
              this.$$r = true;
              for (const key in this.$$p_d) {
                this.$$d[key] = this.$$c.$$.ctx[this.$$c.$$.props[key]];
                if (this.$$p_d[key].reflect) {
                  const attribute_value = get_custom_element_value(
                    key,
                    this.$$d[key],
                    this.$$p_d,
                    "toAttribute"
                  );
                  if (attribute_value == null) {
                    this.removeAttribute(this.$$p_d[key].attribute || key);
                  } else {
                    this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
                  }
                }
              }
              this.$$r = false;
            };
            this.$$c.$$.after_update.push(reflect_attributes);
            reflect_attributes();
            for (const type in this.$$l) {
              for (const listener of this.$$l[type]) {
                const unsub = this.$$c.$on(type, listener);
                this.$$l_u.set(listener, unsub);
              }
            }
            this.$$l = {};
          }
        }
        // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
        // and setting attributes through setAttribute etc, this is helpful
        attributeChangedCallback(attr2, _oldValue, newValue) {
          if (this.$$r)
            return;
          attr2 = this.$$g_p(attr2);
          this.$$d[attr2] = get_custom_element_value(attr2, newValue, this.$$p_d, "toProp");
          this.$$c?.$set({ [attr2]: this.$$d[attr2] });
        }
        disconnectedCallback() {
          this.$$cn = false;
          Promise.resolve().then(() => {
            if (!this.$$cn) {
              this.$$c.$destroy();
              this.$$c = void 0;
            }
          });
        }
        $$g_p(attribute_name) {
          return Object.keys(this.$$p_d).find(
            (key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name
          ) || attribute_name;
        }
      };
    }
    SvelteComponent = class {
      constructor() {
        /**
         * ### PRIVATE API
         *
         * Do not use, may change at any time
         *
         * @type {any}
         */
        __publicField(this, "$$");
        /**
         * ### PRIVATE API
         *
         * Do not use, may change at any time
         *
         * @type {any}
         */
        __publicField(this, "$$set");
      }
      /** @returns {void} */
      $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
      }
      /**
       * @template {Extract<keyof Events, string>} K
       * @param {K} type
       * @param {((e: Events[K]) => void) | null | undefined} callback
       * @returns {() => void}
       */
      $on(type, callback) {
        if (!is_function(callback)) {
          return noop;
        }
        const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
        callbacks.push(callback);
        return () => {
          const index = callbacks.indexOf(callback);
          if (index !== -1)
            callbacks.splice(index, 1);
        };
      }
      /**
       * @param {Partial<Props>} props
       * @returns {void}
       */
      $set(props) {
        if (this.$$set && !is_empty(props)) {
          this.$$.skip_bound = true;
          this.$$set(props);
          this.$$.skip_bound = false;
        }
      }
    };
  }
});

// node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/shared/version.js
var PUBLIC_VERSION;
var init_version = __esm({
  "node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/shared/version.js"() {
    PUBLIC_VERSION = "4";
  }
});

// node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/dev.js
var init_dev = __esm({
  "node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/dev.js"() {
    init_dom();
    init_Component();
    init_names();
    init_version();
    init_utils();
    init_each();
  }
});

// node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/index.js
var init_internal = __esm({
  "node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/index.js"() {
    init_animations();
    init_await_block();
    init_dom();
    init_environment();
    init_globals();
    init_each();
    init_lifecycle();
    init_loop();
    init_scheduler();
    init_spread();
    init_ssr();
    init_transitions();
    init_utils();
    init_Component();
    init_dev();
  }
});

// node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/disclose-version/index.js
var init_disclose_version = __esm({
  "node_modules/.pnpm/svelte@4.2.2/node_modules/svelte/src/runtime/internal/disclose-version/index.js"() {
    init_version();
    if (typeof window !== "undefined")
      (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);
  }
});

// src/blocks/Svelte-Header/svelteHeader.svelte
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[8] = list[i];
  child_ctx[10] = i;
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[11] = list[i];
  return child_ctx;
}
function get_each_context_2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[8] = list[i];
  child_ctx[10] = i;
  return child_ctx;
}
function get_each_context_3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[11] = list[i];
  return child_ctx;
}
function create_if_block_1(ctx) {
  let ul;
  let each_value_3 = ensure_array_like(
    /*menu*/
    ctx[8].children
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_3.length; i += 1) {
    each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
  }
  return {
    c() {
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(ul, "class", "absolute flex flex-col w-[200%] bg-white top-full z-10 right-0 border-black border");
    },
    m(target, anchor) {
      insert(target, ul, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(ul, null);
        }
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*menus*/
      4) {
        each_value_3 = ensure_array_like(
          /*menu*/
          ctx2[8].children
        );
        let i;
        for (i = 0; i < each_value_3.length; i += 1) {
          const child_ctx = get_each_context_3(ctx2, each_value_3, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_3(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(ul, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_3.length;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(ul);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block_3(ctx) {
  let li;
  let a;
  let t0_value = (
    /*submenu*/
    ctx[11].title + ""
  );
  let t0;
  let a_href_value;
  let t1;
  return {
    c() {
      li = element("li");
      a = element("a");
      t0 = text(t0_value);
      t1 = space();
      attr(a, "href", a_href_value = /*submenu*/
      ctx[11].href);
      attr(li, "class", "py-3 px-5 text-center");
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, a);
      append(a, t0);
      append(li, t1);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(li);
      }
    }
  };
}
function create_each_block_2(ctx) {
  let div;
  let button;
  let t1;
  let t2;
  let mounted;
  let dispose;
  function click_handler_1() {
    return (
      /*click_handler_1*/
      ctx[5](
        /*i*/
        ctx[10]
      )
    );
  }
  let if_block = (
    /*showSubmenu*/
    ctx[0] === /*i*/
    ctx[10] && create_if_block_1(ctx)
  );
  return {
    c() {
      div = element("div");
      button = element("button");
      button.textContent = `${/*menu*/
      ctx[8].title}`;
      t1 = space();
      if (if_block)
        if_block.c();
      t2 = space();
      attr(button, "class", "text-2xl");
      toggle_class(
        button,
        "underline",
        /*i*/
        ctx[10] === /*showSubmenu*/
        ctx[0]
      );
      attr(div, "class", "relative");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, button);
      append(div, t1);
      if (if_block)
        if_block.m(div, null);
      append(div, t2);
      if (!mounted) {
        dispose = listen(button, "click", click_handler_1);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*showSubmenu*/
      1) {
        toggle_class(
          button,
          "underline",
          /*i*/
          ctx[10] === /*showSubmenu*/
          ctx[0]
        );
      }
      if (
        /*showSubmenu*/
        ctx[0] === /*i*/
        ctx[10]
      ) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block_1(ctx);
          if_block.c();
          if_block.m(div, t2);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block)
        if_block.d();
      mounted = false;
      dispose();
    }
  };
}
function create_if_block(ctx) {
  let ul;
  let each_value_1 = ensure_array_like(
    /*menu*/
    ctx[8].children
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  return {
    c() {
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(ul, "class", "flex flex-col bg-white top-full right-0 border-black border");
    },
    m(target, anchor) {
      insert(target, ul, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(ul, null);
        }
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*menus*/
      4) {
        each_value_1 = ensure_array_like(
          /*menu*/
          ctx2[8].children
        );
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(ul, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_1.length;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(ul);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block_1(ctx) {
  let li;
  let a;
  let t0_value = (
    /*submenu*/
    ctx[11].title + ""
  );
  let t0;
  let a_href_value;
  let t1;
  return {
    c() {
      li = element("li");
      a = element("a");
      t0 = text(t0_value);
      t1 = space();
      attr(a, "href", a_href_value = /*submenu*/
      ctx[11].href);
      attr(li, "class", "py-3 px-3");
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, a);
      append(a, t0);
      append(li, t1);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(li);
      }
    }
  };
}
function create_each_block(ctx) {
  let div;
  let button;
  let t1;
  let t2;
  let mounted;
  let dispose;
  function click_handler_3() {
    return (
      /*click_handler_3*/
      ctx[7](
        /*i*/
        ctx[10]
      )
    );
  }
  let if_block = (
    /*showSubmenu*/
    ctx[0] === /*i*/
    ctx[10] && create_if_block(ctx)
  );
  return {
    c() {
      div = element("div");
      button = element("button");
      button.textContent = `${/*menu*/
      ctx[8].title}`;
      t1 = space();
      if (if_block)
        if_block.c();
      t2 = space();
      attr(button, "class", "text-2xl");
      toggle_class(
        button,
        "underline",
        /*i*/
        ctx[10] === /*showSubmenu*/
        ctx[0]
      );
      attr(div, "class", "my-2");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, button);
      append(div, t1);
      if (if_block)
        if_block.m(div, null);
      append(div, t2);
      if (!mounted) {
        dispose = listen(button, "click", click_handler_3);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*showSubmenu*/
      1) {
        toggle_class(
          button,
          "underline",
          /*i*/
          ctx[10] === /*showSubmenu*/
          ctx[0]
        );
      }
      if (
        /*showSubmenu*/
        ctx[0] === /*i*/
        ctx[10]
      ) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          if_block.m(div, t2);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block)
        if_block.d();
      mounted = false;
      dispose();
    }
  };
}
function create_fragment(ctx) {
  let nav;
  let div0;
  let a;
  let t1;
  let div1;
  let button0;
  let t3;
  let div2;
  let t4;
  let div3;
  let button1;
  let t6;
  let mounted;
  let dispose;
  let each_value_2 = ensure_array_like(
    /*menus*/
    ctx[2]
  );
  let each_blocks_1 = [];
  for (let i = 0; i < each_value_2.length; i += 1) {
    each_blocks_1[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }
  let each_value = ensure_array_like(
    /*menus*/
    ctx[2]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      nav = element("nav");
      div0 = element("div");
      a = element("a");
      a.textContent = `${logo}`;
      t1 = space();
      div1 = element("div");
      button0 = element("button");
      button0.textContent = "Menu";
      t3 = space();
      div2 = element("div");
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }
      t4 = space();
      div3 = element("div");
      button1 = element("button");
      button1.textContent = "close";
      t6 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(a, "href", "/");
      attr(a, "class", "lg:text-4xl text-2xl");
      attr(button0, "class", "md:hidden");
      attr(div2, "class", "hidden md:flex-row md:justify-between lg:w-1/3 md:w-1/2 md:items-baseline md:flex relative");
      attr(div3, "class", "md:hidden p-2 fixed top-100 right-0 bg-white h-screen z-20 w-[75vw]");
      toggle_class(div3, "hidden", !/*showMobileDrawer*/
      ctx[1]);
      attr(nav, "class", "w-full flex flex-row justify-between items-baseline");
    },
    m(target, anchor) {
      insert(target, nav, anchor);
      append(nav, div0);
      append(div0, a);
      append(nav, t1);
      append(nav, div1);
      append(div1, button0);
      append(nav, t3);
      append(nav, div2);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        if (each_blocks_1[i]) {
          each_blocks_1[i].m(div2, null);
        }
      }
      append(nav, t4);
      append(nav, div3);
      append(div3, button1);
      append(div3, t6);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div3, null);
        }
      }
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*click_handler*/
            ctx[4]
          ),
          listen(
            button1,
            "click",
            /*click_handler_2*/
            ctx[6]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*menus, showSubmenu, handleDropdownClick*/
      13) {
        each_value_2 = ensure_array_like(
          /*menus*/
          ctx2[2]
        );
        let i;
        for (i = 0; i < each_value_2.length; i += 1) {
          const child_ctx = get_each_context_2(ctx2, each_value_2, i);
          if (each_blocks_1[i]) {
            each_blocks_1[i].p(child_ctx, dirty);
          } else {
            each_blocks_1[i] = create_each_block_2(child_ctx);
            each_blocks_1[i].c();
            each_blocks_1[i].m(div2, null);
          }
        }
        for (; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].d(1);
        }
        each_blocks_1.length = each_value_2.length;
      }
      if (dirty & /*menus, showSubmenu, handleDropdownClick*/
      13) {
        each_value = ensure_array_like(
          /*menus*/
          ctx2[2]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div3, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (dirty & /*showMobileDrawer*/
      2) {
        toggle_class(div3, "hidden", !/*showMobileDrawer*/
        ctx2[1]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(nav);
      }
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let menus = [
    {
      title: "Examples",
      children: [{ title: "More examples", href: "/" }]
    },
    {
      title: "Learn more",
      children: [
        { title: "Learning more", href: "/" },
        { title: "Perfect scores", href: "/" }
      ]
    },
    {
      title: "Why Rehydrated?",
      children: [
        {
          title: "Supports perfect hydration",
          href: "/"
        },
        { title: "CSS made simple", href: "/" },
        { title: "Bring your framework", href: "/" }
      ]
    }
  ];
  let showSubmenu = -1;
  let showMobileDrawer = false;
  function handleDropdownClick(i) {
    if (showSubmenu === i) {
      $$invalidate(0, showSubmenu = -1);
    } else {
      $$invalidate(0, showSubmenu = i);
    }
  }
  const click_handler = () => {
    $$invalidate(1, showMobileDrawer = !showMobileDrawer);
  };
  const click_handler_1 = (i) => {
    handleDropdownClick(i);
  };
  const click_handler_2 = () => {
    $$invalidate(1, showMobileDrawer = !showMobileDrawer);
  };
  const click_handler_3 = (i) => {
    handleDropdownClick(i);
  };
  return [
    showSubmenu,
    showMobileDrawer,
    menus,
    handleDropdownClick,
    click_handler,
    click_handler_1,
    click_handler_2,
    click_handler_3
  ];
}
var logo, SvelteHeader, svelteHeader_default;
var init_svelteHeader = __esm({
  "src/blocks/Svelte-Header/svelteHeader.svelte"() {
    init_internal();
    init_disclose_version();
    logo = "Rehydrated";
    SvelteHeader = class extends SvelteComponent {
      constructor(options) {
        super();
        init(this, options, instance, create_fragment, safe_not_equal, {});
      }
    };
    svelteHeader_default = SvelteHeader;
  }
});

// src/blocks/Svelte-Header/Header.js
var Header_exports = {};
__export(Header_exports, {
  header: () => header
});
var header;
var init_Header = __esm({
  "src/blocks/Svelte-Header/Header.js"() {
    init_svelteHeader();
    header = new svelteHeader_default({ target: document.querySelector("header") });
  }
});

// src/blocks/Hero/hero.html
var hero_default;
var init_hero = __esm({
  "src/blocks/Hero/hero.html"() {
    hero_default = '<div class="hero flex flex-col justify-center items-center relative mb-8">\n  <div class="image-wrapper">${img}</div>\n  <div class="hero-content text-center z-10 px-4 py-8 absolute w-full">\n    <h1 class="text-white text-4xl font-bold mb-4">${title}</h1>\n  </div>\n</div>\n';
  }
});

// src/utils.js
var utils_exports = {};
__export(utils_exports, {
  applyMetaData: () => applyMetaData,
  fromManyMakeSingle: () => fromManyMakeSingle,
  gather: () => gather,
  getData: () => getData,
  makeMany: () => makeMany,
  makeSingle: () => makeSingle,
  registerFunction: () => registerFunction,
  renderTemplate: () => renderTemplate,
  swapNode: () => swapNode
});
function getData(node, selector, prop) {
  prop = prop || "textContent";
  const el = node.querySelector(selector);
  return el ? el[prop] : "";
}
function gather(node, selector) {
  return [...node.querySelectorAll(`:scope ${selector}`)];
}
var swapNode, renderTemplate, makeMany, makeSingle, fromManyMakeSingle, applyMetaData, hydrationRegister, registerFunction;
var init_utils2 = __esm({
  "src/utils.js"() {
    swapNode = (node, swapper, tag) => {
      const element2 = document.createElement(tag || "div");
      element2.className = node.className;
      element2.innerHTML = swapper;
      node.replaceWith(element2);
      element2.dataset.rendered = true;
    };
    renderTemplate = (template, data) => {
      let render = template;
      for (let key in data) {
        render = render.replace(new RegExp(`\\$\\{${key}\\}`, "g"), data[key]);
      }
      return render;
    };
    makeMany = (node, template, data, tag) => {
      tag = tag || "div";
      return swapNode(
        node,
        gather(node, ` > ${tag}`).map((i) => renderTemplate(template, data(i))).join(""),
        tag
      );
    };
    makeSingle = (node, template, data, tag) => {
      tag = tag || "div";
      return swapNode(node, renderTemplate(template, data(node)), tag);
    };
    fromManyMakeSingle = (nodes, template, data) => {
      const html = renderTemplate(template, data(nodes));
      nodes.forEach((node, i) => {
        if (i === 0)
          return;
        node.remove();
      });
      nodes[0].outerHTML = html;
      nodes[0].dataset.rendered = true;
      return nodes[0];
    };
    applyMetaData = (node) => {
      const parent = node.parentElement;
      for (const block of [...node.children]) {
        const key = block.children[0].innerText;
        const val = block.children[1].innerText;
        switch (key.toLowerCase()) {
          case "style":
            parent.classList.add(val);
            break;
          default:
            console.error(`Unhandled metadata: KEY: ${key}, VAL: ${val}`);
        }
      }
      node.remove();
    };
    hydrationRegister = /* @__PURE__ */ new Map();
    registerFunction = async (func) => {
      if (hydrationRegister.get(func.name)) {
        return;
      }
      hydrationRegister.set(func.name, func);
    };
  }
});

// src/blocks/Hero/Hero.js
var Hero_exports = {};
__export(Hero_exports, {
  Hero: () => Hero
});
var Hero;
var init_Hero = __esm({
  "src/blocks/Hero/Hero.js"() {
    init_hero();
    init_utils2();
    Hero = (node) => {
      const title = node.nextElementSibling;
      const picture = node.querySelector(":scope > picture");
      if (picture.lastElementChild.hasAttribute("loading") && picture.lastElementChild.getAttribute("loading") === "lazy") {
        picture.lastElementChild.setAttribute("loading", "eager");
      }
      return fromManyMakeSingle([node, title, picture], hero_default, (nodes) => ({
        title: nodes[1].textContent,
        id: nodes[1].id,
        img: nodes[2].outerHTML
      }));
    };
  }
});

// src/blocks/Cards/card.html
var card_default;
var init_card = __esm({
  "src/blocks/Cards/card.html"() {
    card_default = '<div class="card bg-white overflow-hidden shadow rounded-lg flex flex-col justify-center items-center">\n  <div class="image-wrapper h-full">\n    ${img}\n  </div>\n  <div class="card-content px-4 py-8">\n    <h3 class="text-2xl font-bold mb-4">${title}</h3>\n    <p>${description}</p>\n  </div>\n</div>';
  }
});

// src/blocks/Cards/Cards.js
var Cards_exports = {};
__export(Cards_exports, {
  Cards: () => Cards
});
var Cards;
var init_Cards = __esm({
  "src/blocks/Cards/Cards.js"() {
    init_card();
    init_utils2();
    Cards = (node) => {
      const Card = (card) => ({
        title: getData(card, "p:nth-of-type(1)"),
        description: getData(card, "p:nth-of-type(2)"),
        img: card.querySelector("picture").outerHTML
      });
      return makeMany(node, card_default, Card);
    };
  }
});

// src/blocks/Columns/column.html
var column_default;
var init_column = __esm({
  "src/blocks/Columns/column.html"() {
    column_default = '<div class="column">\n  ${content}\n</div>';
  }
});

// src/blocks/Columns/Columns.js
var Columns_exports = {};
__export(Columns_exports, {
  Columns: () => Columns
});
var Columns;
var init_Columns = __esm({
  "src/blocks/Columns/Columns.js"() {
    init_utils2();
    init_column();
    Columns = (node) => {
      return makeMany(node, column_default, (col) => ({
        content: col.innerHTML
      }));
    };
  }
});

// src/blocks/getHTML.js
async function getHTML(path) {
  const res = await fetch(path);
  if (res.ok) {
    return await res.text();
  }
}
var init_getHTML = __esm({
  "src/blocks/getHTML.js"() {
  }
});

// src/blocks/Footer/Footer.js
var Footer_exports = {};
__export(Footer_exports, {
  Footer: () => Footer
});
var Footer;
var init_Footer = __esm({
  "src/blocks/Footer/Footer.js"() {
    init_utils2();
    init_getHTML();
    Footer = async (node) => {
      const html = await getHTML("/footer.plain.html");
      swapNode(node, html, "footer");
    };
  }
});

// src/rehydrated.js
document.querySelector("html").lang = "en";
async function hydratePage() {
  const observer = new MutationObserver(async (mutations) => {
    for (let mutation of mutations) {
      for (let node of mutation.addedNodes) {
        if (!(node instanceof HTMLElement))
          continue;
        if (node.matches("main") && !node.dataset.rendered) {
          const { Main: Main2 } = await Promise.resolve().then(() => (init_Main(), Main_exports));
          Main2(node);
        }
        if (node.matches("header") && !node.dataset.rendered) {
          const { header: header2 } = await Promise.resolve().then(() => (init_Header(), Header_exports));
          node.dataset.rendered = "true";
        }
        if (node.matches("main > div:first-child > p:first-child") && !node.dataset.rendered) {
          const { Hero: Hero2 } = await Promise.resolve().then(() => (init_Hero(), Hero_exports));
          Hero2(node);
        }
        if (node.matches(".cards") && !node.dataset.rendered) {
          const { Cards: Cards2 } = await Promise.resolve().then(() => (init_Cards(), Cards_exports));
          Cards2(node);
        }
        if (node.matches(".columns") && !node.dataset.rendered) {
          const { Columns: Columns2 } = await Promise.resolve().then(() => (init_Columns(), Columns_exports));
          Columns2(node);
        }
        if (node.matches("footer") && !node.dataset.rendered) {
          const { Footer: Footer2 } = await Promise.resolve().then(() => (init_Footer(), Footer_exports));
          Footer2(node);
        }
        if (node.matches(".section-metadata")) {
          const { applyMetaData: applyMetaData2 } = await Promise.resolve().then(() => (init_utils2(), utils_exports));
          applyMetaData2(node);
        }
        if (node.childNodes.length === 0 && node instanceof HTMLDivElement) {
          console.log("EMPTY NODES REMOVED");
          node.remove();
        }
      }
    }
  });
  observer.observe(document, { childList: true, subtree: true });
}
hydratePage();

// src/RUM.js
function sampleRUM(checkpoint, data = {}) {
  sampleRUM.defer = sampleRUM.defer || [];
  const defer = (fnname) => {
    sampleRUM[fnname] = sampleRUM[fnname] || ((...args) => sampleRUM.defer.push({ fnname, args }));
  };
  sampleRUM.drain = sampleRUM.drain || ((dfnname, fn) => {
    sampleRUM[dfnname] = fn;
    sampleRUM.defer.filter(({ fnname }) => dfnname === fnname).forEach(({ fnname, args }) => sampleRUM[fnname](...args));
  });
  sampleRUM.always = sampleRUM.always || [];
  sampleRUM.always.on = (chkpnt, fn) => {
    sampleRUM.always[chkpnt] = fn;
  };
  sampleRUM.on = (chkpnt, fn) => {
    sampleRUM.cases[chkpnt] = fn;
  };
  defer("observe");
  defer("cwv");
  try {
    window.hlx = window.hlx || {};
    if (!window.hlx.rum) {
      const usp = new URLSearchParams(window.location.search);
      const weight2 = usp.get("rum") === "on" ? 1 : 100;
      const id2 = Array.from(
        { length: 75 },
        (_, i) => String.fromCharCode(48 + i)
      ).filter((a) => /\d|[A-Z]/i.test(a)).filter(() => Math.random() * 75 > 70).join("");
      const random = Math.random();
      const isSelected = random * weight2 < 1;
      const firstReadTime2 = Date.now();
      const urlSanitizers = {
        full: () => window.location.href,
        origin: () => window.location.origin,
        path: () => window.location.href.replace(/\?.*$/, "")
      };
      window.hlx.rum = {
        weight: weight2,
        id: id2,
        random,
        isSelected,
        firstReadTime: firstReadTime2,
        sampleRUM,
        sanitizeURL: urlSanitizers[window.hlx.RUM_MASK_URL || "path"]
      };
    }
    const { weight, id, firstReadTime } = window.hlx.rum;
    if (window.hlx && window.hlx.rum && window.hlx.rum.isSelected) {
      const knownProperties = [
        "weight",
        "id",
        "referer",
        "checkpoint",
        "t",
        "source",
        "target",
        "cwv",
        "CLS",
        "FID",
        "LCP",
        "INP"
      ];
      const sendPing = (pdata = data) => {
        const body = JSON.stringify(
          {
            weight,
            id,
            referer: window.hlx.rum.sanitizeURL(),
            checkpoint,
            t: Date.now() - firstReadTime,
            ...data
          },
          knownProperties
        );
        const url = `https://rum.hlx.page/.rum/${weight}`;
        navigator.sendBeacon(url, body);
        console.debug(`ping:${checkpoint}`, pdata);
      };
      sampleRUM.cases = sampleRUM.cases || {
        cwv: () => sampleRUM.cwv(data) || true,
        lazy: () => {
          const script = document.createElement("script");
          script.src = "https://rum.hlx.page/.rum/@adobe/helix-rum-enhancer@^1/src/index.js";
          document.head.appendChild(script);
          return true;
        }
      };
      sendPing(data);
      if (sampleRUM.cases[checkpoint]) {
        sampleRUM.cases[checkpoint]();
      }
    }
    if (sampleRUM.always[checkpoint]) {
      sampleRUM.always[checkpoint](data);
    }
  } catch (error) {
  }
}
function setup() {
  window.hlx = window.hlx || {};
  window.hlx.RUM_MASK_URL = "full";
  window.hlx.codeBasePath = "";
  window.hlx.lighthouse = new URLSearchParams(window.location.search).get("lighthouse") === "on";
}
function init2() {
  setup();
  sampleRUM("top");
  window.addEventListener("load", () => sampleRUM("load"));
  window.addEventListener("unhandledrejection", (event) => {
    sampleRUM("error", {
      source: event.reason.sourceURL,
      target: event.reason.line
    });
  });
  window.addEventListener("error", (event) => {
    sampleRUM("error", { source: event.filename, target: event.lineno });
  });
}
init2();
//# sourceMappingURL=index.js.map
