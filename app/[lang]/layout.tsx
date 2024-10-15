import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "../../components/theme-provider";
import Header from "@/components/header/Header";
import Burger from "@/components/burger/Burger";
import Footer from "@/components/footer/Footer";
import { i18n, type Locale } from "../../i18n-config";
import { getDictionary } from "@/get-dictionary";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
{
  /* <link rel="icon" type="image/x-icon" href="/images/favicon.ico"></link> */
}
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {lang: Locale};
}>) {
  const dictionary = await getDictionary(params.lang);
  return (
    <html lang={params.lang} >
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-48x48.png"
          sizes="48x48"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header header={dictionary.header}/>
          <div>{dictionary.counter.increment} </div>
          <Burger className="sm:hidden" menu={dictionary.header.menu}/>
          <main className="max-w-7xl mx-auto mt-14 xl:pl-6 xl:pr-3">{children}</main>
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
