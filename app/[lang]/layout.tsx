import type { Metadata, Viewport } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { I18nProvider } from "@/lib/utils/i18context";
import { TooltipProvider, SonnerToaster } from "@/components/ui";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Marck_Script } from "next/font/google";
import { fetchFavicon } from "@/lib/utils/apiService";
import clsx from "clsx";
import { Header } from "@/components/header";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const marckScript = Marck_Script({
  weight: "400",
  display: "block",
  variable: "--greet-font",
  subsets: ["cyrillic"],
});

// type Props = {
//   params: { lang: string };
// };

// export const metadata: Metadata = {
//   creator: "playoffthecuff",
//   generator: "Next.js",
//   description: "root description",
//   metadataBase: new URL("https://ribetki.vercel.com/"),
//   alternates: {
//     canonical: "/",
//     languages: {
//       en: "/en",
//       ru: "/ru",
//     },
//   },
// };

// export async function generateMetadata({
//   params,
// }: {
//   params: { lang: Locale };
// }) {
//   const common = {
//     creator: "playoffthecuff",
//     generator: "Next.js",
//     metadataBase: new URL("https://ribetki.vercel.com/"),
//     alternates: {
//       canonical: "/",
//       languages: {
//         en: "/en",
//         ru: "/ru",
//       },
//     },
//   };
//   const en = {
//     title: "Julia Ribetki",
//     description: "Modern art",
//     keywords: ["Modern art", "Oeuvre", "Creation"],
//     authors: [
//       {
//         name: "Julia Ribetki",
//         url: "https://ribetki.vercel.com/en/",
//       },
//     ],
//     openGraph: {
//       ...openGraphShare,
//       title: "Julia Ribetki",
//       description: "personal website of Julia Ribetki",
//       locale: "en",
//     },
//     ...common,
//   };

//   const ru = {
//     title: "Юлия Рибетки",
//     description: "Современное искусство",
//     keywords: ["Современное искусство", "Творчество", "Произведение"],
//     authors: [
//       {
//         name: "Юлия Рибетки",
//         url: "https://ribetki.vercel.com/ru/",
//       },
//     ],
//     openGraph: {
//       ...openGraphShare,
//       title: "Юлия Рибетки",
//       description: "персональный веб-сайт Юлии Рибетки",
//       locale: "ru",
//     },
//     ...common,
//   };

//   return {
//     author: "sdf",
//     creator: "playoffthecuff",
//     generator: "Next.js",
//     metadataBase: new URL("https://ribetki.vercel.com/"),
//     alternates: {
//       canonical: "/",
//       languages: {
//         en: "/en",
//         ru: "/ru",
//       },
//     },
//   };
// }

export const viewport: Viewport = {
  themeColor: "#030712",
};

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  // const data = await fetchFavicon();

  const common = {
    creator: "playoffthecuff",
    generator: "Next.js",
    metadataBase: new URL("https://ribetki.vercel.com/"),
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        ru: "/ru",
      },
      types: {
        "application/rss+xml": "https://ribetki.vercel.com/en/feed.xml",
      },
    },
    // icons: {
    //   icon: [data.svgUrl, data.png96Url, data.icoUrl],
    //   apple: data.applePngUrl,
    //   other: {
    //     url: data.png512Url,
    //   },
    // },
  };

  const openGraphShare = {
    url: "https://ribetki.vercel.com",
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
        url: "https://ribetki.vercel.com/en/",
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
        url: "https://ribetki.vercel.com/ru/",
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
      "https://ribetki.vercel.com/ru/feed.xml";
  return params.lang === "ru" ? { ...ru } : { ...en };
}

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const dictionary = await getDictionary(params.lang);
  const data = await fetchFavicon();
  const svg = await fetch(data.logoUrl).then((r) => r.text());

  return (
    <html
      lang={params.lang}
      className={clsx(
        "h-full scrollbar-thumb-muted-foreground scrollbar-track-muted antialiased",
        GeistSans.variable,
        GeistMono.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        {/* <meta
          name="description"
          content={
            params.lang === "en" ? "Modern art" : "Современное искусство"
          }
        /> */}
        {/* <meta
          name="author"
          content={params.lang === "en" ? "Julia Ribetki" : "Юлия Рибетки"}
        />
        <meta
          name="keywords"
          content={
            params.lang === "en"
              ? "Modern art,Oeuvre,Creation"
              : "Современное искусство,Творчество,Произведение"
          }
        />
        <meta
          property="og:locale"
          content={params.lang === "en" ? "en" : "ru"}
        />
        <meta
          property="og:title"
          content={params.lang === "en" ? "Julia Ribetki" : "Юлия Рибетки"}
        />
        <meta
          property="og:description"
          content={
            params.lang === "en"
              ? "personal website of Julia Ribetki"
              : "персональный веб-сайт Юлии Рибетки"
          }
        />
        <meta
          name="twitter:title"
          content={params.lang === "en" ? "Julia Ribetki" : "Юлия Рибетки"}
        />
        <meta
          name="twitter:description"
          content={
            params.lang === "en"
              ? "personal website of Julia Ribetki"
              : "персональный веб-сайт Юлии Рибетки"
          }
        /> */}
        {/* <link rel="icon" href={data.svgUrl} type="image/svg+xml" />
        <link rel="icon" href={data.png96Url} type="image/png" sizes="96x96" />
        <link rel="shortcut icon" href={data.icoUrl} />
        <link
          rel="apple-touch-icon"
          href={data.applePngUrl}
          sizes="180x180"
        ></link>
        <link rel="manifest" href={data.manifestUrl} /> */}
        {/* <meta property="og:image" content={data.svgUrl} /> */}
      </head>
      <body className={clsx("min-h-full flex flex-col font-sans overflow-x-hidden transition-opacity duration-300", marckScript.variable)}>
        <ThemeProvider
          attribute="class"
          enableSystem
          disableTransitionOnChange
          defaultTheme="system"
        >
          <I18nProvider dictionary={dictionary}>
            <TooltipProvider delayDuration={400}>
              <Header svg={svg} />
              <SonnerToaster />
              {children}
            </TooltipProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
