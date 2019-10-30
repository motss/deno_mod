import { test as testFn } from "https://cdn.jsdelivr.net/gh/denoland/deno@0.21.0/std/testing/mod.ts";
import { cyan, yellow } from "https://cdn.jsdelivr.net/gh/denoland/deno@0.21.0/std/fmt/colors.ts";

export * from "https://cdn.jsdelivr.net/gh/denoland/deno@0.21.0/std/testing/mod.ts";
export * from "https://cdn.jsdelivr.net/gh/denoland/deno@0.21.0/std/testing/asserts.ts";

export function prepareTest(tests: (() => any)[], name: string, prefix: string = "") {
  return tests.map(n => testFn({ name: `${cyan(name)} ${prefix && yellow(prefix) + " "}${n.name}`, fn: n}));
}
