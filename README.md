[![npm version](https://img.shields.io/npm/v/@georapbox/eye-dropper-element.svg)](https://www.npmjs.com/package/@georapbox/eye-dropper-element)
[![npm license](https://img.shields.io/npm/l/@georapbox/eye-dropper-element.svg)](https://www.npmjs.com/package/@georapbox/eye-dropper-element)

[demo]: https://georapbox.github.io/eye-dropper-element/
[license]: https://github.com/georapbox/eye-dropper-element/blob/main/LICENSE
[changelog]: https://github.com/georapbox/eye-dropper-element/blob/main/CHANGELOG.md

# &lt;eye-dropper&gt;

A custom element that implements the [EyeDropper API](https://developer.mozilla.org/docs/Web/API/EyeDropper) that allows the user to select colors from the screen.

> [!IMPORTANT]
> The EyeDropper API is still experimental and supported only on desktop Chromium based browsers. In not supported browsers, the color picker button will dispatch an event `eye-dropper:error` with an error message when clicked. You can check if the API is supported by using the a simple check like `'EyeDropper' in window` to decide whether to show the color picker button or handle the error event.

[API documentation](#api) &bull; [Demo][demo]

## Install

```sh
npm install --save @georapbox/eye-dropper-element
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

### Style

By default, the component is style-free to remain as less opinionated as possible. However, you can style the various elements of the component using [CSS Parts](#css-parts) provided for this purpose.

## API

### Properties
| Name | Reflects | Type | Required | Default | Description |
| ---- | -------- | ---- | -------- | ------- | ----------- |
| `disabled` | ✓ | Boolean | - | `false` | Whether the color picker button is disabled. |
| `copy` | ✓ | Boolean | - | `false` | Whether the picked color should be copied to clipboard. |

### Slots

| Name | Description |
| ---- | ----------- |
| `button` | The slot for the button element. Example: `<a href="#" slot="button" role="button">Pick a color</a>` |
| `button-label` | The slot for the button label. Example: `<span slot="button-label">Pick a color</span>` |

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
| `eye-dropper:success` | Emitted when color pick is successful. | `{ result: { sRGBHex: string }, colors: string[] }` |
| `eye-dropper:abort` | Emitted when color pick is aborted. | - |
| `eye-dropper:error` | Emitted if color pick fails for any reason. | `{ error: Error \| TypeError }` |
| `eye-dropper:copy` | Emitted if `copy` property is `true` and the picked color is successfully copied to clipbaord. | `{ value: string }` |

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
