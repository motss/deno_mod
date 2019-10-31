import { assertStrictEq, prepareTest } from "../test.mod.ts";

import { extend } from "./extend.ts";

import {
  isAsyncFunction,
  isAsyncGeneratorFunction,
  isFunction,
  isGeneratorFunction
} from "./function.ts";

extend({
  function: [
    isAsyncFunction,
    isAsyncGeneratorFunction,
    isFunction,
    isGeneratorFunction
  ]
});

async function willExtendFunctionConstructor() {
  const extensions = [
    ["Function.isAsyncFunction", "isAsyncFunction"],
    ["Function.isAsyncGeneratorFunction", "isAsyncGeneratorFunction"],
    ["Function.isFunction", "isFunction"],
    ["Function.isGeneratorFunction", "isGeneratorFunction"]
  ];
  const expectation = extensions.every(([_, methodName]) => {
    return methodName in Function;
  });

  assertStrictEq(expectation, true);
}

prepareTest([willExtendFunctionConstructor], "jsmodern", "function");
