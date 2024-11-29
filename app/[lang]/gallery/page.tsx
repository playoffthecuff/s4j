import MasonryLayout from "@/components/masonry/Masonry";
import { fetchGalleryImages } from "@/utils/apiService";

export default async function Page() {
  const images = await fetchGalleryImages();
  return <MasonryLayout className="mt-20 mb-4"items={images} gap={4} rounding={0} />;
}
