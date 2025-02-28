import { fetchBlogArticles } from "@/app/[lang]/(with-footer)/blog/fetchBlogArticles";
import { BlogPostCard } from "@/components/blog-card";
import { Locale } from "@/i18n-config";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import "./cards.css";
import css from "./container.module.css";

export async function generateMetadata(props: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const params = await props.params;
  const description =
    params.lang === "ru"
      ? "Юлия Рибетки. Блог. Статьи."
      : "Julia Ribetki. Blog. Articles.";
  const title =
    params.lang === "ru" ? "Блог | Юлия Рибетки" : "Blog | Julia Ribetki";
  return {
    alternates: {
      canonical: params.lang === "en" ? "/en/blog" : "/ru/blog",
      languages: {
        en: "/en/blog",
        ru: "/ru/blog",
        "x-default": "/blog",
      },
    },
    title,
    description,
  };
}

export default async function Page(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;
  const articles = await fetchBlogArticles(params.lang);
  if (!articles) notFound();
  return (
    <div className={cn("mt-[7.5rem] mb-16 px-4", css.container)}>
      {articles.map((v, i) => (
        <BlogPostCard data={v} key={i} />
      ))}
    </div>
  );
}
