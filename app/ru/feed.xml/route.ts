import { fetchBlogArticles } from "@/app/[lang]/(with-footer)/blog/fetchBlogArticles";
import RSS from "rss";

export async function GET() {
  const posts = await fetchBlogArticles("ru");
  const feed = new RSS({
    title: "Юлия Рибетки",
    description: "Персональный веб-сайт",
    site_url: "https://ribetki.vercel.app/ru",
    feed_url: `https://ribetki.vercel.app/ru/feed.xml`,
    copyright: `${new Date().getFullYear()} Юлия Рибетки`,
    language: "ru",
    pubDate: new Date(),
  });
  posts?.map((p) => {
    feed.item({
      title: p.title,
      guid: `https://ribetki.vercel.app/ru/blog/${p.slug}`,
      url: `https://ribetki.vercel.app/ru/blog/${p.slug}`,
      date: p.publishedAt,
      description: "",
    });
  });
  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
