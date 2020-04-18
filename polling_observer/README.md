<div align="center" style="text-align: center;">
  <h1 style="border-bottom: none;">polling_observer</h1>

  <p>A new way of running polling function with observer pattern</p>
</div>

<hr />

[![MIT License][mit-license-badge]][mit-license-url]

> Like PerformanceObserver or any other observer APIs you could find in a browser, but this is for polling. Not only does it run polling with defined parameters but also collect polling metrics for each run until timeout or a defined condition fulfills.

## Table of contents <!-- omit in toc -->

- [Usage](#usage)
- [API Reference](#api-reference)
  - [OnfinishFulfilled&lt;T&gt;](#onfinishfulfilledt)
  - [OnfinishRejected](#onfinishrejected)
  - [PollingMeasure](#pollingmeasure)
    - [Methods](#methods)
      - [PollingMeasure.toJSON()](#pollingmeasuretojson)
  - [PollingObserver&lt;T&gt;](#pollingobservert)
    - [Methods](#methods-1)
      - [PollingObserver.observe(callback[, options])](#pollingobserverobservecallback-options)
      - [PollingObserver.disconnect()](#pollingobserverdisconnect)
      - [PollingObserver.takeRecords()](#pollingobservertakerecords)
    - [Event handler](#event-handler)
      - [PollingObserver.onfinish](#pollingobserveronfinish)
    - [Events](#events)
      - [finish](#finish)
- [License](#license)

## Usage

```ts
interface DataType {
  status: "complete" | "in-progress";
  items: Record<string, any>[];
}

import { PollingObserver } from "https://cdn.jsdelivr.net/gh/motss/deno_mod@v0.10.0/polling_observer/mod.ts";

const obs = new PollingObserver((data /** list, observer */) => {
  const { status, items } = data || {};
  const itemsLen = (items && items.length) || 0;

  /** Stop polling when any of the conditions fulfills */
  return "complete" === status || itemsLen > 99;
});

/**
 * When polling finishes, it will either fulfill or reject depending on the status:
 *
 * | Status  | Returns   |
 * | ------- | --------- |
 * | finish  | <value>   |
 * | timeout | <value>   |
 * | error   | <reason>  |
 *
 */
obs.onfinish = (data, records /**, observer */) => {
  const { status, value, reason } = data || {};

  switch (status) {
    case "error": {
      console.error(`Polling fails due to: `, reason);
      break;
    }
    case "timeout": {
      console.log(`Polling timeouts after 30 seconds: `, value);
      break;
    }
    case "finish":
    default: {
      console.log(`Polling finishes: `, value);
    }
  }

  console.log(`Formatted polling records: `, records.map(n => n.toJSON()));
  /**
   * [
   *   {
   *     duration: 100,
   *     entryType: 'polling-measure',
   *     name: 'polling:0',
   *     startTime: 100,
   *   },
   *   ...
   * ]
   */

  obs.disconnect(); /** Disconnect to clean up */
};

obs.observe(
  async () => {
    /** Polling callback - fetch resources */
    const r = await fetch("https://example.com/api?key=123");
    const d = await r.json();

    return d;
  },
  /** Run polling (at least) every 2 seconds and timeout if it exceeds 30 seconds */
  {
    interval: 2e3,
    timeout: 30e3
  }
);
```

## API Reference

### OnfinishFulfilled&lt;T&gt;

```ts
interface OnfinishFulfilled<T> {
  status: "finish" | "timeout";
  value: T;
}
```

### OnfinishRejected

```ts
interface OnfinishRejected {
  status: "error";
  reason: Error;
}
```

### PollingMeasure

```ts
interface PollingMeasure {
  duration: number;
  entryType: "polling-measure";
  name: string;
  startTime: number;
}
```

- `duration` <[number][number-mdn-url]> Duration of the polling takes in milliseconds.
- `entryType` <[string][string-mdn-url]> Entry type, defaults to `polling-measure`.
- `name` <[string][string-mdn-url]> Polling name in the format of `polling:<index>` where `<index>` starts from `0` and increments on each polling.
- `startTime` <[string][string-mdn-url]> Relative timestamp (in milliseconds ) indicates when the polling starts at.

#### Methods

##### PollingMeasure.toJSON()

- <[Function][function-mdn-url]> Returns a JSON representation of the polling object's properties.

---

### PollingObserver&lt;T&gt;

- `conditionCallback` <[Function][function-mdn-url]> Condition callback to be executed in each polling and return the condition result in the type of boolean, e.g. return `true` to stop next poll.
  - `data` <`T`> Polling data returned by `callback` in the type of `T` which defined in the [PollingObserver.observe()] method.
  - `entries` <[Array][array-mdn-url]&lt;[PollingMeasure]&gt;> A list of [PollingMeasure] objects.
  - `observer` <[PollingObserver]&lt;`T`&gt;> Created [PollingObserver] object.
  - returns: <[boolean][boolean-mdn-url]> If `true`, the polling stops. Returning `false` will result in an infinite polling as the condition will never meet.
- returns: <[PollingObserver]&lt;`T`&gt;> [PollingObserver] object.

#### Methods

##### PollingObserver.observe(callback[, options])

The method is used to initiate polling with a polling callback and optional configuration.

- `callback` <[Function][function-mdn-url]> Callback to be executed in each polling and return the result so that it will be passed as the first argument in `conditionCallback`.
  - returns: <`T` | [Promise][promise-mdn-url]&lt;`T`&gt;> Return polling result in the type of `T` or `Promise<T>` in each polling.
- `options` <[Object][object-mdn-url]> Optional configuration to run the polling.
  - `interval` <[number][number-mdn-url]> Optional interval in milliseconds. This is the minimum delay before starting the next polling.
  - `timeout` <[number][number-mdn-url]> Optional timeout in milliseconds. Polling ends when it reaches the defined timeout even though the condition has not been met yet. _As long as `timeout` is not a number or it has a value that is less than 1, it indicates an infinite polling. The polling needs to be stopped manually by calling [PollingObserver.disconnect()] method._

##### PollingObserver.disconnect()

Once a `PollingObserver` disconnects, the polling stops and all polling metrics will be cleared. Calling [PollingObserver.takeRecords()] after the disconnection will always return an empty record.

A `onfinish` event handler can be used to retrieve polling records after a disconnection but it has to be attached before disconnecting the observer.

##### PollingObserver.takeRecords()

The method returns a list of [PollingMeasure] object containing the metrics of each polling.

- returns: <[Array][array-mdn-url]&lt;[PollingMeasure]&gt;> A list of [PollingMeasure] objects.

#### Event handler

##### PollingObserver.onfinish

_Alternatively, an event handler can be setup to listen for the `finish` event. See [finish]._

Event handler for when a polling finishes. When a polling finishes, it can either be fulfilled with a `value` or rejected with a `reason`. Any one of which contains a `status` field to tell the state of the finished polling.

- `onfinishCallback` <[Function][function-mdn-url]> Callback to be executed when a polling finishes.

  - `data` <[OnfinishFulfilled&lt;T&gt;]|[OnfinishRejected]> When a polling fulfills, it returns an [OnfinishFulfilled&lt;T&gt;] object with `status` set to `finish` or `timeout` and a `value` in the type of `T`. Whereas a polling rejects, it returns an [OnfinishRejected] object with `status` set to `error` and a `reason` in the type of [Error][error-mdn-url].

    | Status    | Returns        |
    | --------- | -------------- |
    | `finish`  | &lt;value&gt;  |
    | `timeout` | &lt;value&gt;  |
    | `error`   | &lt;reason&gt; |

  - `entries` <[Array][array-mdn-url]&lt;[PollingMeasure]&gt;> A list of [PollingMeasure] objects.
  - `observer` <[PollingObserver]&lt;`T`&gt;> Created [PollingObserver] object.

#### Events

##### finish

`finish` event fires when a polling finishes.

```ts
const obs = new PollingObserver(/** --snip */);
// --snip
```

## License

[MIT License](http://motss.mit-license.org/) © Rong Sen Ng

<!-- References -->

[deno]: https://github.com/denoland/deno
[pollingobserver]: #pollingobservert
[pollingobserver.observe()]: #pollingobserverobservecallback-options
[pollingobserver.disconnect()]: #pollingobserverdisconnect
[pollingobserver.takerecords()]: #pollingobservertakerecords
[pollingmeasure]: #pollingmeasure
[pollingmeasure.tojson()]: #pollingmeasuretojson
[onfinishfulfilled&lt;t&gt;]: #onfinishfulfilledt
[onfinishrejected]: #onfinishrejected
[finish]: #finish

<!-- MDN -->

[array-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[boolean-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[function-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
[map-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[number-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[object-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[promise-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[reg-exp-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[set-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
[string-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[void-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
[error-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

<!-- Badges -->

[mit-license-badge]: https://flat.badgen.net/badge/license/MIT/blue

<!-- Links -->

[mit-license-url]: https://github.com/motss/deno_mod/blob/master/LICENSE
