import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { I18nProvider } from "@/utils/i18context";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Marck_Script } from "next/font/google";
import { fetchFavicon } from "@/utils/apiService";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// If loading a variable font, you don't need to specify the font weight
const marckScript = Marck_Script({
  weight: "400",
  display: "block",
  variable: "--greet-font",
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: "Julia Ribetki",
  description: "Modern art",
  keywords: ["Modern art", "Oeuvre", "Creation"],
  authors: [
    {
      name: "Julia Ribetki",
      url: "https://www.facebook.com/profile.php?id=100009528395129",
    },
    { name: "playoffthecuff", url: "https://github.com/playoffthecuff" },
  ],
  creator: "playoffthecuff",
  publisher: "Julia Ribetki",
};

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
      className={`h-full overflow-x-hidden scrollbar-thumb-muted-foreground scrollbar-track-muted ${GeistSans.variable} ${GeistMono.variable} ${marckScript.variable} antialiased`}
    >
      <head>
        {data.png96Url && (
          <link
            rel="icon"
            type="image/png"
            href={data.png96Url}
            sizes="96x96"
          />
        )}
        {data.png192Url && (
          <link
            rel="icon"
            sizes="192x192"
            href={data.png192Url}
            type="image/png"
          ></link>
        )}
        {data.svgUrl && (
          <link rel="icon" type="image/svg+xml" href={data.svgUrl} />
        )}
        {data.icoUrl && <link rel="shortcut icon" href={data.icoUrl} />}
        {data.applePngUrl && (
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={data.applePngUrl}
          />
        )}
        {data.manifestUrl && <link rel="manifest" href={data.manifestUrl} />}
        <meta name="apple-mobile-web-app-title" content="Julia Ribetki" />
      </head>
      <body className="antialiased min-h-full flex flex-col font-sans overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider dictionary={dictionary}>
            <TooltipProvider delayDuration={400}>
              <Header svg={svg} />
              <Toaster />
              <main className="max-w-7xl mx-auto w-full">{children}</main>
              <Footer />
            </TooltipProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
