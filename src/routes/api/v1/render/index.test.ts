import { describe, expect, it, vi } from "vitest";

import { Mathjax } from "@lib/mathjax";

import HonoRenderRouter from "@routes/api/v1/render";

describe("GET /api/v1/render", () => {
  describe("Valid TeX Rendering", () => {
    it("renders variable x", async () => {
      // Arrange

      // Act
      const sut = await HonoRenderRouter.request("/api/v1/render?tex=x");

      // Assert
      expect(sut.status).toBe(200);
      expect(sut.headers.get("Content-Type")).toBe("image/svg+xml");
      await expect(sut.text()).resolves.toMatchInlineSnapshot(
        `"<svg xmlns="http://www.w3.org/2000/svg" width="1.294ex" height="1.025ex" style="vertical-align:-.025ex" viewBox="0 -442 572 453"><title>x</title><g fill="currentColor" stroke="currentColor" stroke-width="0" data-mml-node="math"><path stroke="none" d="M52-289q7-42 54-97t116-56q35 0 64 18t43 45q42-63 101-63 37 0 64 22t28 59q0 29-14 47t-27 22-23 4q-19 0-31-11t-12-29q0-46 50-63-11-13-40-13-13 0-19 2-38 16-56 66-60 221-60 258 0 28 16 40t35 12q37 0 73-33t49-81q3-10 6-11t16-2h4q15 0 15 8 0 1-2 11-16 57-62 101T333 11q-70 0-106-63-41 62-94 62h-6q-49 0-70-26T35-71q0-32 19-52t45-20q43 0 43 42 0 20-12 35t-23 20-13 5l-3 1q0 1 6 4t16 7 19 3q36 0 62-45 9-16 23-68t28-108 16-66q5-27 5-39 0-28-15-40t-34-12q-40 0-75 32t-49 82q-2 9-5 10t-16 2H58q-6-6-6-11" data-c="1D465" data-mml-node="mi"/></g></svg>"`,
      );
    });

    it("renders sum", async () => {
      // Arrange

      // Act
      const sut = await HonoRenderRouter.request("/api/v1/render?tex=\\sum");

      // Assert
      expect(sut.status).toBe(200);
      expect(sut.headers.get("Content-Type")).toBe("image/svg+xml");
      await expect(sut.text()).resolves.toMatchInlineSnapshot(
        `"<svg xmlns="http://www.w3.org/2000/svg" width="3.267ex" height="3.167ex" style="vertical-align:-1.018ex" viewBox="0 -950 1444 1400"><title>\\sum</title><g fill="currentColor" stroke="currentColor" stroke-width="0" data-mml-node="math"><path stroke="none" d="M60-948q3-2 605-2h602l58 135q59 138 63 146h-40l-7-14q-21-41-56-78-50-48-111-77t-141-43-151-17-183-4H251l8 11q463 633 465 639 1 2 0 6-3 3-264 302L196 356q0 1 211 1h141q89 0 128 1 136 0 220-5t167-21 141-49 103-87q21-26 41-72h40q0 1-7 21t-25 65-31 84l-58 155-601 1q-602 0-605-2-6-2-6-9 0-2 2-6l533-610q0-1-33-45T452-366 322-544L56-909l-1-15q0-21 5-24" data-c="2211" data-mml-node="mo"/></g></svg>"`,
      );
    });

    it("renders sum in display mode", async () => {
      // Arrange

      // Act
      const sut = await HonoRenderRouter.request(
        "/api/v1/render?tex=\\sum&displayMode=display",
      );

      // Assert
      expect(sut.status).toBe(200);
      expect(sut.headers.get("Content-Type")).toBe("image/svg+xml");
      await expect(sut.text()).resolves.toMatchInlineSnapshot(
        `"<svg xmlns="http://www.w3.org/2000/svg" width="3.267ex" height="3.167ex" style="vertical-align:-1.018ex" viewBox="0 -950 1444 1400"><title>\\sum</title><g fill="currentColor" stroke="currentColor" stroke-width="0" data-mml-node="math"><path stroke="none" d="M60-948q3-2 605-2h602l58 135q59 138 63 146h-40l-7-14q-21-41-56-78-50-48-111-77t-141-43-151-17-183-4H251l8 11q463 633 465 639 1 2 0 6-3 3-264 302L196 356q0 1 211 1h141q89 0 128 1 136 0 220-5t167-21 141-49 103-87q21-26 41-72h40q0 1-7 21t-25 65-31 84l-58 155-601 1q-602 0-605-2-6-2-6-9 0-2 2-6l533-610q0-1-33-45T452-366 322-544L56-909l-1-15q0-21 5-24" data-c="2211" data-mml-node="mo"/></g></svg>"`,
      );
    });

    it("renders sum in inline mode", async () => {
      // Arrange

      // Act
      const sut = await HonoRenderRouter.request(
        "/api/v1/render?tex=\\sum&displayMode=inline",
      );

      // Assert
      expect(sut.status).toBe(200);
      expect(sut.headers.get("Content-Type")).toBe("image/svg+xml");
      await expect(sut.text()).resolves.toMatchInlineSnapshot(
        `"<svg xmlns="http://www.w3.org/2000/svg" width="2.389ex" height="2.262ex" style="vertical-align:-.566ex" viewBox="0 -750 1056 1000"><title>\\sum</title><g fill="currentColor" stroke="currentColor" stroke-width="0" data-mml-node="math"><path stroke="none" d="M61-748q3-2 428-2h424l41 110q11 31 22 61t17 46 6 17h-20l-20-1q-23-62-73-104t-109-61q-53-18-122-23t-219-5H319q-136 0-136 1 3 3 165 225t163 225q6 9 2 15l-23 28q-24 28-70 82T330-27L149 187q0 1 213 1h74q48 0 70 1 173 0 272-27T936 43q10-16 23-49h40l-86 255-424 1q-424 0-427-2-6-2-6-9 0-5 62-78 68-80 127-150l183-217q0-1-186-256L57-717l-1-11q0-16 5-20" data-c="2211" data-mml-node="mo"/></g></svg>"`,
      );
    });

    it("omitting displayMode yields same as displayMode=display", async () => {
      // Arrange

      // Act
      const sutDefault = await HonoRenderRouter.request(
        "/api/v1/render?tex=\\sum",
      );
      const sutDisplay = await HonoRenderRouter.request(
        "/api/v1/render?tex=\\sum&displayMode=display",
      );

      // Assert
      expect(sutDefault.status).toBe(200);
      expect(sutDisplay.status).toBe(200);
      await expect(sutDefault.text()).resolves.toMatchInlineSnapshot(
        `"<svg xmlns="http://www.w3.org/2000/svg" width="3.267ex" height="3.167ex" style="vertical-align:-1.018ex" viewBox="0 -950 1444 1400"><title>\\sum</title><g fill="currentColor" stroke="currentColor" stroke-width="0" data-mml-node="math"><path stroke="none" d="M60-948q3-2 605-2h602l58 135q59 138 63 146h-40l-7-14q-21-41-56-78-50-48-111-77t-141-43-151-17-183-4H251l8 11q463 633 465 639 1 2 0 6-3 3-264 302L196 356q0 1 211 1h141q89 0 128 1 136 0 220-5t167-21 141-49 103-87q21-26 41-72h40q0 1-7 21t-25 65-31 84l-58 155-601 1q-602 0-605-2-6-2-6-9 0-2 2-6l533-610q0-1-33-45T452-366 322-544L56-909l-1-15q0-21 5-24" data-c="2211" data-mml-node="mo"/></g></svg>"`,
      );
      await expect(sutDisplay.text()).resolves.toMatchInlineSnapshot(
        `"<svg xmlns="http://www.w3.org/2000/svg" width="3.267ex" height="3.167ex" style="vertical-align:-1.018ex" viewBox="0 -950 1444 1400"><title>\\sum</title><g fill="currentColor" stroke="currentColor" stroke-width="0" data-mml-node="math"><path stroke="none" d="M60-948q3-2 605-2h602l58 135q59 138 63 146h-40l-7-14q-21-41-56-78-50-48-111-77t-141-43-151-17-183-4H251l8 11q463 633 465 639 1 2 0 6-3 3-264 302L196 356q0 1 211 1h141q89 0 128 1 136 0 220-5t167-21 141-49 103-87q21-26 41-72h40q0 1-7 21t-25 65-31 84l-58 155-601 1q-602 0-605-2-6-2-6-9 0-2 2-6l533-610q0-1-33-45T452-366 322-544L56-909l-1-15q0-21 5-24" data-c="2211" data-mml-node="mo"/></g></svg>"`,
      );
    });
  });

  describe("Error Handling", () => {
    it("returns 400 for missing tex", async () => {
      // Arrange

      // Act
      const sut = await HonoRenderRouter.request("/api/v1/render");

      // Assert
      expect(sut.status).toBe(400);
      expect(sut.headers.get("Content-Type")).toBe("application/problem+json");
      await expect(sut.json()).resolves.toMatchInlineSnapshot(`
        {
          "detail": "tex: Invalid input: expected string, received undefined",
          "instance": "/api/v1/render",
          "status": 400,
          "title": "Bad Request",
          "type": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400",
        }
      `);
    });

    it("returns 400 for empty tex", async () => {
      // Arrange

      // Act
      const sut = await HonoRenderRouter.request("/api/v1/render?tex=");

      // Assert
      expect(sut.status).toBe(400);
      await expect(sut.json()).resolves.toMatchInlineSnapshot(`
        {
          "detail": "tex: Too small: expected string to have >=1 characters",
          "instance": "/api/v1/render",
          "status": 400,
          "title": "Bad Request",
          "type": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400",
        }
      `);
    });

    it("returns 400 for invalid displayMode", async () => {
      // Arrange

      // Act
      const sut = await HonoRenderRouter.request(
        "/api/v1/render?tex=x&displayMode=invalid",
      );

      // Assert
      expect(sut.status).toBe(400);
      await expect(sut.json()).resolves.toMatchInlineSnapshot(`
        {
          "detail": "displayMode: Invalid option: expected one of "inline"|"display"",
          "instance": "/api/v1/render",
          "status": 400,
          "title": "Bad Request",
          "type": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400",
        }
      `);
    });

    it("returns 400 when tex exceeds maximum length", async () => {
      // Arrange

      // Act
      const sut = await HonoRenderRouter.request(
        `/api/v1/render?tex=${"x".repeat(10001)}`,
      );

      // Assert
      expect(sut.status).toBe(400);
      expect(sut.headers.get("Content-Type")).toBe("application/problem+json");
      await expect(sut.json()).resolves.toMatchInlineSnapshot(`
        {
          "detail": "tex: Too big: expected string to have <=10000 characters",
          "instance": "/api/v1/render",
          "status": 400,
          "title": "Bad Request",
          "type": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400",
        }
      `);
    });

    it("returns 500 with generic Error message", async () => {
      const getSVGSpy = vi
        .spyOn(Mathjax.prototype, "getSVG")
        .mockImplementation(() => {
          throw new Error("error message that should not be exposed");
        });

      try {
        const sut = await HonoRenderRouter.request("/api/v1/render?tex=x");

        expect(sut.status).toBe(500);
        expect(sut.headers.get("Content-Type")).toBe(
          "application/problem+json",
        );
        await expect(sut.json()).resolves.toMatchObject({
          type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500",
          title: "Internal Server Error",
          status: 500,
          detail: "Failed to render TeX",
          instance: "/api/v1/render",
        });
      } finally {
        getSVGSpy.mockRestore();
      }
    });
  });
});
