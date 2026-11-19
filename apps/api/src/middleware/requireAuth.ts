import { createMiddleware } from "hono/factory";
import type { SessionEnv } from "@hono/session";

export const requireAuth = createMiddleware<SessionEnv>(async (c, next) => {
  const session = await c.var.session.get();
  const user = session?.user;

  if (!user) {
    return c.json(
      {
        message: "Please sign in first",
      },
      401,
    );
  }

  await next();
});
