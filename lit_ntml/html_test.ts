import { assertStrictEq, assertThrowsAsync, test } from "../test.mod.ts";

import { html } from "./mod.ts";

const helloWorld = `<h1>Hello, World!</h1>`;
const peopleList = ["John Doe", "Michael CEO", "Vict Fisherman", "Cash Black"];

async function failsWhenErrorHappens() {
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

async function willRender() {
  const d = await html`${helloWorld}`;

  assertStrictEq(
    d,
    `<!DOCTYPE html><html><head></head><body><h1>Hello, World!</h1></body></html>`
  );
}

async function willRenderWithSyncTasks() {
  const syncTask = () => helloWorld;
  const syncLiteral = "John Doe";
  const d = await html`<section>${syncTask}<h2>${syncLiteral}</h2></section>`;

  assertStrictEq(
    d,
    // tslint:disable-next-line: max-line-length
    `<!DOCTYPE html><html><head></head><body><section><h1>Hello, World!</h1><h2>John Doe</h2></section></body></html>`
  );
}

async function willRenderWithAsyncTasks() {
  const asyncTask = async () => helloWorld;
  const asyncLiteral = Promise.resolve("John Doe");
  const d = await html`<section>${asyncTask}<h2>${asyncLiteral}</h2></section>`;

  assertStrictEq(
    d,
    // tslint:disable-next-line: max-line-length
    `<!DOCTYPE html><html><head></head><body><section><h1>Hello, World!</h1><h2>John Doe</h2></section></body></html>`
  );
}

async function willRenderWithSyncAndAsyncTasks() {
  const asyncTask = async () => helloWorld;
  const syncLiteral = await "John Doe";
  const d = await html`<section>${asyncTask}<h2>${syncLiteral}</h2></section>`;

  assertStrictEq(
    d,
    // tslint:disable-next-line: max-line-length
    `<!DOCTYPE html><html><head></head><body><section><h1>Hello, World!</h1><h2>John Doe</h2></section></body></html>`
  );
}

async function willRenderAListofSyncTasks() {
  const d = await html`${helloWorld}<ul>${peopleList.map(
    n => `<li>${n}</li>`
  )}</ul>`;

  assertStrictEq(
    d,
    // tslint:disable-next-line: max-line-length
    `<!DOCTYPE html><html><head></head><body><h1>Hello, World!</h1><ul><li>John Doe</li><li>Michael CEO</li><li>Vict Fisherman</li><li>Cash Black</li></ul></body></html>`
  );
}

[
  failsWhenErrorHappens,

  willRender,
  willRenderAListofSyncTasks,
  willRenderWithAsyncTasks,
  willRenderWithSyncAndAsyncTasks,
  willRenderWithSyncTasks
].map(n => test(n));
