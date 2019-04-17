import { parse, parseFragment, serialize } from "../npm/dist/parse5.js";

async function processLiterals(
  strings: TemplateStringsArray,
  ...exps: any[]
): Promise<string> {
  const listTask = exps.map(async n => {
    const tasks = (Array.isArray(n) ? n : [n]).map(async o =>
      "function" === typeof o ? o() : o
    );

    return Promise.all(tasks);
  });
  const done = await Promise.all(listTask);
  const doneLen = done.length;

  return strings.reduce((p, n, i) => {
    const nTask = done[i];
    const joined = Array.isArray(nTask) ? nTask.join("") : nTask;
    return `${p}${i >= doneLen ? n : `${n}${joined}`}`;
  }, "");
}

async function parsePartial(
  fn: typeof parse | typeof parseFragment,
  strings: TemplateStringsArray,
  ...exps: any[]
) {
  try {
    const content = await processLiterals(strings, ...exps);
    return serialize(fn(content));
  } catch (e) {
    throw e;
  }
}

export const html = async (s: TemplateStringsArray, ...e: any[]) =>
  parsePartial((c: unknown) => parse(`<!doctype html>${c}`), s, ...e);
export const htmlFragment = async (s: TemplateStringsArray, ...e: any[]) =>
  parsePartial(parseFragment, s, ...e);

export default { html, htmlFragment };
