import { removeDiacritics } from "./helpers.ts";

export function normalizeSync(input?: string | null) {
  if ("string" !== typeof input) {
    throw new TypeError(
      `Expected 'input' to be of type string, but received '${input}'`
    );
  }

  /**
   * NOTE(motss): Due to the fact that this module should do what we expect it to be - normalize
   * accents/ diacritics. However, some characters are not accented such as those from
   * [Latin-1 Supplement](https://bit.ly/2vz1l7m). Also see a relevant
   * [GH issue](https://bit.ly/2JbAmH0).
   *
   * Hence, to match the mental module of the users, `String.prototype.normalize` should not be used
   * as such.
   */
  return !input.length
    ? input
    : input.replace(/(\S)/g, (_, s: string) => removeDiacritics(s));
}

export async function normalize(input?: string | null) {
  return normalizeSync(input);
}

export { Diacritics, diacritics } from "./helpers.ts";
