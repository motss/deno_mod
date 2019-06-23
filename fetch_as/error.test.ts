import { assertStrictEq, equal, prepareTest } from "../test.mod.ts";

import { json } from "./mod.ts";

const { ErrorKind } = window.Deno;

async function failsWhenInvalidURL() {
  const { status, error } = await json("/invalid-url");

  assertStrictEq(status, -1);
  assertStrictEq(error instanceof Error, true);
  assertStrictEq(error.kind, ErrorKind.RelativeUrlWithoutBase);
  assertStrictEq(error.name, "RelativeUrlWithoutBase");
  assertStrictEq(error.message, "relative URL without a base");
}

async function failsWhenForbidden() {
  const { status, error } = await json("http://127.0.0.1:5353/error");

  assertStrictEq(status, 403);
  equal(error, { status: 403, error: "Forbidden" });
}

prepareTest([
  failsWhenInvalidURL,
  failsWhenForbidden,
], "fetch_as", "error");
