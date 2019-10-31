import { assertStrictEq, prepareTest } from "../test.mod.ts";

import { extend } from "./extend.ts";

import { isError } from "./error.ts";

extend({
  error: [isError]
});

async function willExtendErrorConstructor() {
  const extensions = [["Error.isError", "isError"]];
  const expectation = extensions.every(([_, methodName]) => {
    return methodName in Error;
  });

  assertStrictEq(expectation, true);
}

prepareTest([willExtendErrorConstructor], "jsmodern", "error");
