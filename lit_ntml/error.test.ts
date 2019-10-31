import { assertThrowsAsync, prepareTest } from "../test.mod.ts";

import { html, htmlFragment } from "./mod.ts";

async function failsWhenHtmlThrowsError() {
  await assertThrowsAsync(
    async () => {
      const errorContent = async () => {
        throw new Error("error");
      };
      await html`${errorContent}`;
    },
    Error,
    "error"
  );
}

async function failsWhenHtmlFragmentThrowsError() {
  await assertThrowsAsync(
    async () => {
      const errorContent = async () => {
        throw new Error("error");
      };
      await htmlFragment`${errorContent}`;
    },
    Error,
    "error"
  );
}

prepareTest(
  [failsWhenHtmlFragmentThrowsError, failsWhenHtmlThrowsError],
  "lit_ntml",
  "error"
);
