import { test as testFn } from "https://cdn.jsdelivr.net/gh/denoland/deno_std@0.20.0/testing/mod.ts";
import { cyan, yellow } from "https://cdn.jsdelivr.net/gh/denoland/deno_std@0.20.0/fmt/colors.ts";

export * from "https://cdn.jsdelivr.net/gh/denoland/deno_std@0.20.0/testing/mod.ts";
export * from "https://cdn.jsdelivr.net/gh/denoland/deno_std@0.20.0/testing/asserts.ts";

export function prepareTest(tests: (() => any)[], name: string, prefix: string = "") {
  return tests.map(n => testFn({ name: `${cyan(name)} ${prefix && yellow(prefix) + " "}${n.name}`, fn: n}));
}
