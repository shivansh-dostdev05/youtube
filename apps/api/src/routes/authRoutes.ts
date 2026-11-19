import { Hono } from "hono";
import type { SessionEnv } from "@hono/session";

import { googleOAuth } from "../config/googleOAuth.js";

const authRoutes = new Hono<SessionEnv>();

authRoutes.get("/google", googleOAuth);

authRoutes.get("/google/callback", googleOAuth, async (c) => {
  const googleUser = c.get("user-google");

  if (!googleUser) {
    return c.redirect("http://localhost:5173/?auth=failed");
  }

  const user = {
    id: googleUser.id,
    displayName: googleUser.name,
    photos: googleUser.picture ? [{ value: googleUser.picture }] : [],
    emails: googleUser.email ? [{ value: googleUser.email }] : [],
  };

  await c.var.session.update({ user });

  return c.redirect("http://localhost:5173/?auth=success");
});

authRoutes.get("/user", async (c) => {
  const session = await c.var.session.get();
  const user = session?.user;

  if (!user) {
    return c.json(
      {
        authenticated: false,
        user: null,
      },
      401,
    );
  }

  return c.json({
    authenticated: true,
    user,
  });
});

authRoutes.get("/logout", (c) => {
  c.var.session.delete();

  return c.json({
    message: "Logged out successfully",
  });
});

export default authRoutes;
