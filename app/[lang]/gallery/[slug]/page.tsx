import { G2 } from "@/components/gallery/g2";
import { Locale } from "@/i18n-config";
import {
  fetchGalleryImage,
  fetchGalleryImageSlugs,
} from "@/lib/utils/apiService";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale; slug: string };
}): Promise<Metadata> {
  const data = await fetchGalleryImage(params.slug, params.lang);
  const siteName = params.lang === "ru" ? `Юлия Рибетки` : `Julia Ribetki`;
  const title = `${data?.title ?? ""} | ${siteName}`;
  const description = data?.description.slice(0, 150);
  const url = data?.image.url ?? "";
  const width = data?.image.width ?? 0;
  const height = data?.image.height ?? 0;
  const openGraph = {
    title,
    description,
    url: `https://ribetki.vercel.com/${params.lang}/gallery/${params.slug}`,
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
      canonical: `/gallery/${params.slug}`,
      languages: {
        en: `/en/gallery/${params.slug}`,
        ru: `/ru/gallery/${params.slug}`,
      },
    },
    title,
    description,
    openGraph,
  };
}

export default async function Page({
  params,
}: {
  params: { lang: Locale; slug: string };
}) {
  const slugs = await fetchGalleryImageSlugs();
  const image = await fetchGalleryImage(params.slug, params.lang);
  if (!image || !slugs.length) notFound();
  // return <Gallery image={image} slugs={slugs} backLink="/gallery" />;
  return (
    <G2
      data={image}
      slugs={slugs}
      backLink="./"
      bcLinks={[
        { link: "gallery", text: params.lang === "ru" ? "Галерея" : "Gallery" },
      ]}
      menuLinks={["blog", "events", "about"]}
    />
  );
}
