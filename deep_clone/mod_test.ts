import {
  equal,
  assert,
  assertStrictEq,
  assertThrowsAsync,
  test
} from "../test.mod.ts";

import { deepClone, deepCloneSync } from "./mod.ts";

const towno = {
  a: {
    b: {
      c: {
        d: {
          e: [1, 2, 3],
          f: "random-string",
          g: () => null,
          re: /haha/gi,
          createdAt: new Date()
        }
      }
    },
    j: 999,
    k: [
      {
        l: {
          m: {
            n: 0
          }
        }
      },
      {
        o: 999
      },
      {
        p: [
          {
            q: 999,
            r: [
              {
                s: {
                  t: {
                    u: "deep-string"
                  }
                }
              },
              {
                v: null
              },
              Symbol(
                Math.random()
                  .toString(16)
                  .slice(-7)
              )
            ]
          },
          {
            w: () => null,
            re: /^hello\sworld/gi
          },
          {
            x: {
              y: {
                z: [1, 2]
              }
            }
          }
        ]
      }
    ]
  },
  h: [1, 2],
  i: "random-string-depth-0",
  j: Symbol("haha")
};
const owno = {
  a: {
    b: {
      c: {
        d: [1, 2, 3]
      }
    },
    e: {
      f: 111,
      g: "deep-string",
      h: [
        { i: 999 },
        {
          j: [
            {
              k: {
                l: "deep-string"
              }
            }
          ]
        }
      ]
    },
    m: null
  },
  n: 999
};
const awno = [
  [
    [
      {
        a: {
          b: [
            {
              c: [
                [
                  {
                    d: 999
                  }
                ]
              ]
            }
          ]
        },
        e: [[1, 2, 3]]
      }
    ],
    "deep-string",
    1,
    2
  ],
  null,
  "deep-string",
  [1, 2]
];

async function failsWhenDeeplyCloneNull() {
  assertThrowsAsync(
    async () => {
      const nu = null;
      await deepClone(nu);
    },
    TypeError,
    `'target' is not defined`
  );
}

async function failsWhenDeeplyCloneUndefined() {
  assertThrowsAsync(
    async () => {
      const nu = void 0;
      await deepClone(nu);
    },
    TypeError,
    `'target' is not defined`
  );
}

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

function willDeepCloneSync() {
  const dc = deepCloneSync(owno);

  assert(equal(dc, owno));
}

function willDeepCloneSyncWithAbsoluteFlag() {
  const dc = deepCloneSync(towno, { absolute: true });

  assert(equal(dc, towno));
}

[
  failsWhenDeeplyCloneNull,
  failsWhenDeeplyCloneUndefined,

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
  willDeepCloningWithAbsoluteFlagBeforeMutatingClonedObject,

  willDeepCloneSync,
  willDeepCloneSyncWithAbsoluteFlag
].map(n => test(n));
