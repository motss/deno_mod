type Exclude<T, U> = T extends U ? never : T;
type ResponseType =
  | "basic"
  | "cors"
  | "default"
  | "error"
  | "opaque"
  | "opaqueredirect";

import { Body, RequestInit, Response } from "https://denopkg.com/denoland/deno/js/dom_types.ts";

export interface FetchAsInfo extends Pick<Response, 'type'> {
  headers: UnknownRecord;
}
export interface FetchAsReturnType<T = any, U = any> {
  status: number;
  info: FetchAsInfo;

  data?: T;
  error?: U;
}

type FetchType = Exclude<keyof Body, 'body' | 'bodyUsed'>;
type UnknownRecord = Record<string, unknown>;

function getResponseHeaders(headers: Headers) {
  const d: UnknownRecord = {};

  for (const [k, v] of headers) {
    d[k] = v;
  }

  return d;
}

function fetchAs<T, U>(fetchType: FetchType): (
  url: string,
  options?: RequestInit
) => Promise<FetchAsReturnType<T, U>> {
  return async (url: string, options?: RequestInit): Promise<FetchAsReturnType<T, U>> => {
    let status = -1;
    let headers: UnknownRecord = {};
    let type: ResponseType = 'basic';

    try {
      const r: Response = await fetch(url, options);
      const d = await r[fetchType]();

      status = r.status;
      headers = getResponseHeaders(r.headers);
      type = r.type;

      return {
        status,
        info: { headers, type },
        [status > 399 ? 'error' : 'data']: d,
      };
    } catch (e) {
      return {
        status,
        info: { headers, type },
        error: e,
      };
    }
  };
}

export async function fetchAsArrayBuffer<T = ArrayBuffer, U = ArrayBuffer>(
  url: string,
  options?: RequestInit
) {
  return fetchAs<T, U>('arrayBuffer')(url, options);
}

export async function fetchAsBlob<T = Blob, U = Blob>(url: string, options?: RequestInit) {
  return fetchAs<T, U>('blob')(url, options);
}

export async function fetchAsJson<T = {}, U = {}>(url: string, options?: RequestInit) {
  return fetchAs<T, U>('json')(url, options);
}

export async function fetchAsText<T = string, U = any>(url: string, options?: RequestInit) {
  return fetchAs<T, U>('text')(url, options);
}

export async function fetchAsFormData<T = string, U = any>(url: string, options?: RequestInit) {
  return fetchAs<T, U>('formData')(url, options);
}

export const arrayBuffer = fetchAsArrayBuffer;
export const blob = fetchAsBlob;
export const json = fetchAsJson;
export const text = fetchAsText;
export const formData = fetchAsFormData;
