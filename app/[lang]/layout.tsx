import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster, TooltipProvider } from "@/components/ui";
import { i18n, Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/utils/getDictionary";
import { I18nProvider } from "@/lib/utils/i18context";
import clsx from "clsx";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";

export async function generateStaticParams() {
  return i18n.locales.map((l) => ({ lang: l }));
}

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const fontSans = localFont({
  src: [
    { path: "../../public/fonts/Akrobat-Regular.woff2", weight: "400" },
    { path: "../../public/fonts/Akrobat-SemiBold.woff2", weight: "500" },
    { path: "../../public/fonts/Akrobat-Bold.woff2", weight: "600" },
  ],
  display: "swap",
  variable: "--font-sans",
});

const fontRabbit = localFont({
  src: "../../public/fonts/rabbits-elf.woff2",
  display: "swap",
  variable: "--font-rabbit",
});

export const viewport: Viewport = {
  themeColor: "#030712",
};

export async function generateMetadata(
  props: {
    params: Promise<{ lang: Locale }>;
  }
): Promise<Metadata> {
  const params = await props.params;

  const common = {
    creator: "playoffthecuff",
    generator: "Next.js",
    metadataBase: new URL("https://ribetki.vercel.app/"),
    alternates: {
      languages: {
        en: "/en",
        ru: "/ru",
        "x-default": "/",
      },
      types: {
        "application/rss+xml": "https://ribetki.vercel.app/en/feed.xml",
      },
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };

  const openGraphShare = {
    url: "https://ribetki.vercel.app",
    images: [
      {
        url: "/favicon/logo.svg",
        width: 24,
        height: 24,
      },
    ],
    type: "website",
  };

  const en = {
    title: "Julia Ribetki",
    description: "Modern art",
    keywords: ["Modern art", "Oeuvre", "Creation"],
    authors: [
      {
        name: "Julia Ribetki",
        url: "https://ribetki.vercel.app/en/",
      },
    ],
    openGraph: {
      ...openGraphShare,
      title: "Julia Ribetki",
      description: "personal website of Julia Ribetki",
      locale: "en",
    },
    ...common,
  };

  const ru = {
    title: "Юлия Рибетки",
    description: "Современное искусство",
    keywords: ["Современное искусство", "Творчество", "Произведение"],
    authors: [
      {
        name: "Юлия Рибетки",
        url: "https://ribetki.vercel.app/ru/",
      },
    ],
    openGraph: {
      ...openGraphShare,
      title: "Юлия Рибетки",
      description: "персональный веб-сайт Юлии Рибетки",
      locale: "ru",
    },
    ...common,
  };
  if (params.lang === "ru")
    ru.alternates.types["application/rss+xml"] =
      "https://ribetki.vercel.app/ru/feed.xml";
  return params.lang === "ru" ? { ...ru } : { ...en };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const lang = (await params).lang;
  const dictionary = await getDictionary(lang);
  return (
    <html lang={lang} suppressHydrationWarning>
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
          <I18nProvider dictionary={dictionary}>
            <TooltipProvider>
              <Header />
              <Toaster />
              {children}
            </TooltipProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
