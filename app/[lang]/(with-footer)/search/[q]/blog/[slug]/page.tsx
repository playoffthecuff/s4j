import { fetchBlogArticle } from "@/app/[lang]/(with-footer)/blog/[slug]/fetchBlogArticle";
import { BlogPost } from "@/components/blog-post/Post";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchSearchedBlogArticleSlugs } from "./fetchSearchedArticlesSlugs";

export async function generateMetadata(props: {
  params: Promise<{ lang: Locale; slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
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
    url: `https://ribetki.vercel.app/${params.lang}/blog/${params.slug}`,
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
      canonical: `/blog/${params.slug}`,
      languages: {
        en: `/en/blog/${params.slug}`,
        ru: `/ru/blog/${params.slug}`,
      },
    },
    title,
    description,
    openGraph,
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string; lang: Locale, q: string }>;
}) {
  const params = await props.params;
  const data = await fetchBlogArticle(params.slug, params.lang);
  if (!data) notFound();
  const query = decodeURIComponent(params.q);
  const slugs = await fetchSearchedBlogArticleSlugs(params.lang, query);
  const i = slugs?.indexOf(params.slug);
  const prev = slugs ? (slugs[(i ?? 0) - 1] ?? null) : null;
  const next = slugs ? (slugs[(i ?? -2) + 1] ?? null) : null;
  return (
    <BlogPost
      data={data}
      className="mx-auto mt-[7.5rem] mb-16 px-4"
      slug={params.slug}
      prev={prev}
      next={next}
      paginationStep={2}
    />
  );
}
