import SmokyText from "@/components/smoky-text/SmokyText";
import { Locale } from "@/i18n-config";
import { fetchGalleryImages, fetchGreetings } from "@/utils/apiService";

export default async function Page({ params }: { params: { lang: Locale } }) {
  const images = await fetchGalleryImages();
  const greetings = await fetchGreetings(params.lang);
  return (
    <div className="h-[calc(100vh-126px)] relative">
      <SmokyText
        className="absolute z-10 bottom-1/2 right-1/2 translate-x-1/2 text-4xl translate-y-1/2 w-fit"
        text={greetings}
      />
      {/* <video autoPlay loop muted className="opacity-50 absolute top-0 left-0 w-screen h-screen object-cover">
        <source src="./media/hero.mp4" type="video/mp4"/>
        Sorry, your browser doesn't support embedded videos.
      </video> */}
      {/* <HomeCarousel images={data} delay={5000}></HomeCarousel> */}
    </div>
  );
}
