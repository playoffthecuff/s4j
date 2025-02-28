import {
  fetchSearchedBlogArticles,
  fetchSearchedGalleryImages,
} from "@/app/[lang]/(with-footer)/search/[q]/fetchSearched";
import { SearchCard } from "@/components/blog-card";
import { Locale } from "@/i18n-config";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import "./cards.css";
import css from "./container.module.css";

export async function generateMetadata(props: {
  params: Promise<{ lang: Locale; q: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const description =
    params.lang === "ru"
      ? "Юлия Рибетки. Результаты поиска по статьям и работам."
      : "Julia Ribetki. Search results for articles and works.";
  const title =
    params.lang === "ru" ? "Юлия Рибетки | Поиск" : "Julia Ribetki | Search";
  return {
    alternates: {
      canonical:
        params.lang === "en"
          ? `/en/search/${params.q}`
          : `/ru/search/${params.q}`,
      languages: {
        en: `/en/search/${params.q}`,
        ru: `/ru/search/${params.q}`,
        "x-default": `/search/${params.q}`,
      },
    },
    title,
    description,
  };
}

export default async function Page(props: {
  params: Promise<{ lang: Locale; q: string }>;
}) {
  const params = await props.params;
  const query = decodeURIComponent(params.q);
  const articles = await fetchSearchedBlogArticles(params.lang, query);
  const images = await fetchSearchedGalleryImages(params.lang, query);
  if (articles.length + images.length === 0) notFound();
  return (
    <div className={cn("mt-[7.5rem] mb-16 px-4", css.container)}>
      {articles.map((article, i) => (
        <SearchCard
          data={article}
          searchText={query}
          key={i}
          locale={params.lang}
          type="blog"
        />
      ))}
      {images.map((article, i) => (
        <SearchCard
          data={article}
          searchText={query}
          key={i}
          locale={params.lang}
          type="gallery"
        />
      ))}
    </div>
  );
}
