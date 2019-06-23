import { arrayBuffer, blob, json, text } from "./mod.ts";
import { assertStrictEq, equal, prepareTest } from "../test.mod.ts";

export const url = 'http://127.0.0.1:5353';

async function willFetchAsArrayBuffer() {
  const d = await arrayBuffer(`${url}/ok`);

  assertStrictEq(d.status, 200);
  assertStrictEq(d.data.byteLength, 13);
  assertStrictEq(new TextDecoder().decode(d.data), 'Hello, World!');
}

async function willFetchAsBlob() {
  const d = await blob(`${url}/ok`);

  assertStrictEq(d.status, 200);
  assertStrictEq(d.data.size, 13);
  assertStrictEq(d.data.type, 'text/plain');
  /** Missing FileReader API */
  // assertStrictEq(await d.data.text(), 'Hello, World!');
}

async function willFetchAsJson() {
  const d = await json(`${url}/json`);

  assertStrictEq(d.status, 200);
  equal(d.data, { data: "Hello, World!" });
}

async function willFetchAsText() {
  const d = await text(`${url}/ok`);

  assertStrictEq(d.status, 200);
  assertStrictEq(d.data, "Hello, World!");
}

// async function willFetchAsFormData() {
//   const d = await formData(`${url}/form-data`, {
//     method: "POST",
//     headers: { "content-type": "multipart/form-data; boundary=test" },
//   });

//   assertStrictEq(d.status, 200);
//   assertStrictEq(d.data, "");
// }

prepareTest([
  willFetchAsArrayBuffer,
  willFetchAsBlob,
  willFetchAsJson,
  willFetchAsText,
  // willFetchAsFormData,
], "fetch_as");
