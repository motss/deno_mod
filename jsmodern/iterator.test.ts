import { assertStrictEq, prepareTest } from "../test.mod.ts";

import { extend } from "./extend.ts";

import { isAsyncIterator, isIterator } from "./iterator.ts";

extend({
  iterator: [isAsyncIterator, isIterator]
});

async function willExtendIteratorConstructor() {
  const extensions = [
    ["Function.isAsyncIterator", "isAsyncIterator"],
    ["Function.isIterator", "isIterator"]
  ];
  const expectation = extensions.every(([_, methodName]) => {
    return methodName in (window || globalThis);
  });

  assertStrictEq(expectation, true);
}

prepareTest([willExtendIteratorConstructor], "jsmodern", "iterator");
