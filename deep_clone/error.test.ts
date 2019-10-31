import { assertThrowsAsync, prepareTest } from "../test.mod.ts";

import { deepClone } from "./mod.ts";

async function failsWhenDeeplyCloneNull() {
  assertThrowsAsync(
    async () => {
      const nu = null;
      await deepClone(nu);
    },
    TypeError,
    `'target' is not defined`
  );
}

async function failsWhenDeeplyCloneUndefined() {
  assertThrowsAsync(
    async () => {
      const nu = void 0;
      await deepClone(nu);
    },
    TypeError,
    `'target' is not defined`
  );
}

prepareTest(
  [failsWhenDeeplyCloneNull, failsWhenDeeplyCloneUndefined],
  "deep_clone",
  "error"
);
