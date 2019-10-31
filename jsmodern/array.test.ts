import { assertStrictEq, prepareTest } from "../test.mod.ts";

import { extend } from "./extend.ts";

import {
  all,
  any,
  binarySearch,
  chunks,
  clear,
  contains,
  endsWith,
  enumerate,
  filled,
  firstItem,
  fold,
  insert,
  isEmpty,
  isSorted,
  iter,
  lastIndex,
  lastItem,
  len,
  max,
  min,
  partition,
  product,
  reject,
  remove,
  repeat,
  retain,
  select,
  shuffle,
  split,
  splitAt,
  startsWith,
  sum,
  truncate
} from "./array.ts";

extend({
  array: [
    all,
    any,
    binarySearch,
    chunks,
    clear,
    contains,
    endsWith,
    enumerate,
    filled,
    firstItem,
    fold,
    insert,
    isEmpty,
    isSorted,
    iter,
    lastIndex,
    lastItem,
    len,
    max,
    min,
    partition,
    product,
    reject,
    remove,
    repeat,
    retain,
    select,
    shuffle,
    split,
    splitAt,
    startsWith,
    sum,
    truncate
  ]
});

async function willExtendArrayPrototype() {
  const extensions = [
    ["Array.prototype.all", "all"],
    ["Array.prototype.any", "any"],
    ["Array.prototype.binarySearch", "binarySearch"],
    ["Array.prototype.chunks", "chunks"],
    ["Array.prototype.clear", "clear"],
    ["Array.prototype.contains", "contains"],
    ["Array.prototype.endsWith", "endsWith"],
    ["Array.prototype.enumerate", "enumerate"],
    ["Array.prototype.firstItem", "firstItem"],
    ["Array.prototype.fold", "fold"],
    ["Array.prototype.insert", "insert"],
    ["Array.prototype.isEmpty", "isEmpty"],
    ["Array.prototype.isSorted", "isSorted"],
    ["Array.prototype.iter", "iter"],
    ["Array.prototype.lastIndex", "lastIndex"],
    ["Array.prototype.lastItem", "lastItem"],
    ["Array.prototype.len", "len"],
    ["Array.prototype.max", "max"],
    ["Array.prototype.min", "min"],
    ["Array.prototype.partition", "partition"],
    ["Array.prototype.product", "product"],
    ["Array.prototype.reject", "reject"],
    ["Array.prototype.remove", "remove"],
    ["Array.prototype.repeat", "repeat"],
    ["Array.prototype.retain", "retain"],
    ["Array.prototype.select", "select"],
    ["Array.prototype.shuffle", "shuffle"],
    ["Array.prototype.splitAt", "splitAt"],
    ["Array.prototype.split", "split"],
    ["Array.prototype.startsWith", "startsWith"],
    ["Array.prototype.sum", "sum"],
    ["Array.prototype.truncate", "truncate"]
  ];
  const expectation = extensions.every(([_, methodName]) => {
    return methodName in Array.prototype;
  });

  assertStrictEq(expectation, true);
}

async function willExtendArrayConstructor() {
  const extensions = [["Array.filled", "filled"]];
  const expectation = extensions.every(([_, methodName]) => {
    return methodName in Array;
  });

  assertStrictEq(expectation, true);
}

prepareTest(
  [willExtendArrayConstructor, willExtendArrayPrototype],
  "jsmodern",
  "array"
);
