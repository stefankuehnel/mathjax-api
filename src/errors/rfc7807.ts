import type { Context } from "hono";
import { z } from "@hono/zod-openapi";

const HTTP_STATUS_CODES = [
  100, 511, 102, 103, 200, 201, 202, 203, 206, 207, 208, 226, 300, 301, 302,
  303, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409,
  410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 425, 426,
  428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, -1,
] as const satisfies readonly number[];

export const RFC7807ErrorJSONSchema = z
  .object({
    type: z.string().openapi({
      description: "A URI reference that identifies the problem type",
    }),
    title: z.string().openapi({
      description: "A short, human-readable summary of the problem type",
    }),
    status: z.union(HTTP_STATUS_CODES.map((code) => z.literal(code))).openapi({
      description: "The HTTP status code",
    }),
    detail: z.string().openapi({
      description:
        "A human-readable explanation specific to this occurrence of the problem",
    }),
    instance: z.string().optional().openapi({
      description:
        "A URI reference that identifies the specific occurrence of the problem",
    }),
  })
  .openapi("RFC7807ErrorJSON");

export type RFC7807ErrorJSONType = z.infer<typeof RFC7807ErrorJSONSchema>;

export const rfc7807Error = (
  c: Context,
  type: RFC7807ErrorJSONType["type"],
  title: RFC7807ErrorJSONType["title"],
  status: RFC7807ErrorJSONType["status"],
  detail: RFC7807ErrorJSONType["detail"],
  instance: RFC7807ErrorJSONType["instance"],
) => {
  return c.body(
    JSON.stringify({
      type,
      title,
      status,
      detail,
      instance: instance ?? c.req.path,
    }),
    status,
    { "Content-Type": "application/problem+json" },
  );
};

export const badRequest = (c: Context, detail: string, instance?: string) =>
  rfc7807Error(
    c,
    "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400",
    "Bad Request",
    400,
    detail,
    instance,
  );

export const notFound = (c: Context, detail: string, instance?: string) =>
  rfc7807Error(
    c,
    "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404",
    "Not Found",
    404,
    detail,
    instance,
  );

export const internalServerError = (
  c: Context,
  detail: string,
  instance?: string,
) =>
  rfc7807Error(
    c,
    "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500",
    "Internal Server Error",
    500,
    detail,
    instance,
  );
