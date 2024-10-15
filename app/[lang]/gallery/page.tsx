import MasonryLayout from "@/components/masonry/Masonry";
import { client } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Img {
  lqip: string | null;
  image: SanityImageSource;
  width: number;
  height: number;
  description: string
}

async function getData() {
  const query = `
* [_type == 'galleryImage'] {
    image,
    description,
    'lqip': image.asset->metadata.lqip,
    'width': image.asset->metadata.dimensions.width,
    'height': image.asset->metadata.dimensions.height
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function Gallery() {
  const data: Img[] = await getData();
  return (
      <MasonryLayout items={data} gap={4} rounding={0}/>
  );
}
