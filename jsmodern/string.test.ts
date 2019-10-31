import { assertStrictEq, prepareTest } from "../test.mod.ts";

import { extend } from "./extend.ts";

import {
  capitalize,
  contains,
  firstIndex,
  firstItem,
  insert,
  isEmpty,
  isString,
  lastIndex,
  lastItem,
  len,
  lines,
  retain,
  splitWhitespace,
  toCamelCase,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
  toStartCase
} from "./string.ts";

extend({
  string: [
    capitalize,
    contains,
    firstIndex,
    firstItem,
    insert,
    isEmpty,
    isString,
    lastIndex,
    lastItem,
    len,
    lines,
    retain,
    splitWhitespace,
    toCamelCase,
    toKebabCase,
    toPascalCase,
    toSnakeCase,
    toStartCase
  ]
});

async function willExtendStringPrototype() {
  const extensions = [
    ["String.prototype.capitalize", "capitalize"],
    ["String.prototype.contains", "contains"],
    ["String.prototype.firstIndex", "firstIndex"],
    ["String.prototype.firstItem", "firstItem"],
    ["String.prototype.insert", "insert"],
    ["String.prototype.isEmpty", "isEmpty"],
    ["String.prototype.lastIndex", "lastIndex"],
    ["String.prototype.isEmpty", "isEmpty"],
    ["String.prototype.lastIndex", "lastIndex"],
    ["String.prototype.lastItem", "lastItem"],
    ["String.prototype.len", "len"],
    ["String.prototype.lines", "lines"],
    ["String.prototype.retain", "retain"],
    ["String.prototype.splitWhitespace", "splitWhitespace"],
    ["String.prototype.toCamelCase", "toCamelCase"],
    ["String.prototype.toKebabCase", "toKebabCase"],
    ["String.prototype.toPascalCase", "toPascalCase"],
    ["String.prototype.toSnakeCase", "toSnakeCase"],
    ["String.prototype.toStartCase", "toStartCase"]
  ];
  const expectation = extensions.every(([_, methodName]) => {
    return methodName in String.prototype;
  });

  assertStrictEq(expectation, true);
}

async function willExtendStringConstructor() {
  const extensions = [["String.isString", "isString"]];
  const expectation = extensions.every(([_, methodName]) => {
    return methodName in String;
  });

  assertStrictEq(expectation, true);
}

prepareTest(
  [willExtendStringConstructor, willExtendStringPrototype],
  "jsmodern",
  "string"
);
