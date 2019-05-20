import {
  assertStrictEq,
  assertEquals,
  assertThrowsAsync,
  prepareTest,
} from "../test.mod.ts";

import { normalize } from "./mod.ts";

async function failsWhenInvalidInput() {
  await assertThrowsAsync(
    async () => (normalize(null) as unknown) as void,
    TypeError,
    `Expected 'input' to be of type string, but received 'null'`
  );
}

async function failsWhenInputIsUndefined() {
  await assertThrowsAsync(
    async () => (normalize() as unknown) as void,
    TypeError,
    `Expected 'input' to be of type string, but received 'undefined'`
  );
}

async function willSkipNormalizationForEmptyCharacter() {
  assertStrictEq(await normalize(""), "");
}

async function willNormalizeAccentedCharacters() {
  const strs = [
    "Åland Islands",
    "Saint Barthélemy",
    "Cocos (Keeling) Islands",
    "Côte d'Ivoire",
    "Curaçao",
    "Réunion"
  ];

  assertEquals(await Promise.all(strs.map(async n => normalize(n))), [
    "Aland Islands",
    "Saint Barthelemy",
    "Cocos (Keeling) Islands",
    "Cote d'Ivoire",
    "Curacao",
    "Reunion"
  ]);
}

async function willNormalizeAccentedCharactersWithoutUsingNativeFunction() {
  const cachedFn = String.prototype.normalize;
  String.prototype.normalize = null!;

  try {
    assertStrictEq(await normalize("Réunion"), "Reunion");
  } catch (e) {
    throw e;
  } finally {
    String.prototype.normalize = cachedFn;
  }
}

async function willReturnOriginalCharacterWhenNoMatchFound() {
  assertStrictEq(await normalize("2 ÷ 2 = 1"), "2 ÷ 2 = 1");
}

async function willNormalizeSingleCharacter() {
  assertStrictEq(await normalize("ô"), "o");
}

async function willNormalizeNonAccentedCharacter() {
  assertStrictEq(await normalize("tromsø"), "tromso");
  assertStrictEq(await normalize("\u00d8"), "O");
}

prepareTest([
  failsWhenInvalidInput,
  failsWhenInputIsUndefined,

  willSkipNormalizationForEmptyCharacter,
  willNormalizeSingleCharacter,
  willNormalizeAccentedCharacters,
  willNormalizeAccentedCharactersWithoutUsingNativeFunction,
  willReturnOriginalCharacterWhenNoMatchFound,
  willNormalizeNonAccentedCharacter
], "normalize_diacritics");
