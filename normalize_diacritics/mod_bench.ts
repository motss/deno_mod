import { bench, BenchmarkTimer } from "../bench.mod.ts";

import { normalize, normalizeSync } from "./mod.ts";

const runs = 3;
const iter = 1e3;

bench({
  runs,
  name: `runs${runs}ForNormalizeDiacriticsX${iter}s`,
  async func(b: BenchmarkTimer) {
    b.start();
    for (let i = 0; i < iter; i += 1) {
      await normalize(
        `söme stüff with áccènts ${Math.random()
          .toString(16)
          .slice(-7)}`
      );
    }
    b.stop();
  }
});

bench({
  runs,
  name: `runs${runs}ForNormalizeDiacriticsSyncX${iter}s`,
  func(b: BenchmarkTimer) {
    b.start();
    for (let i = 0; i < iter; i += 1) {
      normalizeSync(
        `söme stüff with áccènts ${Math.random()
          .toString(16)
          .slice(-7)}`
      );
    }
    b.stop();
  }
});
