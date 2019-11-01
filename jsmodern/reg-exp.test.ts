import { assertStrictEq, prepareTest } from "../test.mod.ts";

import { extend } from "./extend.ts";

import { isRegExp } from "./reg-exp.ts";

extend({
  regExp: [isRegExp]
});

async function willExtendRegExpConstructor() {
  const extensions = [["RegExp.isRegExp", "isRegExp"]];
  const expectation = extensions.every(([_, methodName]) => {
    return methodName in RegExp;
  });

  assertStrictEq(expectation, true);
}

prepareTest([willExtendRegExpConstructor], "jsmodern", "regExp");
