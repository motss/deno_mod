<div align="center" style="text-align: center;">
  <h1 style="border-bottom: none;">deep_clone</h1>

  <p>Simple and fast deep cloning</p>
</div>

<hr />

[![MIT License][mit-license-badge]][mit-license-url]

> Simple [deno] module to do simple and fast deep cloning.

## Table of contents <!-- omit in toc -->

- [Usage](#usage)
- [API Reference](#api-reference)
  - [deepClone&lt;T&gt;(target[, options])](#deepclonettarget-options)
  - [deepCloneSync(target[, options])](#deepclonesynctarget-options)
- [License](#license)

## Usage

```ts
/** Import from GH via `denopkg` */
import { deepClone } from "https://cdn.jsdelivr.net/gh/motss/deno_mod@v0.10.0/deep_clone/mod.ts";

(async () => {
  const simpleObject = {
    a: {
      b: { c: [1, 2, 3] },
      e: [{ f: null }]
    },
    d: "deep"
  };
  const complexObject = {
    a: () => {},
    b: /test/gi,
    c: [1, 2],
    d: new Date(),
    e: { f: 111 }
  };

  await deepClone(simpleObject);
  await deepClone(complexObject, { absolute: true });
})();
```

## API Reference

### deepClone&lt;T&gt;(target[, options])

- `target` <`T`> Target to be cloned.
- `options` <?[Object][object-mdn-url]> Optionally set `absolute: true` for deep cloning complex objects that are not possible with `JSON.parse` + `JSON.stringify`.
  - `absolute` <[boolean][boolean-mdn-url]> If true, deep clone complex objects.
- returns: <[Promise][promise-mdn-url]<`T`>> Promise which resolves with the deeply cloned target.

This method deeply clones a given target with `JSON.parse` + `JSON.stringify` asynchronously by default. Set `absolute: true` for deep cloning complex objects that contain [Date][date-mdn-url], [RegExp][reg-exp-mdn-url], [Function][function-mdn-url], etc.

### deepCloneSync(target[, options])

This methods works the same as `deepClone(target[, options])` except that this is the synchronous version.

## License

[MIT License](http://motss.mit-license.org/) © Rong Sen Ng

<!-- References -->

[deno]: https://github.com/denoland/deno

<!-- MDN -->

[boolean-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[date-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[function-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
[html-style-element-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLStyleElement
[map-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[number-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[object-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[promise-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[reg-exp-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[string-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

<!-- Badges -->

[mit-license-badge]: https://flat.badgen.net/badge/license/MIT/blue

<!-- Links -->

[mit-license-url]: https://github.com/motss/deno_mod/blob/master/LICENSE
