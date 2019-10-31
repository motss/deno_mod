import { assertStrictEq, prepareTest } from "../test.mod.ts";

import { extend } from "./extend.ts";

import {
  difference,
  from,
  intersection,
  isDisjoint,
  isEmpty,
  isSet,
  isSubset,
  isSuperset,
  iter,
  len,
  of,
  symmetricDifference,
  toArray,
  union
} from "./set.ts";

extend({
  set: [
    difference,
    from,
    intersection,
    isDisjoint,
    isEmpty,
    isSet,
    isSubset,
    isSuperset,
    iter,
    len,
    of,
    symmetricDifference,
    toArray,
    union
  ]
});

async function willExtendSetPrototype() {
  const extensions = [
    ["Set.prototype.difference", "difference"],
    ["Set.prototype.intersection", "intersection"],
    ["Set.prototype.isDisjoint", "isDisjoint"],
    ["Set.prototype.isEmpty", "isEmpty"],
    ["Set.prototype.isSubset", "isSubset"],
    ["Set.prototype.isSuperset", "isSuperset"],
    ["Set.prototype.iter", "iter"],
    ["Set.prototype.len", "len"],
    ["Set.prototype.symmetricDifference", "symmetricDifference"],
    ["Set.prototype.toArray", "toArray"],
    ["Set.prototype.union", "union"]
  ];
  const expectation = extensions.every(([_, methodName]) => {
    return methodName in Set.prototype;
  });

  assertStrictEq(expectation, true);
}

async function willExtendSetConstructor() {
  const extensions = [
    ["Set.from", "from"],
    ["Set.isSet", "isSet"],
    ["Set.of", "of"]
  ];
  const expectation = extensions.every(([_, methodName]) => {
    return methodName in Set;
  });

  assertStrictEq(expectation, true);
}

prepareTest(
  [willExtendSetConstructor, willExtendSetPrototype],
  "jsmodern",
  "set"
);
