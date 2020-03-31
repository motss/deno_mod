import { assertStrictEq, assertThrowsAsync, prepareTest } from "../test.mod.ts";

import { MockData } from "./CONSTANTS.ts";
import { PollingObserver, OnfinishRejected, OnfinishValue } from "./mod.ts";

async function failsWhenConditionCallbackIsUndefined() {
  await assertThrowsAsync(
    async () => (new PollingObserver(undefined!) as unknown) as void,
    TypeError,
    `'conditionCallback' is not defined`
  );
}

async function failsWhenErrorOccurs() {
  const obs = new PollingObserver<MockData>(() => false);
  const task = new Promise<OnfinishRejected>(yay => {
    obs.onfinish = (d: OnfinishValue<unknown>) => yay(d as OnfinishRejected);
  });

  obs.observe(
    async () => {
      throw new Error("polling error");
    },
    { interval: 1e3 }
  );

  const { status, reason } = await task;

  assertStrictEq(status, "error");
  assertStrictEq(reason instanceof Error, true);
  assertStrictEq(reason.message, "polling error");
}

prepareTest(
  [failsWhenConditionCallbackIsUndefined, failsWhenErrorOccurs],
  "polling_observer",
  "error"
);
