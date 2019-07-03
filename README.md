# OpenLayers TypeScript Declaration

This project contains TypeScript declaration for [OpenLayers](https://openlayers.org/) `v6.0.0-beta.11` that includes all documented API and protected class members and methods.

## Installation

Definitions from this project will be syncronized with official [@types/ol](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/ol) repository.

```bash
# NPM
npm i -D @hanreev/types-ol

# Yarn
yarn add -D @hanreev/types-ol
```

## Usage

There are several ways to use this package. Please choose one:

- Install as `@types/ol`. This will simulate `@types/ol` installation from `node_modules/@hanreev/types-ol/ol` directory.  
  **Why?**

  - TypeScript compiler will look for types in `node_modules/@types` by default.
  - If you're using [Visual Studio Code](https://code.visualstudio.com/), its IntelliSense will only recognize types from `node_modules/@types`.

  ```js
  // file: package.json

  {
    ...
    "devDependencies": {
      ...
      "@hanreev/types-ol": "^3.0.0-beta.0",
      "@types/ol": "file:node_modules/@hanreev/types-ol/ol",
      ...
    }
  }
  ```

  then run

  ```bash
  # NPM
  npm i

  # Yarn
  yarn install
  ```

  > **_Note:_**  
  > This package must be installed first before adding `"@types/ol": "file:node_modules/@hanreev/types-ol/ol"` in `package.json`.

- Using `compilerOptions.paths` in `tsconfig.json`

  ```js
  // file: tsconfig.json

  {
    "compilerOptions": {
      ...
      "baseUrl": "./",
      "paths": {
        "ol": ["node_modules/@hanreev/types-ol/ol"]
      },
      ...
    }
  }
  ```

## Configuring and Building TypeScript declaration files

Configuration is located at `jsdoc/conf.json`

```js
// file: jsdoc/conf.json

{
  "source": {
    ...
    "include": [
      "openlayers/src/ol" // openlayers source
    ]
  },
  ...
  "typescript": {
    "moduleRoot": "openlayers/src", // openlayers source
    "declaration": {
      "mode": "multiple", // "single" will generate all declarations in single index.d.ts file.
      "strictGenericTypes": false // set to true to extract classes generic type from super class, members and methods.
    }
  },
  ...
}
```

- Install all dependencies

  ```bash
  # NPM
  npm i

  # Yarn
  yarn install
  ```

- Run build

  ```bash
  # NPM
  npm run build-format && npm run lint

  # Yarn
  yarn build-format && yarn lint
  ```

- Run test

  ```bash
  # NPM
  npm run lint-test && npm run test

  # Yarn
  yarn lint-test && yarn test
  ```

> **_Note:_**  
> Some declaration was patched manually. If you found any error please [create a new issue](https://github.com/hanreev/types-ol/issues).

## Changelog

### V3

- **v3.0.0-beta.0**
  - OpenLayers v6.0.0-beta.11 source

### V2

- **v2.0.6**
  - Fix external import with same member name--e.g., `GeoJSON` from `geojson` module in `ol/format/GeoJSON`
  - Order module members by kind
- **v2.0.5**
  - Fix anonymous function parameters type
  - Fix union types
- **v2.0.4**
  - Fix optional parameters in function type--e.g., third parameter of `{function(*, Array<*>, string=): (Node|undefined)}`
  - Test files fixes
- **v2.0.3**
  - OpenLayers 5.3.3 source
  - Members and methods sorting
- **v2.0.2**
  - Fix `object` type
  - Use relative import path for `ol` modules ([no-self-import](https://github.com/microsoft/dtslint/blob/master/docs/no-self-import.md))
- **v2.0.1**
  - Refactor definition filenames
  - Remove module declaration ([no-declare-current-package](https://github.com/microsoft/dtslint/blob/master/docs/no-declare-current-package.md))
  - [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) standard. These [dtslint](https://github.com/microsoft/dtslint) rules are ignored:
    - `adjacent-overload-signatures`
    - `array-type`
    - `max-line-length`
    - `no-self-import`
    - `no-unnecessary-class`
    - `no-unnecessary-generics`
    - `unified-signatures`
- **v1.0.2**
  - Sort imports
  - NPM compatibility as `@types/ol`
- **v1.0.1**
  - Fix `ol/MapBrowserEventType` module
- **v1.0.0**
  - Initial release

## License

Copyright &copy; 2019 [Rifa'i M. Hanif](https://github.com/hanreev)  
Licensed under [MIT License](LICENSE)
