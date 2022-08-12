[![npm version](https://img.shields.io/npm/v/@georapbox/eye-dropper-element.svg)](https://www.npmjs.com/package/@georapbox/eye-dropper-element)
[![npm license](https://img.shields.io/npm/l/@georapbox/eye-dropper-element.svg)](https://www.npmjs.com/package/@georapbox/eye-dropper-element)

[demo]: https://georapbox.github.io/eye-dropper-element/
[support]: https://caniuse.com/#feat=custom-elementsv1
[polyfill]: https://github.com/webcomponents/polyfills/tree/master/packages/custom-elements
[license]: https://georapbox.mit-license.org/@2022
[changelog]: https://github.com/georapbox/eye-dropper-element/blob/main/CHANGELOG.md

# &lt;eye-dropper&gt;

A custom element that implements the [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper) that allows the user to select colors from the screen.

> NOTE: The EyeDropper API is still experimental and supported only on Chromium based browsers. In not supported browsers, the color picker button is not displayed at all.

[API documentation](#api) &bull; [Demo][demo]

## Install

```sh
$ npm install --save @georapbox/eye-dropper-element
```

## Usage

### Script

```js
import { EyeDropperElement } from './node_modules/@georapbox/eye-dropper-element/dist/eye-dropper.min.js';

// Manually define the element.
EyeDropperElement.defineCustomElement();
```

Alternatively, you can import the automatically defined custom element.

```js
import './node_modules/@georapbox/eye-dropper-element/dist/eye-dropper-defined.min.js';
```

### Markup

```html
<eye-dropper></eye-dropper>
```

## API

### Properties
| Name | Reflects | Type | Default | Description |
| ---- | -------- | ---- | ------- | ----------- |
| `disabled` | ✓ | Boolean | `false` | Optional. Defines if the color picker button is disabled. |

### Slots

| Name | Description |
| ---- | ----------- |
| `button` | Override the color picker button with another element of your preference. Example: `<a href="#" slot="button" role="button">Pick a color</a>` |
| `button-label` | Override the color picker button's label with content of your preference. Example: `<span slot="button-label">Pick a color</span>` |

### CSS Parts

| Name | Description |
| ---- | ----------- |
| `button` | The color picker button. |
| `button--disabled` | The color picker button when is disabled. |

### Methods

| Name | Type | Description | Arguments |
| ---- | ---- | ----------- | --------- |
| `defineCustomElement` | Static | Defines/registers the custom element with the name provided. If no name is provided, the default name is used. The method checks if the element is already defined, hence will skip trying to redefine it. | `elementName='eye-dropper'` |

### Events

| Name | Description | Event Detail |
| ---- | ----------- | ------------ |
| `eye-dropper:success` | Emitted when color pick is successful. | `{ result: { sRGBHex: String }, colors: String[] }` |
| `eye-dropper:abort` | Emitted when color pick is aborted. | - |
| `eye-dropper:error` | Emitted if color pick fails for any reason. | `{ error: TypeError }` |

## Example

Below is a full usage example, with custom configuration and styling. Check the [demo page][demo] for a demonstration.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>eye-dropper-element demo</title>
  <style>
     eye-dropper:not(:defined) {
      display: none;
    }

    eye-dropper {
      display: block;
      margin-bottom: 1rem;
    }

    eye-dropper::part(button) {
      background-color: #1a73e8;
      color: #ffffff;
      border: 0;
      padding: 0.375rem 0.75rem;
      border-radius: 0.25rem;
      font-size: 1rem;
      cursor: pointer;
      -webkit-appearance: none;
      -moz-appearance: none;
    }

    eye-dropper::part(button--disabled) {
      opacity: 0.5;
      cursor: not-allowed;
    }
  </style>
</head>
<body>
  <eye-dropper>
    <span slot="button-label">Pick a color</span>
  </eye-dropper>

  <ul id="picked-colors"></ul>

  <script type="module">
    import { EyeDropperElement } from './node_modules/@georapbox/eye-dropper-element/dist/eye-dropper.min.js';

    EyeDropperElement.defineCustomElement();

    document.addEventListener('eye-dropper:success', evt => {
      document.getElementById('picked-colors').innerHTML = evt.detail.colors.map(color => {
        return `<li><div style="background-color:${color};"></div> ${color}</li>`;
      }).join('');
    });
  </script>
</body>
</html>
```

## Changelog

For API updates and breaking changes, check the [CHANGELOG][changelog].

## Browser support

Browsers without native [custom element support][support] require a [polyfill][polyfill].

- Firefox
- Chrome
- Microsoft Edge
- Safari

## License

[The MIT License (MIT)][license]
