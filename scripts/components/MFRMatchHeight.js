/*
 * MFRMatchHeight — equalises heights of all matching elements inside a wrapper.
 *
 * Usage (on the wrapper element):
 *   x-data='MFRMatchHeight(".product-card__description")'
 *
 * Load the script in the section/block liquid:
 *   {%- render "script__section", file: "MFRMatchHeight.js" -%}
 *
 * The selector is any valid CSS selector scoped to the wrapper's subtree.
 * Heights are re-matched automatically on every wrapper resize.
 */

window._mfrAlpineRegistered = window._mfrAlpineRegistered || {};

if (!window._mfrAlpineRegistered["MFRMatchHeight"]) {
  document.addEventListener("alpine:init", () => {
    Alpine.data("MFRMatchHeight", (selector) => ({
      resizeObserver: null,
      debounceTimer: null,

      init() {
        this.match();
        this.resizeObserver = new ResizeObserver(() => this.debouncedMatch());
        this.resizeObserver.observe(this.$el);
      },

      destroy() {
        if (this.resizeObserver) this.resizeObserver.disconnect();
        clearTimeout(this.debounceTimer);
      },

      debouncedMatch() {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => this.match(), 100);
      },

      match() {
        const els = Array.from(this.$el.querySelectorAll(selector));
        if (!els.length) return;

        els.forEach((el) => (el.style.height = ""));

        const max = Math.max(...els.map((el) => el.offsetHeight));
        if (max > 0) els.forEach((el) => (el.style.height = max + "px"));
      },
    }));
  });

  window._mfrAlpineRegistered["MFRMatchHeight"] = true;
}
