import { runBenchmarks } from "./bench.mod.ts";

import "./deep_clone/mod.bench.ts";
import "./delay_until/mod.bench.ts";
import "./lit_ntml/mod.bench.ts";
import "./normalize_diacritics/mod.bench.ts";
import "./polling_observer/mod.bench.ts";

async function benchmark() {
  await runBenchmarks();
}

benchmark();
