import { assertStrictEq, prepareTest } from "../test.mod.ts";

import { extend } from "./extend.ts";

import { from, isWeakSet, of } from "./weak-set.ts";

extend({
  weakSet: [from, isWeakSet, of]
});

async function willExtendWeakSetConstructor() {
  const extensions = [
    ["WeakSet.from", "from"],
    ["WeakSet.isWeakSet", "isWeakSet"],
    ["WeakSet.of", "of"]
  ];
  const expectation = extensions.every(([_, methodName]) => {
    return methodName in WeakSet;
  });

  assertStrictEq(expectation, true);
}

prepareTest([willExtendWeakSetConstructor], "jsmodern", "weakSet");
