import { describe, expect, it, vi } from "vitest";
import { z } from "zod";

import app from "./index";

app.get("/__test/error/zod", () => {
  z.object({ tex: z.string() }).parse({});

  return new Response("ok");
});

app.get("/__test/error/generic", () => {
  throw new Error("Unexpected test error");
});

describe("Server", () => {
  describe("GET /", () => {
    it("redirects to docs", async () => {
      const res = await app.request("/");

      expect(res.status).toBe(302);
      expect(res.headers.get("Location")).toBe("/docs");
    });
  });

  describe("Error Handling", () => {
    it("returns RFC7807 404 for unknown route", async () => {
      const res = await app.request("/does-not-exist");

      expect(res.status).toBe(404);
      expect(res.headers.get("Content-Type")).toBe("application/problem+json");
      await expect(res.json()).resolves.toMatchObject({
        type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404",
        title: "Not Found",
        status: 404,
        detail: "Route GET /does-not-exist not found",
        instance: "/does-not-exist",
      });
    });

    it("returns RFC7807 400 for Zod errors thrown by routes", async () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => undefined);

      try {
        const res = await app.request("/__test/error/zod");

        expect(res.status).toBe(400);
        expect(res.headers.get("Content-Type")).toBe(
          "application/problem+json",
        );
        await expect(res.json()).resolves.toMatchObject({
          type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400",
          title: "Bad Request",
          status: 400,
          detail: "tex: Invalid input: expected string, received undefined",
          instance: "/__test/error/zod",
        });
      } finally {
        consoleErrorSpy.mockRestore();
      }
    });

    it("returns RFC7807 500 for unexpected errors", async () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => undefined);

      try {
        const res = await app.request("/__test/error/generic");

        expect(res.status).toBe(500);
        expect(res.headers.get("Content-Type")).toBe(
          "application/problem+json",
        );
        await expect(res.json()).resolves.toMatchObject({
          type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500",
          title: "Internal Server Error",
          status: 500,
          detail: "An unexpected error occurred",
          instance: "/__test/error/generic",
        });
      } finally {
        consoleErrorSpy.mockRestore();
      }
    });
  });
});
