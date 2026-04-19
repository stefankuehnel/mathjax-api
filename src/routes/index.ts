import { OpenAPIHono } from "@hono/zod-openapi";

import HonoAPIRouter from "@routes/api";

const HonoRouter = new OpenAPIHono();

HonoRouter.route("/", HonoAPIRouter);

export default HonoRouter;
