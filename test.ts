import { runTests } from "./test.mod.ts";

// import "./deep_clone/mod.test.ts";
// import "./delay_until/mod.test.ts";
// import "./lit_ntml/mod.test.ts";
// import "./normalize_diacritics/mod.test.ts";
// import "./polling_observer/mod.test.ts";

import "./fetch_as/mod.test.ts";

import { mock } from "./fetch_as/mod.test.ts";

async function test() {
  await runTests({ parallel: true });
  // console.log('tests completed', mock.close());
}

test();
