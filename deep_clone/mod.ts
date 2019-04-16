export interface DeepCloneOptions {
  absolute?: boolean;
}

import { deepAssign } from "https://deno.land/x/std@v0.3.4/util/deep_assign.ts";

export function deepCloneSync<T>(target: T, options?: DeepCloneOptions): T {
  if (target == null) throw new TypeError(`'target' is not defined`);

  return options && options.absolute
    ? deepAssign({}, target as any)
    : JSON.parse(JSON.stringify(target));
}

export async function deepClone<T>(target: T, options?: DeepCloneOptions) {
  return deepCloneSync<T>(target, options);
}

export default deepClone;
