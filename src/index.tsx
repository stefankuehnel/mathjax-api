import { VERSION } from "./version";

import { showRoutes } from "hono/dev";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { requestId } from "hono/request-id";

import { OpenAPIHono } from "@hono/zod-openapi";

import { Scalar } from "@scalar/hono-api-reference";

import { ZodError } from "zod";

import { badRequest, internalServerError, notFound } from "@errors/rfc7807";

import HonoRouter from "@routes";

const app = new OpenAPIHono();

app.use(requestId());
app.use(etag());
app.use(logger());

app.get("/", (c) => {
  return c.redirect("/docs");
});

app.doc(`/openapi.json`, {
  openapi: "3.0.0",
  info: {
    version: VERSION,
    title: "MathJax API",
    description:
      "An API for rendering TeX strings to SVG images. Use this API to convert mathematical notation into scalable vector graphics.",
    contact: {
      name: "API Support",
      url: "https://codeberg.org/stefankuehnel/mathjax-api/issues",
    },
    license: {
      name: "GPL-3.0",
      url: "https://opensource.org/license/gpl-3.0",
    },
  },
  servers: [
    {
      url: "/",
      description: "MathJax API Server",
    },
  ],
});

app.get(
  `/docs`,
  Scalar({
    url: `/openapi.json`,
    pageTitle: `MathJax API v${VERSION}`,
    theme: "default",
    darkMode: true,
  }),
);

app.route("/", HonoRouter);

app.onError((err, c) => {
  console.error(err);

  if (err instanceof ZodError) {
    const detail = err.issues
      .map((e) => `${e.path.join(".")}: ${e.message}`)
      .join("; ");
    return badRequest(c, detail, c.req.path);
  }

  return internalServerError(c, "An unexpected error occurred");
});

app.notFound((c) => {
  return notFound(c, `Route ${c.req.method} ${c.req.path} not found`);
});

showRoutes(app);

export default app;
