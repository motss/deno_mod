import {
  cyan,
  yellow
} from "https://cdn.jsdelivr.net/gh/denoland/deno@0.41.0/std/fmt/colors.ts";

export * from "https://cdn.jsdelivr.net/gh/denoland/deno@0.41.0/std/testing/asserts.ts";

export function prepareTest(
  tests: (() => any)[],
  name: string,
  prefix: string = ""
) {
  return tests.map(n =>
    Deno.test({
      name: `${cyan(name)} ${prefix && yellow(prefix) + " "}${n.name}`,
      fn: n
    })
  );
}
