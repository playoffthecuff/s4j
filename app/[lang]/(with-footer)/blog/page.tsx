import { BlogPostCard } from "@/components/blog-post/Card";
import { fetchBlogArticles } from "@/lib/utils/apiService";
import css from "./container.module.css";
import "./cards.css";
import { Locale } from "@/i18n-config";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const description = params.lang === "ru" ? "Юлия Рибетки. Блог. Статьи." : "Julia Ribetki. Blog. Articles."
  const title = params.lang === "ru" ? "Блог | Юлия Рибетки" : "Blog | Julia Ribetki";
  return {
    alternates: {
      canonical: "/blog/",
      languages: {
        en: "/en/blog",
        ru: "/ru/blog",
      },
    },
    title,
    description,
  }
}

export default async function Page({ params }: { params: { lang: Locale } }) {
  const articles = await fetchBlogArticles(params.lang);
  if (!articles) notFound();
  return (
    <div
      className={cn("mt-[7.5rem] mb-16 px-4", css.container)}
    >
      {articles.map((v, i) => (
        <BlogPostCard data={v} key={i} marks={['пОтребностям?']}/>
      ))}
    </div>
  );
}
