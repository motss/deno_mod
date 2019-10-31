import { assertStrictEq, prepareTest } from "../test.mod.ts";

import { extend } from "./extend.ts";

import { isObject } from "./object.ts";

extend({
  object: [isObject]
});

async function willExtendObjectConstructor() {
  const extensions = [["Object.isObject", "isObject"]];
  const expectation = extensions.every(([_, methodName]) => {
    return methodName in Object;
  });

  assertStrictEq(expectation, true);
}

prepareTest([willExtendObjectConstructor], "jsmodern", "object");
