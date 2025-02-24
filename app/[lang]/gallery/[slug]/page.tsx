import {
  fetchGalleryImage,
  fetchGalleryImageSlugs,
} from "@/app/[lang]/fetchImage";
import { Gallery } from "@/components/gallery";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ lang: Locale; slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const data = await fetchGalleryImage(params.slug, params.lang);
  const siteName = params.lang === "ru" ? `Юлия Рибетки` : `Julia Ribetki`;
  const title = `${data?.title ?? ""} | ${siteName}`;
  const description = data?.description?.slice(0, 150) ?? "";
  const url = data?.url ?? "";
  const width = data?.width ?? 0;
  const height = data?.height ?? 0;
  const openGraph = {
    title,
    description,
    url: `https://ribetki.vercel.app/${params.lang}/gallery/${params.slug}`,
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

export default async function Page(props: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const params = await props.params;
  const slugs = await fetchGalleryImageSlugs();
  const image = await fetchGalleryImage(params.slug, params.lang);
  if (!image || !slugs.length) notFound();
  return (
    <Gallery
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
