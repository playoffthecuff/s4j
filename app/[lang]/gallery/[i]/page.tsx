import GalleryCarousel from "@/components/carousel/GalleryCarousel";
import { fetchGalleryImages } from "@/utils/apiService";

export default async function Page() {
  const images = await fetchGalleryImages();
  return <GalleryCarousel className="" images={images}></GalleryCarousel>;
}
