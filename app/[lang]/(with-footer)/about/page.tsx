import { MainInfo, Mentions } from "@/components/author";
import { Timeline } from "@/components/author/children";
import { Separator } from "@/components/ui";
import { Locale } from "@/i18n-config";
import { fetchAuthor } from "@/lib/utils/apiService";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({ params }: { params: { lang: Locale, slug: string } }): Promise<Metadata> {
  const data = await fetchAuthor(params.lang);
  const pre = params.lang === "ru" ? `Автор` : `About`;
  const siteName = params.lang === "ru" ? `Юлия Рибетки` : `Julia Ribetki`;
  const title = `${pre} | ${siteName}`;
  const description = params.lang === "ru" ? `Автор. Биография. Цитаты.` : `About. Bio. Quotes.`;
  const url = data.mainInfo?.image ? data.mainInfo.image.url : "";
  const width = data.mainInfo?.image?.width ?? 0;
  const height = data.mainInfo?.image?.height ?? 0;
  const openGraph = {
    title,
    description,
    url: `https://ribetki.vercel.com/${params.lang}/about`,
    siteName: siteName,
    images: [
      {
        url,
        width,
        height,
      },
    ],
    locale: `${params.lang}`,
    type: 'website',
  };
  return {
    alternates: {
      canonical: "/about/",
      languages: {
        en: "/en/about",
        ru: "/ru/about",
      },
    },
    title,
    description,
    openGraph,
  }
}

export default async function Page({ params }: { params: { lang: Locale } }) {
  const d = await fetchAuthor(params.lang);

  return (
    <div className="max-w-3xl mx-auto mt-[7.5rem] mb-16 px-4">
      {d.mainInfo && <MainInfo data={d.mainInfo} className="px-2" />}
      {d.timeline && (
        <>
          {d.mainInfo && <Separator className="my-12" />}
          <Timeline
            entries={d.timeline}
            className="max-w-[720px] mx-auto px-2"
          />
        </>
      )}
      {d.mentions && (
        <>
          {d.mainInfo && <Separator className="my-12" />}
          <Mentions data={d.mentions} className="px-2" />
        </>
      )}
    </div>
  );
}
