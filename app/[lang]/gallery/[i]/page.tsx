import { GalleryCarousel } from "@/components/carousel";
import { fetchGalleryImages } from "@/lib/utils/apiService";

export default async function Page() {
  const images = await fetchGalleryImages();
  return <GalleryCarousel images={images}></GalleryCarousel>;
}
