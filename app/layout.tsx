import { ThemeProvider } from "@/components/theme-provider";
import { i18n } from "@/i18n-config";
import clsx from "clsx";
import type { Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

export async function generateStaticParams() {
  return i18n.locales.map((l) => ({ lang: l }));
}

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const fontSans = localFont({
  src: [
    { path: "../public/fonts/Akrobat-Regular.woff2", weight: "400" },
    { path: "../public/fonts/Akrobat-SemiBold.woff2", weight: "500" },
    { path: "../public/fonts/Akrobat-Bold.woff2", weight: "600" },
  ],
  display: "swap",
  variable: "--font-sans",
});

const fontRabbit = localFont({
  src: "../public/fonts/rabbits-elf.woff2",
  display: "swap",
  variable: "--font-rabbit",
});

export const viewport: Viewport = {
  themeColor: "#030712",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
    <head>
    <meta name="robots" content="noindex, nofollow"/>
    </head>
      <body
        className={clsx(
          "min-h-full flex flex-col font-sans overflow-x-hidden transition-opacity duration-300 antialiased",
          fontSans.variable,
          fontMono.variable,
          fontRabbit.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
              {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
