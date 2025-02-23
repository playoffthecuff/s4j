import {
  fetchBlogImageSlugs,
  fetchGalleryImage,
} from "@/app/[lang]/fetchImage";
import { Gallery } from "@/components/gallery";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ lang: Locale; slug: string; id: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const data = await fetchGalleryImage(params.id, params.lang);
  const siteName = params.lang === "ru" ? `Юлия Рибетки` : `Julia Ribetki`;
  const title = `${data?.title ?? ""} | ${siteName}`;
  const description = data?.description?.slice(0, 150) ?? "";
  const url = data?.url ?? "";
  const width = data?.width ?? 0;
  const height = data?.height ?? 0;
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

export default async function Page(props: {
  params: Promise<{ lang: Locale; slug: string; id: string }>;
}) {
  const params = await props.params;
  const bis = await fetchBlogImageSlugs(params.lang, params.slug);
  const image = await fetchGalleryImage(params.id, params.lang);
  const slugsArr = [];
  if (bis) slugsArr.push(bis.titleImageSlug);
  if (bis?.imageSlugs?.length) slugsArr.push(...bis.imageSlugs);
  const slugs = [...new Set(slugsArr)].filter((v) => v !== null);
  if (!bis || !image || !slugs.length) notFound();
  return (
    <Gallery
      data={image}
      slugs={slugs}
      backLink="./"
      bcLinks={[
        { link: `../../`, text: params.lang === "ru" ? "Поиск" : "Search" },
        { link: `./`, text: params.lang === "ru" ? "Статья" : "Article" },
      ]}
      menuLinks={["blog", "gallery", "events", "about"]}
    />
  );
}
