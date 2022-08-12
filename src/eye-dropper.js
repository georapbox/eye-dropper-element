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
  constructor() {
    super();

    this._colors = [];

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this._onClick = this._onClick.bind(this);
    this._onSlotChange = this._onSlotChange.bind(this);
  }

  static get observedAttributes() {
    return ['disabled'];
  }

  attributeChangedCallback(name) {
    if (name === 'disabled') {
      const button = this._getButton();

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

    const buttonSlot = this._getButtonSlot();
    const button = this._getButton();

    buttonSlot && buttonSlot.addEventListener('slotchange', this._onSlotChange);
    button && button.addEventListener('click', this._onClick);

    this._upgradeProperty('disabled');
  }

  disconnectedCallback() {
    const buttonSlot = this._getButtonSlot();
    const button = this._getButton();

    buttonSlot && buttonSlot.removeEventListener('slotchange', this._onSlotChange);
    button && button.removeEventListener('click', this._onClick);
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

  async _onClick(evt) {
    evt.preventDefault();

    if (!window.EyeDropper || this.disabled) {
      return;
    }

    const eyeDropper = new window.EyeDropper();

    let result;

    try {
      result = await eyeDropper.open();

      if (!this._colors.includes(result.sRGBHex)) {
        this._colors.push(result.sRGBHex);
      }

      this.dispatchEvent(new CustomEvent('eye-dropper:success', {
        bubbles: true,
        composed: true,
        detail: {
          result,
          colors: this._colors
        }
      }));
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
  }

  _onSlotChange(evt) {
    if (evt.target && evt.target.name === 'button') {
      const button = this._getButton();

      if (button) {
        button.removeEventListener('click', this._onClick);
        button.addEventListener('click', this._onClick);

        if (button.nodeName !== 'BUTTON' && !button.hasAttribute('role')) {
          button.setAttribute('role', 'button');
        }
      }
    }
  }

  _getButtonSlot() {
    return this.shadowRoot.querySelector('slot[name="button"]');
  }

  _getButton() {
    const buttonSlot = this._getButtonSlot();

    if (!buttonSlot) {
      return null;
    }

    return buttonSlot.assignedElements({ flatten: true }).find(el => {
      return el.nodeName === 'BUTTON' || el.getAttribute('slot') === 'button';
    });
  }

  _upgradeProperty(prop) {
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
