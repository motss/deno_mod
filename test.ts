import { runTests } from "./test.mod.ts";

import "./deep_clone/mod.test.ts";
import "./delay_until/mod.test.ts";
import "./jsmodern/mod.test.ts";
import "./lit_ntml/mod.test.ts";
import "./normalize_diacritics/mod.test.ts";
import "./polling_observer/mod.test.ts";

async function test() {
  await runTests({ parallel: true });
}

test();
