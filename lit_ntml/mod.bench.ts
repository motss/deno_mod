import { bench, BenchmarkTimer } from "../bench.mod.ts";

import {
  html,
  htmlFragment,
  htmlFragmentSync,
  htmlSync
} from "./mod.ts";

const runs = 3;
const iter = 1e3;

bench({
  runs,
  name: `runs${runs}ForHtmlX${iter}s`,
  async func(b: BenchmarkTimer) {
    b.start();
    for (let i = 0; i < iter; i += 1) {
      await html`<h1 class="main-title--${Math.random()
        .toString(16)
        .slice(-7)}">Hello, World</h1>`;
    }
    b.stop();
  }
});

bench({
  runs,
  name: `runs${runs}ForHtmlFragmentX${iter}s`,
  async func(b: BenchmarkTimer) {
    b.start();
    for (let i = 0; i < iter; i += 1) {
      await htmlFragment`<h1 class="main-title--${Math.random()
        .toString(16)
        .slice(-7)}">Hello, World</h1>`;
    }
    b.stop();
  }
});

bench({
  runs,
  name: `runs${runs}ForHtmlFragmentSyncX${iter}s`,
  func(b: BenchmarkTimer) {
    b.start();
    for (let i = 0; i < iter; i += 1) {
      htmlFragmentSync`<h1 class="main-title--${Math.random()
        .toString(16)
        .slice(-7)}">Hello, World</h1>`;
    }
    b.stop();
  }
});

bench({
  runs,
  name: `runs${runs}ForHtmlSyncX${iter}s`,
  func(b: BenchmarkTimer) {
    b.start();
    for (let i = 0; i < iter; i += 1) {
      htmlSync`<h1 class="main-title--${Math.random()
        .toString(16)
        .slice(-7)}">Hello, World</h1>`;
    }
    b.stop();
  }
});
