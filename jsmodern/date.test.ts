import { assertStrictEq, prepareTest } from "../test.mod.ts";

import { extend } from "./extend.ts";

import { difference, isAfter, isBefore, isDate } from "./date.ts";

extend({
  date: [difference, isAfter, isBefore, isDate]
});

async function willExtendDatePrototype() {
  const extensions = [
    ["Date.prototype.difference", "difference"],
    ["Date.prototype.isAfter", "isAfter"],
    ["Date.prototype.isBefore", "isBefore"]
  ];
  const expectation = extensions.every(([_, methodName]) => {
    return methodName in Date.prototype;
  });

  assertStrictEq(expectation, true);
}

async function willExtendDateConstructor() {
  const extensions = [["Date.isDate", "isDate"]];
  const expectation = extensions.every(([_, methodName]) => {
    return methodName in Date;
  });

  assertStrictEq(expectation, true);
}

prepareTest(
  [willExtendDateConstructor, willExtendDatePrototype],
  "jsmodern",
  "date"
);
