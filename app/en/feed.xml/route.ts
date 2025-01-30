import { fetchBlogArticles } from '@/lib/utils/apiService';
import RSS from 'rss';

export async function GET() {
  const posts = await fetchBlogArticles("en");
  const feed = new RSS({
    title: 'Julia Ribetki',
    description: 'Personal web-site',
    site_url: 'https://ribetki.vercel.com/en',
    feed_url: `https://ribetki.vercel.com/en/feed.xml`,
    copyright: `${new Date().getFullYear()} Julia Ribetki`,
    language: 'en',
    pubDate: new Date(),
  });
  posts?.map(p => {
    feed.item({
      title: p.title,
      guid: `https://ribetki.vercel.com/en/blog/${p.slug}`,
      url: `https://ribetki.vercel.com/en/blog/${p.slug}`,
      date: p.publishedAt,
      description: "",
    });
  });
  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}