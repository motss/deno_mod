export interface DeepCloneOptions {
  absolute?: boolean;
}

import clonedeep from "https://unpkg.com/lodash-es@latest/cloneDeep.js";

export function deepCloneSync<T>(target: T, options?: DeepCloneOptions) {
  if (target == null) throw new TypeError(`'target' is not defined`);

  return (options && options.absolute
    ? clonedeep(target)
    : JSON.parse(JSON.stringify(target))) as T;
}

export async function deepClone<T>(target: T, options?: DeepCloneOptions) {
  return deepCloneSync<T>(target, options);
}

export default deepClone;
