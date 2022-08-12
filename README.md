[![npm version](https://img.shields.io/npm/v/@georapbox/eye-dropper-element.svg)](https://www.npmjs.com/package/@georapbox/eye-dropper-element)
[![npm license](https://img.shields.io/npm/l/@georapbox/eye-dropper-element.svg)](https://www.npmjs.com/package/@georapbox/eye-dropper-element)

[demo]: https://georapbox.github.io/eye-dropper-element/
[support]: https://caniuse.com/#feat=custom-elementsv1
[polyfill]: https://github.com/webcomponents/polyfills/tree/master/packages/custom-elements
[license]: https://georapbox.mit-license.org/@2022
[changelog]: https://github.com/georapbox/eye-dropper-element/blob/main/CHANGELOG.md

# &lt;eye-dropper&gt;

A custom element that implements the [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper) that allows the user to select colors from the screen.

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
// TODO
```

## API

### Properties
| Name | Reflects | Type | Default | Description |
| ---- | -------- | ---- | ------- | ----------- |
|  | ✓ |  |  |  |
// TODO

All of the above properties reflect their values as HTML attributes to keep the element's DOM representation in sync with its JavaScript state.

### Slots

| Name | Description |
| ---- | ----------- |
|  |  |
// TODO

### CSS Parts

| Name | Description |
| ---- | ----------- |
|  |  |
// TODO

### CSS Custom Properties

| Name | Description |
| ---- | ----------- |
|  |  |
// TODO

### Methods

| Name | Type | Description | Arguments |
| ---- | ---- | ----------- | --------- |
|  |  |  |  |
// TODO

### Events

// TODO

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
