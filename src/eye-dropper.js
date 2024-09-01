// @ts-check

/**
 * Represents a value that may be of type T, or null.
 *
 * @template T
 * @typedef {T | null} Nullable
 */

const styles = /* css */ `
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host([hidden]),
  [hidden],
  ::slotted([hidden]) {
    display: none !important;
  }
`;

const template = document.createElement('template');

template.innerHTML = /* html */ `
  <style>${styles}</style>
  <slot name="button">
    <button type="button" part="button">
      <slot name="button-label">Pick color</slot>
    </button>
  </slot>
`;

/**
 * @summary A custom element that implements the EyeDropper API that allows the user to select colors from the screen.
 * @documentation https://github.com/georapbox/eye-dropper-element#readme
 *
 * @tagname eye-dropper - This is the default tag name, unless overridden by the `defineCustomElement` method.
 *
 * @property {boolean} disabled - Whether the element is disabled.
 * @property {boolean} copy - Whether the picked color should be copied to the clipboard.
 *
 * @attribute {boolean} disabled - Reflects the disabled property.
 * @attribute {boolean} copy - Reflects the copy property.
 *
 * @slot button - The slot for the button element.
 * @slot button-label - The slot for the button label.
 *
 * @csspart button - The button element.
 * @csspart button--disabled - The button element when disabled.
 *
 * @event eye-dropper:success - Dispatched when the color is successfully picked.
 * @event eye-dropper:abort - Dispatched when the eye dropper is aborted.
 * @event eye-dropper:error - Dispatched when an error occurs.
 * @event eye-dropper:copy - Dispatched when the picked color is copied to the clipboard.
 *
 * @method defineCustomElement - Static method. Defines the custom element with the given name.
 */
class EyeDropperElement extends HTMLElement {
  /** @type {string[]} */
  #colors = [];

  constructor() {
    super();

    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  static get observedAttributes() {
    return ['disabled'];
  }

  /**
   * Lifecycle method that is called when attributes are changed, added, removed, or replaced.
   *
   * @param {string} name - The name of the attribute.
   * @param {string} oldValue - The old value of the attribute.
   * @param {string} newValue - The new value of the attribute.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'disabled' && oldValue !== newValue) {
      const button = this.#getButton();

      if (button) {
        if (button instanceof HTMLButtonElement) {
          button.disabled = this.disabled;
        }

        button.setAttribute('aria-disabled', this.disabled.toString());

        if (button.part && button.part.contains('button')) {
          button.part.toggle('button--disabled', this.disabled);
        }
      }
    }
  }

  /**
   * @type {boolean} - Whether the element is disabled.
   * @default false
   * @attribute {boolean} disabled - Reflects the disabled property.
   */
  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    this.toggleAttribute('disabled', !!value);
  }

  /**
   * @type {boolean} - Whether the picked color should be copied to the clipboard.
   * @default false
   * @attribute {boolean} copy - Reflects the copy property.
   */
  get copy() {
    return this.hasAttribute('copy');
  }

  set copy(value) {
    this.toggleAttribute('copy', !!value);
  }

