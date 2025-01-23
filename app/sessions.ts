import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  accessToken: string;
  refreshToken: string;
};

type SessionFlashData = {
  error: string;
};

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      domain: process.env.DOMAIN,
      httpOnly: true,
      maxAge: Number(process.env.SESSION_COOKIE_MAX_AGE),
      path: "/",
      sameSite: "lax",
      secrets: ["secret"],
      secure: process.env.NODE_ENV === "production",
    },
  });
