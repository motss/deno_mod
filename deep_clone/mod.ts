export interface DeepCloneOptions {
  absolute?: boolean;
}

import { deepAssign } from "https://cdn.jsdelivr.net/gh/denoland/deno_std@0.20.0/util/deep_assign.ts";

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
