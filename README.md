
[![Published on NPM](https://img.shields.io/npm/v/@polymer/gold-zip-input.svg)](https://www.npmjs.com/package/@polymer/gold-zip-input)
[![Build status](https://travis-ci.org/PolymerElements/gold-zip-input.svg?branch=master)](https://travis-ci.org/PolymerElements/gold-zip-input)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://webcomponents.org/element/@polymer/gold-zip-input)

## &lt;gold-zip-input&gt;

`gold-zip-input` is a single-line text field with Material Design styling
for entering a US zip code.

See: [Documentation](https://www.webcomponents.org/element/@polymer/gold-zip-input),
  [Demo](https://www.webcomponents.org/element/@polymer/gold-zip-input/demo/demo/index.html).

## Usage

### Installation
```
npm install --save @polymer/gold-zip-input
```

### In an html file
```html
<html>
  <head>
    <script type="module">
      import '@polymer/gold-zip-input/gold-zip-input.js';
    </script>
  </head>
  <body>
    <gold-zip-input auto-validate value="90210-9999"></gold-zip-input>
  </body>
</html>
```
### In a Polymer 3 element
```js
import {PolymerElement, html} from '@polymer/polymer';
import '@polymer/gold-zip-input/gold-zip-input.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
      <gold-zip-input auto-validate value="90210-9999"></gold-zip-input>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

## Contributing
If you want to send a PR to this element, here are
the instructions for running the tests and demo locally:

### Installation
```sh
git clone https://github.com/PolymerElements/gold-zip-input
cd gold-zip-input
npm install
npm install -g polymer-cli
```

### Running the demo locally
```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```