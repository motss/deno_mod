import { runBenchmarks } from "./bench.mod.ts";

import "./deep_clone/mod_bench.ts";
import "./normalize_diacritics/mod_bench.ts";

async function benchmark() {
  await runBenchmarks();
}

benchmark();
