import { equal, assert, assertStrictEq, prepareTest } from "../test.mod.ts";

import { deepClone } from "./mod.ts";
import { owno, awno, towno } from "./CONSTANTS.ts";

async function willDeeplyCloneNestedObject() {
  assert(equal(await deepClone(owno), owno));
}

async function willTrulyDeepCloneNestedObject() {
  const dc = await deepClone<any>(owno);

  dc.a.b.c = {};
  dc.e = {};

  assert(!equal(dc, owno));
}

async function willDeeplyCloneNestedArray() {
  assert(equal(await deepClone(awno), awno));
}

async function willTrulyDeepCloneNestedArray() {
  const dc = await deepClone<any>(awno);

  dc[0][0][0].a = {};

  assert(!equal(dc, awno));
}

async function willDeeplyCloneNonNestedObject() {
  const shallowObj = {
    a: "shallow-string",
    b: [1, 2, 3],
    c: 999,
    d: null
  };
  const dc = await deepClone(shallowObj);

  assert(equal(dc, shallowObj));
}

async function willTrulyDeepCloneNonNestedObject() {
  const shallowObj = {
    a: "shallow-string",
    b: [1, 2, 3],
    c: 999,
    d: null
  };
  const dc = await deepClone(shallowObj);

  delete dc.a;
  delete dc.b;
  delete dc.c;
  delete dc.d;

  assert(!equal(dc, shallowObj));
}

async function willDeeplyCloneNonNestedArray() {
  const shallowArr = [null, 1, 2, { a: 1 }, "shallow-string"];
  const dc = await deepClone(shallowArr);

  assert(equal(dc, shallowArr));
}

async function willTrulyDeepCloneNonNestedArray() {
  const shallowArr = [null, 1, 2, { a: 1 }, "shallow-string"];
  const dc = await deepClone<any>(shallowArr);

  dc[3] = {};

  assert(!equal(dc, shallowArr));
}

async function willDeepCloneString() {
  const str = "just a string";
  const dc = await deepClone(str);

  assertStrictEq(dc, str);
}

async function willDeepCloneNumber() {
  const num = 999;
  const dc = await deepClone(num);

  assertStrictEq(dc, num);
}

async function willDeepCloneBoolean() {
  const bool = !0;
  const dc = await deepClone(bool);

  assertStrictEq(dc, bool);
}

async function willDeepCloningWithAbsoluteFlag() {
  const dc = await deepClone(towno, { absolute: true });

  assert(equal(dc, towno));
}

async function willDeepCloningWithAbsoluteFlagBeforeMutatingClonedObject() {
  const dc = await deepClone<any>(towno, { absolute: true });

  dc.a.b = {};

  assert(!equal(dc, towno));
}

prepareTest(
  [
    willDeeplyCloneNestedObject,
    willTrulyDeepCloneNestedObject,

    willDeeplyCloneNestedArray,
    willTrulyDeepCloneNestedArray,

    willDeeplyCloneNonNestedObject,
    willTrulyDeepCloneNonNestedObject,

    willDeeplyCloneNonNestedArray,
    willTrulyDeepCloneNonNestedArray,

    willDeepCloneString,
    willDeepCloneNumber,
    willDeepCloneBoolean,

    willDeepCloningWithAbsoluteFlag,
    willDeepCloningWithAbsoluteFlagBeforeMutatingClonedObject
  ],
  "deep_clone"
);
