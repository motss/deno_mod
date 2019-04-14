import { bench, BenchmarkTimer } from "../bench.mod.ts";

import { deepClone, deepCloneSync } from "./mod.ts";

const runs = 3;
const iter = 1e3;

bench({
  runs,
  name: `runs${runs}ForDeepCloneX${iter}s`,
  async func(b: BenchmarkTimer) {
    b.start();
    for (let i = 0; i < runs; i += 1) {
      await deepClone({
        a: {
          b: { c: [1, 2, 3] },
          e: [{ f: null }]
        },
        d: "deep",
        e: Math.random()
          .toString(16)
          .slice(-7)
      });
    }
    b.stop();
  }
});

bench({
  runs,
  name: `runs${runs}ForDeepCloneAbsoluteX${iter}s`,
  async func(b: BenchmarkTimer) {
    b.start();
    for (let i = 0; i < 1e3; i += 1) {
      await deepClone(
        {
          a: () => {},
          b: /test/gi,
          c: [1, 2],
          d: new Date(),
          e: { f: 111 },
          f: Math.random()
            .toString(16)
            .slice(-7)
        },
        { absolute: true }
      );
    }
    b.stop();
  }
});

bench({
  runs,
  name: `runs${runs}ForDeepCloneSyncX${iter}s`,
  func(b: BenchmarkTimer) {
    b.start();
    for (let i = 0; i < runs; i += 1) {
      deepCloneSync({
        a: {
          b: { c: [1, 2, 3] },
          e: [{ f: null }]
        },
        d: "deep",
        e: Math.random()
          .toString(16)
          .slice(-7)
      });
    }
    b.stop();
  }
});

bench({
  runs,
  name: `runs${runs}ForDeepCloneSyncAbsoluteX${iter}s`,
  func(b: BenchmarkTimer) {
    b.start();
    for (let i = 0; i < 1e3; i += 1) {
      deepCloneSync(
        {
          a: () => {},
          b: /test/gi,
          c: [1, 2],
          d: new Date(),
          e: { f: 111 },
          f: Math.random()
            .toString(16)
            .slice(-7)
        },
        { absolute: true }
      );
    }
    b.stop();
  }
});
