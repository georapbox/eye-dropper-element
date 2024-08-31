[![npm version](https://img.shields.io/npm/v/@georapbox/eye-dropper-element.svg)](https://www.npmjs.com/package/@georapbox/eye-dropper-element)
[![npm license](https://img.shields.io/npm/l/@georapbox/eye-dropper-element.svg)](https://www.npmjs.com/package/@georapbox/eye-dropper-element)

[demo]: https://georapbox.github.io/eye-dropper-element/
[license]: https://github.com/georapbox/eye-dropper-element/blob/main/LICENSE
[changelog]: https://github.com/georapbox/eye-dropper-element/blob/main/CHANGELOG.md

# &lt;eye-dropper&gt;

A custom element that implements the [EyeDropper API](https://developer.mozilla.org/docs/Web/API/EyeDropper) that allows the user to select colors from the screen.

> NOTE: The EyeDropper API is still experimental and supported only on Chromium based browsers. In not supported browsers, the color picker button is not displayed at all.

[API documentation](#api) &bull; [Demo][demo]

## Install

```sh
$ npm install --save @georapbox/eye-dropper-element
```

## Usage

### Script

```js
import { EyeDropperElement } from './node_modules/@georapbox/eye-dropper-element/dist/eye-dropper.js';

// Manually define the element.
EyeDropperElement.defineCustomElement();
```

Alternatively, you can import the automatically defined custom element.

```js
import './node_modules/@georapbox/eye-dropper-element/dist/eye-dropper-defined.js';
```

### Markup

```html
<eye-dropper></eye-dropper>
```

## API

### Properties
| Name | Reflects | Type | Required | Default | Description |
| ---- | -------- | ---- | -------- | ------- | ----------- |
| `disabled` | ✓ | Boolean | - | `false` | Whether the color picker button is disabled. |
| `copy` | ✓ | Boolean | - | `false` | Whether the picked color should be copied to clipboard. |

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
| `eye-dropper:copy` | Emitted if `copy` property is `true` and the picked color is successfully copied to clipbaord. | `{ value: String }` |

## Changelog

For API updates and breaking changes, check the [CHANGELOG][changelog].

## Development setup

### Prerequisites

The project requires `Node.js` and `npm` to be installed on your environment. Preferrably, use [nvm](https://github.com/nvm-sh/nvm) Node Version Manager and use the version of Node.js specified in the `.nvmrc` file by running `nvm use`.

### Install dependencies

Install the project dependencies by running the following command.

```sh
npm install
```

### Build for development

Watch for changes and start a development server by running the following command.

```sh
npm start
```

### Linting

Lint the code by running the following command.

```sh
npm run lint
```

### Testing

Run the tests by running any of the following commands.

```sh
npm test
npm run test:watch # watch mode
```

### Build for production

Create a production build by running the following command.

```sh
npm run build
```

## License

[The MIT License (MIT)][license]
