import Masonry from "@/components/masonry/Masonry";
import { Locale } from "@/i18n-config";
import { fetchGalleryImages } from "@/lib/utils/apiService";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const description = params.lang === "ru" ? "Юлия Рибетки. Галерея. Работы." : "Julia Ribetki. Gallery. Works."
  const title = params.lang === "ru" ? "Галерея | Юлия Рибетки" : "Gallery | Julia Ribetki";
  return {
    alternates: {
      canonical: "/gallery/",
      languages: {
        en: "/en/gallery",
        ru: "/ru/gallery",
      },
    },
    title,
    description,
  }
}

export default async function Page({params}: {params: {lang: Locale}}) {
  const images = await fetchGalleryImages(params.lang);
  return <Masonry items={images} className="mt-[7.5rem] mb-16 px-4"/>;
}
