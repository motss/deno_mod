import { assertThrowsAsync, prepareTest } from "../test.mod.ts";

import { normalize } from "./mod.ts";

async function failsWhenInvalidInput() {
  await assertThrowsAsync(
    async () => (normalize(null) as unknown) as void,
    TypeError,
    `Expected 'input' to be of type string, but received 'null'`
  );
}

async function failsWhenInputIsUndefined() {
  await assertThrowsAsync(
    async () => (normalize() as unknown) as void,
    TypeError,
    `Expected 'input' to be of type string, but received 'undefined'`
  );
}

prepareTest(
  [failsWhenInputIsUndefined, failsWhenInvalidInput],
  "normalize_diacritics",
  "error"
);
