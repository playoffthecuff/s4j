import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import { i18n } from "./i18n-config";

const locales = i18n.locales;

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales as unknown as string[]
  );
  const locale = match(languages, locales, i18n.defaultLocale);

  return locale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (locales.some((l) => pathname.startsWith(`/${l}`) || pathname === `/${l}`))
    return;
  if (
    [
      "/favicon.ico",
      "/icn.png",
      "/badge.png",
      "/sw.js",
      "/manifest.webmanifest",
      "/favicon/web-app-manifest-192x192.png",
      "/favicon/web-app-manifest-512x512.png",
    ].includes(pathname)
  ) {
    return;
  }
  const locale = getLocale(req);

  req.nextUrl.pathname = `/${locale + pathname}`;

  return NextResponse.redirect(req.nextUrl);
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
