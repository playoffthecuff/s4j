import { Locale } from "@/i18n-config";
import { client } from "@/lib/sanity/client";
import { GalleryImage } from "./types";

export type BlogImageSlugs = {
  titleImageSlug: string | null;
  imageSlugs: string[] | null;
  title: string;
};

export const fetchGalleryImage = async (slug: string, l: Locale) => {
  const query = `
    *[_type == 'galleryImage' && slug.current == '${slug}' && visible == true] {
      'width': image.asset->metadata.dimensions.width,
      'height': image.asset->metadata.dimensions.height,
      'lqip': image.asset->metadata.lqip,
      'url': image.asset->url,
      'description': description.${l},
      'title': title.${l},
      'slug': slug.current,
      "lightColor": lightColor.rgb,
      "darkColor": darkColor.rgb,
    }[0]`;
  const d: GalleryImage | null = await client.fetch(query);
  return d;
};

export const fetchGalleryImageSlugs = async () => {
  const query = `
    *[_type == 'galleryImage' && visible == true] {
      'slug': slug.current,
    }.slug`;
  const d: string[] = await client.fetch(query);
  return d;
};

export const fetchBlogImageSlugs = async (l: Locale, slug: string) => {
  const q = `*[_type == "blog" && slug.current == "${slug}" && visible == true]{
    "titleImageSlug": titleImage->slug.current,
    "imageSlugs": content.${l}[_type == "ref"][]->slug.current,
    "title": title.${l},
}[0]`;
  const d: BlogImageSlugs | null = await client.fetch(q);
  return d;
};
