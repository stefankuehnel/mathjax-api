import { OpenAPIHono } from "@hono/zod-openapi";

import HonoAPIV1Router from "@routes/api/v1";

const HonoAPIRouter = new OpenAPIHono();

HonoAPIRouter.route("/", HonoAPIV1Router);

export default HonoAPIRouter;
