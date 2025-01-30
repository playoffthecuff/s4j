import {
  fetchSearchedBlogArticles,
  fetchSearchedGalleryImages,
} from "@/lib/utils/apiService";
import css from "./container.module.css";
import "./cards.css";
import { Locale } from "@/i18n-config";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { SearchCard } from "@/components/blog-post/SearchCard";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { lang: Locale, q: string } }): Promise<Metadata> {
  const description = params.lang === "ru" ? "Юлия Рибетки. Результаты поиска по статьям и работам." : "Julia Ribetki. Search results for articles and works."
  const title = params.lang === "ru" ? "Юлия Рибетки | Поиск" : "Julia Ribetki | Search";
  return {
    alternates: {
      canonical: `/search/${params.q}`,
      languages: {
        en: `/en/search/${params.q}`,
        ru: `/ru/search/${params.q}`,
      },
    },
    title,
    description,
  }
}

export default async function Page({
  params,
}: {
  params: { lang: Locale; q: string };
}) {
  const query = decodeURIComponent(params.q);
  const articles = await fetchSearchedBlogArticles(params.lang, query);
  const images = await fetchSearchedGalleryImages(params.lang, query);
  if (articles.length + images.length === 0) notFound();
  return (
    <div className={cn("mt-[7.5rem] mb-16 px-4", css.container)}>
      {articles.map((v, i) => (
        <SearchCard data={v} searchText={query} key={i} locale={params.lang} type="blog"/>
      ))}
      {images.map((v, i) => (
        <SearchCard data={v} searchText={query} key={i} locale={params.lang} type="gallery"/>
      ))}
    </div>
  );
}
