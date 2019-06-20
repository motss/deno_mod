import { bench, BenchmarkTimer } from "../bench.mod.ts";

import { delayUntil } from "./mod.ts";

const runs = 3;
const iter = 1e3;

bench({
  runs,
  name: `runs${runs}ForDelayUntilX${iter}s`,
  async func(b: BenchmarkTimer) {
    b.start();
    for (let i = 0; i < iter; i += 1) {
      /** No delay */
      await delayUntil();
    }
    b.stop();
  }
});
