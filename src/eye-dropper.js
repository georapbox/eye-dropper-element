const template = document.createElement('template');

template.innerHTML = /* html */`
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }
    :host([hidden]) {
      display: none !important;
    }
  </style>

  <slot name="button">
    <button type="button" part="button">
      <slot name="button-label">Pick color</slot>
    </button>
  </slot>
`;

class EyeDropperElement extends HTMLElement {
  #colors = [];

  constructor() {
    super();

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  static get observedAttributes() {
    return ['disabled'];
  }

  attributeChangedCallback(name) {
    if (name === 'disabled') {
      const button = this.#getButton();

      button.disabled = this.disabled;
      button.setAttribute('aria-disabled', this.disabled);

      if (button.part && button.part.contains('button')) {
        button.part.toggle('button--disabled', this.disabled);
      }
    }
  }

  connectedCallback() {
    if (!window.EyeDropper) {
      this.hidden = true;
    }

    const buttonSlot = this.#getButtonSlot();
    const button = this.#getButton();

    buttonSlot && buttonSlot.addEventListener('slotchange', this.#onSlotChange);
    button && button.addEventListener('click', this.#onClick);

    this.#upgradeProperty('disabled');
  }

  disconnectedCallback() {
    const buttonSlot = this.#getButtonSlot();
    const button = this.#getButton();

    buttonSlot && buttonSlot.removeEventListener('slotchange', this.#onSlotChange);
    button && button.removeEventListener('click', this.#onClick);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get copy() {
    return this.hasAttribute('copy');
  }

  set copy(value) {
    if (value) {
      this.setAttribute('copy', '');
    } else {
      this.removeAttribute('copy');
    }
  }

  #onClick = async evt => {
    evt.preventDefault();

    if (!window.EyeDropper || this.disabled) {
      return;
    }

    const eyeDropper = new window.EyeDropper();

    let result;

    try {
      result = await eyeDropper.open();

      if (!this.#colors.includes(result.sRGBHex)) {
        this.#colors.push(result.sRGBHex);
      }

      this.dispatchEvent(new CustomEvent('eye-dropper:success', {
        bubbles: true,
        composed: true,
        detail: {
          result,
          colors: this.#colors
        }
      }));

      if (this.copy) {
        try {
          await navigator.clipboard.writeText(result.sRGBHex);

          this.dispatchEvent(new CustomEvent('eye-dropper:copy', {
            bubbles: true,
            composed: true,
            detail: {
              value: result.sRGBHex
            }
          }));
        } catch {
          // Fail silently...
        }
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        this.dispatchEvent(new Event('eye-dropper:abort', {
          bubbles: true,
          composed: true
        }));
      } else {
        this.dispatchEvent(new CustomEvent('eye-dropper:error', {
          bubbles: true,
          composed: true,
          detail: { error }
        }));
      }
    }
  };

  #onSlotChange = evt => {
    if (evt.target && evt.target.name === 'button') {
      const button = this.#getButton();

      if (button) {
        button.removeEventListener('click', this.#onClick);
        button.addEventListener('click', this.#onClick);

        if (button.nodeName !== 'BUTTON' && !button.hasAttribute('role')) {
          button.setAttribute('role', 'button');
        }
      }
    }
  };

  #getButtonSlot() {
    return this.shadowRoot.querySelector('slot[name="button"]');
  }

  #getButton() {
    const buttonSlot = this.#getButtonSlot();

    if (!buttonSlot) {
      return null;
    }

    return buttonSlot.assignedElements({ flatten: true }).find(el => {
      return el.nodeName === 'BUTTON' || el.getAttribute('slot') === 'button';
    });
  }

  #upgradeProperty(prop) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = this[prop];
      console.log(prop);
      delete this[prop];
      this[prop] = value;
    }
  }

  static defineCustomElement(elementName = 'eye-dropper') {
    if (typeof window !== 'undefined' && !window.customElements.get(elementName)) {
      window.customElements.define(elementName, EyeDropperElement);
    }
  }
}

export { EyeDropperElement };
