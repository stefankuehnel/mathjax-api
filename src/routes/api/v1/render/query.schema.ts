import { z } from "@hono/zod-openapi";

export const QuerySchema = z
  .object({
    tex: z.string().min(1).max(10000).openapi({
      description: "The TeX string to render",
      example: "\\sum_{i=1}^{n} i",
    }),
    displayMode: z
      .enum(["inline", "display"])
      .optional()
      .default("display")
      .openapi({
        description:
          "Rendering mode: `inline` for inline math (smaller), `display` for centered, larger math (default)",
        example: "display",
      }),
  })
  .openapi("Query");
