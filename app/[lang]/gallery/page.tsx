import Masonry from "@/components/masonry/Masonry";
import { fetchGalleryImages } from "@/utils/apiService";

export default async function Page() {
  const images = await fetchGalleryImages();
  return <Masonry className="mt-20 mb-4" items={images} gap={4} rounding={0} />;
}
