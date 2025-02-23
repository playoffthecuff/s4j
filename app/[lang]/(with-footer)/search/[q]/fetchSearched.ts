import { Locale } from "@/i18n-config";
import { client } from "@/lib/sanity/client";
import { Blog } from "../../../types";

export interface SearchedContent extends Blog {
  text: string | null;
}

export const fetchSearchedGalleryImages = async (l: Locale, s: string) => {
  const query = `*[_type == "galleryImage" && visible == true  && (title.${l} match "${s}" || description.${l} match "${s}")]
  {
    publishedAt,
    "slug": slug.current,
    "title": title.${l},
    "text": description.${l},
    "titleImageData": image.asset->{
      url,
      "lqip": metadata.lqip,
      "width": metadata.dimensions.width,
      "height": metadata.dimensions.height,
  }
} | order(publishedAt desc)`;
  const d: SearchedContent[] = await client.fetch(query);
  return d;
};

export const fetchSearchedBlogArticles = async (l: Locale, s: string) => {
  const query = `*[_type == "blog" && (pt::text(content.${l}) match "${s}" || title.${l} match "${s}")]
  {
    "title": title.${l},
    "slug": slug.current,
    "text": pt::text(content.${l}),
    "titleImageData": titleImage->{
    "url": image.asset->url,
    "lqip": image.asset->metadata.lqip,
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height,
    "title": title.${l},
    },
    publishedAt,
  } | order(publishedAt desc)`;
  const d: SearchedContent[] = await client.fetch(query);
  return d;
};
