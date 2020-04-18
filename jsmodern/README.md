<div align="center" style="text-align: center;">
  <h1 style="border-bottom: none;">jsmodern</h1>

  <p>An extension to existing JavaScript, influenced by other great languages such as Rust, Dart, Java, Golang, etc.</p>
</div>

<hr />

[![MIT License][mit-license-badge]][mit-license-url]

> A collections of extensions for JavaScript that borrow some of the useful features from other programming languages.

## Table of contents <!-- omit in toc -->

- [Usage](#usage)
- [API Reference](#api-reference)
- [License](#license)

## Usage

```ts
// It is recommended to only import those extensions you need instead of everything.
import { extend } from "https://cdn.jsdelivr.net/gh/motss/deno_mod@v0.10.0/jsmodern/extend.ts";
import { sum } from "https://cdn.jsdelivr.net/gh/motss/deno_mod@v0.10.0/jsmodern/array.ts";

extend({ array: [sum] });

const total = [1, 2, 3].sum();

console.log(total === 6); // true
```

## API Reference

- [x] [Array extensions]
- [x] [Boolean extensions]
- [x] [Date extensions]
- [x] [Error extensions]
- [x] [Function extensions]
- [x] [Iterator extensions]
- [x] [Map extensions]
- [x] [Number extensions]
- [x] [Object extensions]
- [x] [Promise extensions]
- [x] [RegExp extensions]
- [x] [Set extensions]
- [x] [String extensions]
- [x] [Symbol extensions]
- [x] [WeakMap extensions]
- [x] [WeakSet extensions]

## License

[MIT License](http://motss.mit-license.org/) © Rong Sen Ng

<!-- References -->

[array extensions]: https://github.com/motss/jsmodern/tree/master/src/array
[boolean extensions]: https://github.com/motss/jsmodern/tree/master/src/boolean
[date extensions]: https://github.com/motss/jsmodern/tree/master/src/date
[error extensions]: https://github.com/motss/jsmodern/tree/master/src/error
[function extensions]: https://github.com/motss/jsmodern/tree/master/src/function
[iterator extensions]: https://github.com/motss/jsmodern/tree/master/src/iterator
[map extensions]: https://github.com/motss/jsmodern/tree/master/src/map
[number extensions]: https://github.com/motss/jsmodern/tree/master/src/number
[object extensions]: https://github.com/motss/jsmodern/tree/master/src/object
[promise extensions]: https://github.com/motss/jsmodern/tree/master/src/promise
[reg-exp extensions]: https://github.com/motss/jsmodern/tree/master/src/reg-exp
[set extensions]: https://github.com/motss/jsmodern/tree/master/src/set
[string extensions]: https://github.com/motss/jsmodern/tree/master/src/string
[symbol extensions]: https://github.com/motss/jsmodern/tree/master/src/symbol
[weakmap extensions]: https://github.com/motss/jsmodern/tree/master/src/weak-map
[weakset extensions]: https://github.com/motss/jsmodern/tree/master/src/weak-set

<!-- MDN -->

[map-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[string-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[object-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[number-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[boolean-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[html-style-element-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLStyleElement
[promise-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

<!-- Badges -->

[mit-license-badge]: https://flat.badgen.net/badge/license/MIT/blue

<!-- Links -->

[mit-license-url]: https://github.com/motss/deno_mod/blob/master/LICENSE
