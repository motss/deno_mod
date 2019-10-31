import { assertStrictEq, prepareTest } from "../test.mod.ts";

import { extend } from "./extend.ts";

import { isSymbol } from "./symbol.ts";

extend({
  symbol: [isSymbol]
});

async function willExtendSymbolConstructor() {
  const extensions = [["Symbol.isSymbol", "isSymbol"]];
  const expectation = extensions.every(([_, methodName]) => {
    return methodName in Symbol;
  });

  assertStrictEq(expectation, true);
}

prepareTest([willExtendSymbolConstructor], "jsmodern", "symbol");
