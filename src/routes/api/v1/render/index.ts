import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { Mathjax } from "@lib/mathjax";
import {
  badRequest,
  internalServerError,
  RFC7807ErrorJSONSchema,
} from "@errors/rfc7807";
import { QuerySchema } from "@routes/api/v1/render/query.schema";
import { ResponseSchema } from "@routes/api/v1/render/response.schema";

const mathjax = new Mathjax();

const HonoAPIV1RenderRouter = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      const detail = result.error.issues
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join("; ");
      return badRequest(c, detail, c.req.path);
    }
  },
});

const route = createRoute({
  method: "get",
  path: `/api/v1/render`,
  request: {
    query: QuerySchema,
  },
  responses: {
    200: {
      content: {
        "image/svg+xml": {
          schema: ResponseSchema,
        },
      },
      description: "SVG image",
    },
    400: {
      content: {
        "application/problem+json": {
          schema: RFC7807ErrorJSONSchema,
        },
      },
      description: "Bad request",
    },
    413: {
      content: {
        "application/problem+json": {
          schema: RFC7807ErrorJSONSchema,
        },
      },
      description: "Payload too large",
    },
    500: {
      content: {
        "application/problem+json": {
          schema: RFC7807ErrorJSONSchema,
        },
      },
      description: "Internal server error",
    },
  },
});

const HonoAPIV1RenderRoute = HonoAPIV1RenderRouter.openapi(route, (c) => {
  const { tex, displayMode } = c.req.valid("query");

  try {
    const svg = mathjax.getSVG(tex, displayMode === "inline" ? false : true);
    return c.body(svg, 200, {
      "Content-Type": "image/svg+xml",
    });
  } catch (error) {
    console.error("Failed to render TeX", error);
    return internalServerError(c, "Failed to render TeX", c.req.path);
  }
});

export default HonoAPIV1RenderRouter;

export type HonoAPIV1RenderRouteType = typeof HonoAPIV1RenderRoute;
