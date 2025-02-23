import { Locale } from "@/i18n-config";
import { client } from "@/lib/sanity/client";
import { GalleryImage } from "../../types";

export const fetchGalleryImages = async (l: Locale) => {
  const query = `
    * [_type == 'galleryImage' && visible == true] {
        'url': image.asset->url,
        'slug': slug.current,
        'description': description.${l},
        'title': title.${l},
        'lqip': image.asset->metadata.lqip,
        'width': image.asset->metadata.dimensions.width,
        'height': image.asset->metadata.dimensions.height,
      }`;
  const d: GalleryImage[] = await client.fetch(query);
  return d;
};
