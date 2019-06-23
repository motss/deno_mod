import "./error.test.ts";
import "./fetch_as.test.ts";

import { Status } from "https://deno.land/x/std@v0.9.0/http/http_status.ts";
import { HttpException } from "https://deno.land/x/abc@v0.1.7/http_exception.ts";
import { abc } from "https://deno.land/x/abc@v0.1.7/mod.ts";

export const mock = abc();

mock
  .get("/ok", () => {
    return "Hello, World!";
  })
  .get("/json", () => {
    return { data: "Hello, World!" };
  })
  .get("/error", () => {
    throw new HttpException({ status: Status.Forbidden, error: "Forbidden" }, Status.Forbidden);
  });

mock.start("0.0.0.0:5353");
