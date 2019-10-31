import { assertStrictEq, prepareTest } from "../test.mod.ts";

import { delayUntil } from "./mod.ts";

async function willDelay() {
  const r = await delayUntil(3e3);

  assertStrictEq(r, void 0);
}

async function willResolveWithOptionalDelay() {
  const r = await delayUntil();

  assertStrictEq(r, void 0);
}

async function willResolveWithDelayFallbacksTo0() {
  const r = await delayUntil(null!);

  assertStrictEq(r, void 0);
}

prepareTest(
  [willDelay, willResolveWithDelayFallbacksTo0, willResolveWithOptionalDelay],
  "delay_until"
);
