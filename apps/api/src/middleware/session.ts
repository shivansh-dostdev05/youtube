import { useSession } from "@hono/session";

const sessionSecret = process.env.AUTH_SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("AUTH_SESSION_SECRET is not defined");
}

export const sessionMiddleware = useSession({
  secret: sessionSecret,
  duration: {
    absolute: 60 * 60 * 24 * 7,
    inactivity: 60 * 60 * 24,
  },
});
