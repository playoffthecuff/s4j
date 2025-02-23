import { Locale } from "@/i18n-config";
import { client } from "@/lib/sanity/client";

export const fetchSearchedGalleryImageSlugs = async (l: Locale, s: string) => {
  const query = `*[_type == "galleryImage" && visible == true  && (title.${l} match "${s}" || description.${l} match "${s}")] | order(publishedAt desc) [].slug.current`;
  const d: string[] | null = await client.fetch(query);
  return d;
};