import { fetchGalleryImages } from "@/app/[lang]/(with-footer)/gallery/fetchGalleryImages";
import Masonry from "@/components/masonry";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const params = await props.params;
  const description =
    params.lang === "ru"
      ? "Юлия Рибетки. Галерея. Работы."
      : "Julia Ribetki. Gallery. Works.";
  const title =
    params.lang === "ru" ? "Галерея | Юлия Рибетки" : "Gallery | Julia Ribetki";
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
  };
}

export default async function Page(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;
  const images = await fetchGalleryImages(params.lang);
  return <Masonry items={images} className="mt-[7.5rem] mb-16 px-4" />;
}
