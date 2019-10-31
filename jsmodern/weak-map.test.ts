import { assertStrictEq, prepareTest } from "../test.mod.ts";

import { extend } from "./extend.ts";

import { from, isWeakMap, of } from "./weak-map.ts";

extend({
  weakMap: [from, isWeakMap, of]
});

async function willExtendWeakMapConstructor() {
  const extensions = [
    ["WeakMap.from", "from"],
    ["WeakMap.isWeakMap", "isWeakMap"],
    ["WeakMap.of", "of"]
  ];
  const expectation = extensions.every(([_, methodName]) => {
    return methodName in WeakMap;
  });

  assertStrictEq(expectation, true);
}

prepareTest([willExtendWeakMapConstructor], "jsmodern", "weakMap");
