import { runTests } from './test.mod.ts';

import './deep_clone/mod_test.ts';
import './normalize_diacritics/mod_test.ts';

async function test() {
  await runTests();
}

test();