  /**
   * Lifecycle method that is called when the element is added to the DOM.
   */
  connectedCallback() {
    this.#upgradeProperty('disabled');
    this.#upgradeProperty('copy');

    const buttonSlot = this.#getButtonSlot();
    const button = this.#getButton();

    buttonSlot?.addEventListener('slotchange', this.#handleSlotChange);
    button?.addEventListener('click', this.#handleClick);
  }

  /**
   * Lifecycle method that is called when the element is removed from the DOM.
   */
  disconnectedCallback() {
    const buttonSlot = this.#getButtonSlot();
    const button = this.#getButton();

    buttonSlot?.removeEventListener('slotchange', this.#handleSlotChange);
    button?.removeEventListener('click', this.#handleClick);
  }

  /**
   * Handles the click event.
   *
   * @param {Event} evt - The event object.
   */
  #handleClick = async evt => {
    evt.preventDefault();

    if (!('EyeDropper' in window) || this.disabled) {
      this.dispatchEvent(
        new CustomEvent('eye-dropper:error', {
          bubbles: true,
          composed: true,
          detail: { error: new Error('The EyeDropper API is not supported by the browser.') }
        })
      );

      return;
    }

    // @ts-expect-error: EyeDropper is experimental and might not be available in all browsers.
    const eyeDropper = new window.EyeDropper();

    let result;

    try {
      result = await eyeDropper.open();

      if (!this.#colors.includes(result.sRGBHex)) {
        this.#colors.push(result.sRGBHex);
      }

      this.dispatchEvent(
        new CustomEvent('eye-dropper:success', {
          bubbles: true,
          composed: true,
          detail: {
            result,
            colors: this.#colors
          }
        })
      );

      if (this.copy) {
        try {
          await navigator.clipboard.writeText(result.sRGBHex);

          this.dispatchEvent(
            new CustomEvent('eye-dropper:copy', {
              bubbles: true,
              composed: true,
              detail: {
                value: result.sRGBHex
              }
            })
          );
        } catch {
          // Fail silently...
        }
      }
    } catch (/** @type {any} */ error) {
      if (error.name === 'AbortError') {
        this.dispatchEvent(
          new Event('eye-dropper:abort', {
            bubbles: true,
            composed: true
          })
        );
      } else {
        this.dispatchEvent(
          new CustomEvent('eye-dropper:error', {
            bubbles: true,
            composed: true,
            detail: { error }
          })
        );
      }
    }
  };

  /**
   * Handles the slot change event.
   *
   * @param {Event} evt - The event object.
   */
  #handleSlotChange = evt => {
    const target = evt.target;

    if (target instanceof HTMLSlotElement && target.name === 'button') {
      const button = this.#getButton();

      if (button) {
        button.removeEventListener('click', this.#handleClick);
        button.addEventListener('click', this.#handleClick);

        if (button.nodeName !== 'BUTTON' && !button.hasAttribute('role')) {
          button.setAttribute('role', 'button');
        }
      }
    }
  };

  /**
   * Gets the button slot element.
   *
   * @returns {HTMLSlotElement | null} - The button slot element.
   */
  #getButtonSlot() {
    return this.shadowRoot?.querySelector('slot[name="button"]') ?? null;
  }

  /**
   * Gets the button element.
   *
   * @returns {Element | null} - The button element.
   */
  #getButton() {
    const buttonSlot = this.#getButtonSlot();

    if (!buttonSlot) {
      return null;
    }

    return (
      buttonSlot.assignedElements({ flatten: true }).find(el => {
        return el.nodeName === 'BUTTON' || el.getAttribute('slot') === 'button';
      }) ?? null
    );
  }

  /**
   * This is to safe guard against cases where, for instance, a framework may have added the element to the page and set a
   * value on one of its properties, but lazy loaded its definition. Without this guard, the upgraded element would miss that
   * property and the instance property would prevent the class property setter from ever being called.
   *
   * https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
   *
   * @param { 'disabled' | 'copy'} prop - The property name to upgrade.
   */
  #upgradeProperty(prop) {
    /** @type {any} */
    const instance = this;

    if (Object.prototype.hasOwnProperty.call(instance, prop)) {
      const value = instance[prop];
      delete instance[prop];
      instance[prop] = value;
    }
  }

  /**
   * Defines a custom element with the given name.
   * The name must contain a dash (-).
   *
   * @param {string} [elementName='eye-dropper'] - The name of the custom element.
   * @example
   *
   * EyeDropperElement.defineCustomElement('my-eye-dropper');
   */
  static defineCustomElement(elementName = 'eye-dropper') {
    if (typeof window !== 'undefined' && !window.customElements.get(elementName)) {
      window.customElements.define(elementName, EyeDropperElement);
    }
  }
}

export { EyeDropperElement };
