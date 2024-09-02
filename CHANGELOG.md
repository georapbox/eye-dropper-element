# CHANGELOG

## v3.0.0 (2024-09-02)

### Breaking Changes

- The component is not hidden by default if EyeDropper API is not supported, instead it will dispatch an event `eye-dropper:error` with an error message when clicked. You can check if the API is supported by using the a simple check like `'EyeDropper' in window`.

## Other Changes

- Add type definitions for TypeScript.
- Replace parcel with esbuild for bundling.
- Update ESLint to use flat configuration.
- Use Prettier for code formatting.
- Update dev dependencies.

## v2.0.0 (2022-11-18)

- Refactor to use private class fields.
- Replace rollup.js with parcel.js for bundling.
- Update dev dependencies.

### Breaking Changes

- Only minified production builds will be included in the `dist` folder from now on.

## v1.0.0 (2022-08-13)

- Initial release
