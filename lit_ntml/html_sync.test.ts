import { assertStrictEq, prepareTest } from "../test.mod.ts";

import { helloWorld, peopleList } from "./CONSTANTS.ts";
import { htmlSync as html } from "./mod.ts";

function willRender() {
  assertStrictEq(
    html`${helloWorld}`,
    `<!DOCTYPE html><html><head></head><body><h1>Hello, World!</h1></body></html>`
  );
}

function willRenderWithSyncTasks() {
  const syncTask = () => helloWorld;
  const syncLiteral = "John Doe";

  assertStrictEq(
    html`<section>${syncTask}<h2>${syncLiteral}</h2></section>`,
    // tslint:disable-next-line: max-line-length
    `<!DOCTYPE html><html><head></head><body><section><h1>Hello, World!</h1><h2>John Doe</h2></section></body></html>`
  );
}


function willRenderAListOfSyncTasks() {
  assertStrictEq(
    html`${helloWorld}<ul>${peopleList.map(n => `<li>${n}</li>`)}</ul>`,
    // tslint:disable-next-line: max-line-length
    `<!DOCTYPE html><html><head></head><body><h1>Hello, World!</h1><ul><li>John Doe</li><li>Michael CEO</li><li>Vict Fisherman</li><li>Cash Black</li></ul></body></html>`
  );
}

prepareTest(
  [
    willRender,
    willRenderAListOfSyncTasks,
    willRenderWithSyncTasks
  ],
  "lit_ntml",
  "htmlSync"
);
