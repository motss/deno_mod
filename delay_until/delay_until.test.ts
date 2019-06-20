import { assertStrictEq, prepareTest } from "../test.mod.ts";

import { delayUntil } from './mod.ts';

function willDelay() {
  delayUntil(3e3)
    .then((r: unknown) => assertStrictEq(r, void 0));
}

function willResolveWithOptionalDelay() {
  delayUntil()
    .then((r: unknown) => assertStrictEq(r, void 0));
}

function willResolveWithDelayFallbacksTo0() {
  delayUntil(null!)
    .then((r: unknown) => assertStrictEq(r, void 0));
}

prepareTest([
  willDelay,
  willResolveWithDelayFallbacksTo0,
  willResolveWithOptionalDelay,
], "delay_until");
