import { Locale } from "@/i18n-config";
import { TypedObject } from "@portabletext/types";
import { client } from "@/lib/sanity/client";
import { Blog, RgbColor } from "../../../types";

export interface BlogArticle extends Blog {
  content: TypedObject | TypedObject[];
  lightColor: RgbColor | null;
  darkColor: RgbColor | null;
}

export const fetchBlogArticleSlugs = async () => {
  const query = `*[_type == "blog" && visible == true] | order(publishedAt desc) [].slug.current`;
  const d: string[] | null = await client.fetch(query);
  return d;
};

export const fetchBlogArticle = async (slug: string, l: Locale) => {
  const query = `
  *[_type == "blog" && slug.current == "${slug}" && visible == true]{
    "title": title.${l},
    "content": content.${l}[]{
    ...,
    _type == "ref" => {
      ...,
      "imageData": @->{
        "url": image.asset->url,
        "lqip": image.asset->metadata.lqip,
        "width": image.asset->metadata.dimensions.width,
        "height": image.asset->metadata.dimensions.height,
        "description": description.${l},
        "title": title.${l},
        "slug": slug.current,
        }
      }
    },
    publishedAt,
    "titleImageData": titleImage->{
    "url": image.asset->url,
    "lqip": image.asset->metadata.lqip,
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height,
    "description": description.${l},
    "title": title.${l},
    "slug": slug.current,
    },
    "lightColor": lightColor.rgb,
    "darkColor": darkColor.rgb,
  }[0]`;
  const d: BlogArticle | null = await client.fetch(query);
  return d;
};
