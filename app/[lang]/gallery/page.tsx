import Masonry from "@/components/masonry/Masonry";
import { fetchGalleryImages } from "@/lib/utils/apiService";

export default async function Page() {
  const images = await fetchGalleryImages();
  return <Masonry className="mt-28 mb-14 min-h-[calc(100vh-236px)]" items={images} />;
}
