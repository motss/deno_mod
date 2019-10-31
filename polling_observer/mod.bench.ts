import { bench, BenchmarkTimer } from "../bench.mod.ts";

import { PollingObserver } from "./mod.ts";

const runs = 3;
const iter = 1e3;

bench({
  runs,
  name: `runs${runs}ForPollingObserverWithSyncConditionCallbackX${iter}s`,
  async func(b: BenchmarkTimer) {
    let i = iter;

    b.start();
    while (i) {
      /** NOTE(motss): Test how long it takes to instantiate, run polling, then disconnect */
      const obs = new PollingObserver(() => true);
      const task = new Promise(yay => (obs.onfinish = yay));
      obs.observe(async () => new Promise(yay => setTimeout(yay, 1)), {
        interval: 1,
        timeout: 1e3
      });

      await task;
      obs.disconnect();
      i -= 1;
    }
    b.stop();
  }
});

bench({
  runs,
  name: `runs${runs}ForPollingObserverWithAsyncConditionCallbackX${iter}s`,
  async func(b: BenchmarkTimer) {
    let i = iter;

    b.start();
    while (i) {
      /** NOTE(motss): Test how long it takes to instantiate, run polling, then disconnect */
      const obs = new PollingObserver(async () => true);
      const task = new Promise(yay => (obs.onfinish = yay));
      obs.observe(async () => new Promise(yay => setTimeout(yay, 1)), {
        interval: 1,
        timeout: 1e3
      });

      await task;
      obs.disconnect();
      i -= 1;
    }
    b.stop();
  }
});
