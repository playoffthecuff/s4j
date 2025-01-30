import { BlogPost } from "@/components/blog-post/Post";
import { Locale } from "@/i18n-config";
import {
  fetchBlogArticle,
  fetchBlogArticleSlugs,
} from "@/lib/utils/apiService";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { lang: Locale, slug: string } }): Promise<Metadata> {
  const data = await fetchBlogArticle(params.slug, params.lang);
  const siteName = params.lang === "ru" ? `Юлия Рибетки` : `Julia Ribetki`;
  const title = `${data?.title ?? ""} | ${siteName}`;
  const description = data?.title.slice(0, 150);
  const url = data?.titleImageData?.url ?? "";
  const width = data?.titleImageData?.width ?? 0;
  const height = data?.titleImageData?.height ?? 0;
  const openGraph = {
    title,
    description,
    url: `https://ribetki.vercel.com/${params.lang}/blog/${params.slug}`,
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
      canonical: `/blog/${params.slug}`,
      languages: {
        en: `/en/blog/${params.slug}`,
        ru: `/ru/blog/${params.slug}`,
      },
    },
    title,
    description,
    openGraph,
  }
}

export default async function Page({
  params,
}: {
  params: { slug: string; lang: Locale };
}) {
  const data = await fetchBlogArticle(params.slug, params.lang);
  if (!data) notFound();
  const slugs = await fetchBlogArticleSlugs();
  const i = slugs?.findIndex((v) => v === params.slug);
  const prev = slugs ? slugs[(i ?? 0) - 1] : null;
  const next = slugs ? slugs[(i ?? -2) + 1] : null;
  return (
    <BlogPost
      data={data}
      className="mx-auto mt-[7.5rem] mb-16 px-4"
      slug={params.slug}
      prev={prev}
      next={next}
    />
  );
}
