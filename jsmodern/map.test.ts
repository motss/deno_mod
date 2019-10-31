import { assertStrictEq, prepareTest } from "../test.mod.ts";

import { extend } from "./extend.ts";

import {
  entry,
  entryOrDefault,
  from,
  getOrDefault,
  isEmpty,
  isMap,
  iter,
  len,
  of,
  removeEntry,
  toArray
} from "./map.ts";

extend({
  map: [
    entry,
    entryOrDefault,
    from,
    getOrDefault,
    isEmpty,
    isMap,
    iter,
    len,
    of,
    removeEntry,
    toArray
  ]
});

async function willExtendMapPrototype() {
  const extensions = [
    ["Map.prototype.entry", "entry"],
    ["Map.prototype.entryOrDefault", "entryOrDefault"],
    ["Map.prototype.getOrDefault", "getOrDefault"],
    ["Map.prototype.isEmpty", "isEmpty"],
    ["Map.prototype.iter", "iter"],
    ["Map.prototype.len", "len"],
    ["Map.prototype.removeEntry", "removeEntry"],
    ["Map.prototype.toArray", "toArray"]
  ];
  const expectation = extensions.every(([_, methodName]) => {
    return methodName in Map.prototype;
  });

  assertStrictEq(expectation, true);
}

async function willExtendMapConstructor() {
  const extensions = [
    ["Map.from", "from"],
    ["Map.isMap", "isMap"],
    ["Map.of", "of"]
  ];
  const expectation = extensions.every(([_, methodName]) => {
    return methodName in Map;
  });

  assertStrictEq(expectation, true);
}

prepareTest(
  [willExtendMapConstructor, willExtendMapPrototype],
  "jsmodern",
  "map"
);
