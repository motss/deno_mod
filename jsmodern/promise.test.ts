import { assertStrictEq, prepareTest } from "../test.mod.ts";

import { extend } from "./extend.ts";

import { delayed, isPromise } from "./promise.ts";

extend({
  promise: [delayed, isPromise]
});

async function willExtendPromiseConstructor() {
  const extensions = [
    ["Promise.delayed", "delayed"],
    ["Promise.isPromise", "isPromise"]
  ];
  const expectation = extensions.every(([_, methodName]) => {
    return methodName in Promise;
  });

  assertStrictEq(expectation, true);
}

prepareTest([willExtendPromiseConstructor], "jsmodern", "promise");
