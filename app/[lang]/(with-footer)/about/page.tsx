import { fetchAuthor } from "@/app/[lang]/(with-footer)/about/fetchAuthor";
import { MainInfo, Mentions } from "@/components/author";
import { Timeline } from "@/components/author/children";
import { Separator } from "@/components/ui";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ lang: Locale; slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const data = await fetchAuthor(params.lang);
  const pre = params.lang === "ru" ? `Автор` : `About`;
  const siteName = params.lang === "ru" ? `Юлия Рибетки` : `Julia Ribetki`;
  const title = `${pre} | ${siteName}`;
  const description =
    params.lang === "ru" ? `Автор. Биография. Цитаты.` : `About. Bio. Quotes.`;
  const url = data.mainInfo?.image ? data.mainInfo.image.url : "";
  const width = data.mainInfo?.image?.width ?? 0;
  const height = data.mainInfo?.image?.height ?? 0;
  const openGraph = {
    title,
    description,
    url: `https://ribetki.vercel.app/${params.lang}/about`,
    siteName: siteName,
    images: [
      {
        url,
        width,
        height,
      },
    ],
    locale: `${params.lang}`,
    type: "website",
  };
  return {
    alternates: {
      canonical: params.lang === "en" ? "/en/about" : "/ru/about",
      languages: {
        en: "/en/about",
        ru: "/ru/about",
        "x-default": "/about",
      },
    },
    title,
    description,
    openGraph,
  };
}

export default async function Page(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;
  const d = await fetchAuthor(params.lang);

  return (
    <div className="max-w-3xl mx-auto mt-[7.5rem] mb-16 px-4">
      {d.mainInfo && <MainInfo data={d.mainInfo} />}
      {d.timeline && (
        <>
          {d.mainInfo && <Separator className="mt-8 mb-10" />}
          <Timeline
            entries={d.timeline}
            className="max-w-[720px] mx-auto px-1"
          />
        </>
      )}
      {d.mentions && (
        <>
          {d.mainInfo && <Separator className="mt-8 mb-16" />}
          <Mentions data={d.mentions} className="min-[576px]:px-0 px-5"/>
        </>
      )}
    </div>
  );
}
