import { G2 } from "@/components/gallery/g2";
import { Locale } from "@/i18n-config";
import {
  fetchBlogImageSlugs,
  fetchGalleryImage,
} from "@/lib/utils/apiService";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale; slug: string; id: string };
}): Promise<Metadata> {
  const data = await fetchGalleryImage(params.id, params.lang);
  const siteName = params.lang === "ru" ? `Юлия Рибетки` : `Julia Ribetki`;
  const title = `${data?.title ?? ""} | ${siteName}`;
  const description = data?.description.slice(0, 150);
  const url = data?.image.url ?? "";
  const width = data?.image.width ?? 0;
  const height = data?.image.height ?? 0;
  const openGraph = {
    title,
    description,
    url: `https://ribetki.vercel.com/${params.lang}/blog/${params.slug}/${params.id}`,
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
      canonical: `/blog/${params.slug}/${params.id}`,
      languages: {
        en: `/en/blog/${params.slug}/${params.id}`,
        ru: `/ru/blog/${params.slug}/${params.id}`,
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
  params: { lang: Locale; slug: string; id: string };
}) {
  const bis = await fetchBlogImageSlugs(params.lang, params.slug);
  const image = await fetchGalleryImage(params.id, params.lang);
  const slugs = [
    ...new Set([bis.titleImageSlug, ...(bis.imageSlugs ?? [])]),
  ].filter((v) => v !== null);
  if (!image || !slugs.length) notFound();
  // return <Gallery image={image} slugs={slugs} backLink="/gallery" />;
  return (
    <G2
      data={image}
      slugs={slugs}
      backLink="./"
      bcLinks={[
        { link: "blog", text: params.lang === "ru" ? "Блог" : "Blog" },
        { link: params.slug, text: bis.title },
      ]}
      menuLinks={["gallery", "events", "about"]}
    />
  );
}
