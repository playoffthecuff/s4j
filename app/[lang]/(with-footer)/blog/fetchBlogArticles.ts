import { Locale } from "@/i18n-config";
import { client } from "@/lib/sanity/client";
import { Blog } from "../../types";

export interface BlogLightArticle extends Blog {
  content: string[];
}

export const fetchBlogArticles = async (l: Locale) => {
  const query = `
  *[_type == "blog" && visible == true]{
    "slug": slug.current,
    "title": title.${l},
    publishedAt,
    'titleImageData': titleImage->{
    "url": image.asset->url,
    "lqip": image.asset->metadata.lqip,
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height,
    'description': description.${l},
    'title': title.${l},
    'slug': slug.current,
    },
    "content": content.${l}[style == "normal" && !defined(listItem)].children[].text,
  } | order(publishedAt desc)`;
  const d: BlogLightArticle[] = await client.fetch(query);
  return d;
};
