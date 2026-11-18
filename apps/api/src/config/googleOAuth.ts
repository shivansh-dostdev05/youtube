import { googleAuth } from "@hono/oauth-providers/google";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackUrl = process.env.GOOGLE_CALLBACK_URL;

if (!clientId || !clientSecret || !callbackUrl) {
  throw new Error("Google OAuth environment variables are missing");
}

export const googleOAuth = googleAuth({
  client_id: clientId,
  client_secret: clientSecret,
  redirect_uri: callbackUrl,
  scope: ["openid", "email", "profile"],
  prompt: "select_account",
});
