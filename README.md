# appetizer-component

A React Component to embed the appetize.io uploaded applications in your
application.

## Installation

The package is released in the public npm registry and can be installed by
running:

```js
npm install --save appetizer-component
```

## Part of the Appetizer suite

This module is part of a larger suite of components that work excellent with each
other. If you liked this module we highly suggest checking out:

- [appetizer][api] A Node.js component for interacting with the Appetize.io API.
- [appetizer-bundle][bundle] Prepares and packs your React-Native application for uploading to Appetize.io.
- [appetizer-component][component] A React Component to embed your uploaded application.

[api]: https://github.com/godaddy/appetizer
[bundle]: https://github.com/godaddy/appetizer-bundle
[component]: https://github.com/godaddy/appetizer-component

## API

```js
import Appetizer from 'appetizer-component';
import React, { Component } from 'react';

export default class Example extends Component {
  render() {
    return (
      <Appetizer public='public-device-id' color='white' device='iphone5s' />
    );
  }
}
```

The following properties are supported:

- `public` (string): The public device id that is returned from the Appetize.io API
- `device` (string): The device it should run on can be one of:
  - `iphone4s`
  - `iphone5s`
  - `iphone6`
  - `iphone6plus`
  - `ipadair`
  - `iphone6s`
  - `iphone6splus`
  - `ipadair2`
  - `nexus5`
  - `nexus7`
  - `nexus9`
- `autoplay` (boolean): When true, start streaming app on page load.
- `version` (string): The operating system version on which to run your app, e.g. 7.0, 6.0
- `scale` (number): Values between 10 and 100.
- `orientation` (string): Either portrait or landscape.
- `color` (string): Either black or white.
- `screen` (boolean): When true, only show the screen, i.e. no device frame.
- `xdoc` (boolean): When true, enables cross-document messages.
- `language` (string): ISO 639-1 language code
- `locale` (string):  Locale ID, i.e. en_GB, fr_FR (iOS only)
- `location` (string): latitude,longitude, i.e. 39.903924,116.391432
- `link` (string): specify a deep link to open when your app is launched
- `proxy` (string):  specify a proxy server to route network traffic. e.g.
  "http://example.com:8080". For Appetize.io's intercepting proxy, use
  `proxy=intercept`.
- `apk` (boolean): Allow installation of additional APKs after app launch.
- `adb` (boolean): On session start, generate an SSH tunnel to allow
  `ADB` connections to the emulator.
- `params` (object): This data will be passed to your app on launch.

Any other supplied property will be passed to the generated `<iframe>` object so
you can set properties such as `frameBorder='0'` and `scrolling='no'`on the
resulting `<iframe>`.

## License

[MIT](LICENSE)
