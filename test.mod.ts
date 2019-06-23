
import { test as testFn } from "https://deno.land/x/std@v0.9.0/testing/mod.ts";
import { cyan, yellow } from "https://deno.land/x/std@v0.9.0/colors/mod.ts";

export function prepareTest(tests: (() => any)[], name: string, prefix: string = "") {
  return tests.map(n => testFn({ name: `${cyan(name)} ${prefix && yellow(prefix) + " "}${n.name}`, fn: n}));
}

export * from "https://deno.land/x/std@v0.9.0/testing/mod.ts";
export * from "https://deno.land/x/std@v0.9.0/testing/asserts.ts";
