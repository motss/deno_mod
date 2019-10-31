import { assertStrictEq, prepareTest } from "../test.mod.ts";

import { extend } from "./extend.ts";

import { isBoolean } from "./boolean.ts";

extend({
  boolean: [isBoolean]
});

async function willExtendBooleanConstructor() {
  const extensions = [["Boolean.isBoolean", "isBoolean"]];
  const expectation = extensions.every(([_, methodName]) => {
    return methodName in Boolean;
  });

  assertStrictEq(expectation, true);
}

prepareTest([willExtendBooleanConstructor], "jsmodern", "boolean");
