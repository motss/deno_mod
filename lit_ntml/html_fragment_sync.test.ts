import { assertStrictEq, prepareTest } from "../test.mod.ts";

import { helloWorld, peopleList } from "./CONSTANTS.ts";
import { htmlFragmentSync as html } from "./mod.ts";

function willRender() {
  assertStrictEq(
    html`${helloWorld}`,
    `<h1>Hello, World!</h1>`
  );
}

function willRenderWithSyncTasks() {
  const syncTask = () => helloWorld;
  const syncLiteral = "John Doe";

  assertStrictEq(
    html`<section>${syncTask}<h2>${syncLiteral}</h2></section>`,
    // tslint:disable-next-line: max-line-length
    `<section><h1>Hello, World!</h1><h2>John Doe</h2></section>`
  );
}

function willRenderAListOfSyncTasks() {
  assertStrictEq(
    html`${helloWorld}<ul>${peopleList.map(n => `<li>${n}</li>`)}</ul>`,
    // tslint:disable-next-line: max-line-length
    `<h1>Hello, World!</h1><ul><li>John Doe</li><li>Michael CEO</li><li>Vict Fisherman</li><li>Cash Black</li></ul>`
  );
}

function willRenderExternalStyle() {
  // tslint:disable-next-line: max-line-length
  const asyncExternalStyleTask = () =>
    html`body { margin: 0; padding: 0; box-sizing: border-box; }`;

  assertStrictEq(
    html`<style>${asyncExternalStyleTask}</style>${helloWorld}`,
    // tslint:disable-next-line: max-line-length
    `<style>body { margin: 0; padding: 0; box-sizing: border-box; }</style><h1>Hello, World!</h1>`
  );
}

prepareTest(
  [
    willRender,
    willRenderAListOfSyncTasks,
    willRenderExternalStyle,
    willRenderWithSyncTasks
  ],
  "lit_ntml",
  "htmlFragmentSync"
);
