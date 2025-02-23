import { Locale } from "@/i18n-config";
import { client } from "@/lib/sanity/client";

export const fetchSearchedBlogArticleSlugs = async (l: Locale, s: string) => {
  const query = `*[_type == "blog" && (pt::text(content.${l}) match "${s}" || title.${l} match "${s}")] | order(publishedAt desc) [].slug.current`;
  const d: string[] | null = await client.fetch(query);
  return d;
};