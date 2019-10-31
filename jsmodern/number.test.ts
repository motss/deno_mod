import { assertStrictEq, prepareTest } from "../test.mod.ts";

import { extend } from "./extend.ts";

import {
  divFloor,
  divModFloor,
  divRem,
  gcd,
  isBetween,
  isEven,
  isMultipleOf,
  isNumber,
  isOdd,
  lcm,
  modFloor,
  range
} from "./number.ts";

extend({
  number: [
    divFloor,
    divModFloor,
    divRem,
    gcd,
    isBetween,
    isEven,
    isMultipleOf,
    isNumber,
    isOdd,
    lcm,
    modFloor,
    range
  ]
});

async function willExtendNumberPrototype() {
  const extensions = [
    ["Number.prototype.divFloor", "divFloor"],
    ["Number.prototype.divModFloor", "divModFloor"],
    ["Number.prototype.divRem", "divRem"],
    ["Number.prototype.gcd", "gcd"],
    ["Number.prototype.isBetween", "isBetween"],
    ["Number.prototype.isEven", "isEven"],
    ["Number.prototype.isMultipleOf", "isMultipleOf"],
    ["Number.prototype.isOdd", "isOdd"],
    ["Number.prototype.lcm", "lcm"],
    ["Number.prototype.modFloor", "modFloor"]
  ];
  const expectation = extensions.every(([_, methodName]) => {
    return methodName in Number.prototype;
  });

  assertStrictEq(expectation, true);
}

async function willExtendNumberConstructor() {
  const extensions = [
    ["Number.isNumber", "isNumber"],
    ["Number.range", "range"]
  ];
  const expectation = extensions.every(([_, methodName]) => {
    return methodName in Number;
  });

  assertStrictEq(expectation, true);
}

prepareTest(
  [willExtendNumberConstructor, willExtendNumberPrototype],
  "jsmodern",
  "number"
);
