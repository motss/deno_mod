import { assertStrictEq, assertEquals, prepareTest } from "../test.mod.ts";

import { normalize } from "./mod.ts";

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

async function willNormalizeRepeatedCharacters() {
  assertStrictEq(await normalize("éééé"), "eeee");
  assertStrictEq(await normalize("åååå"), "aaaa");
  assertStrictEq(await normalize("éåéåéåéå"), "eaeaeaea");
  assertStrictEq(await normalize("åéåéåéåé"), "aeaeaeae");
}

prepareTest(
  [
    willSkipNormalizationForEmptyCharacter,
    willNormalizeSingleCharacter,
    willNormalizeAccentedCharacters,
    willNormalizeAccentedCharactersWithoutUsingNativeFunction,
    willReturnOriginalCharacterWhenNoMatchFound,
    willNormalizeNonAccentedCharacter,
    willNormalizeRepeatedCharacters
  ],
  "normalize_diacritics"
);
