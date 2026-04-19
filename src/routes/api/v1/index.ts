import { OpenAPIHono } from "@hono/zod-openapi";

import HonoAPIV1RenderRouter from "@routes/api/v1/render";

const HonoAPIV1Router = new OpenAPIHono();

HonoAPIV1Router.route("/", HonoAPIV1RenderRouter);

export default HonoAPIV1Router;
