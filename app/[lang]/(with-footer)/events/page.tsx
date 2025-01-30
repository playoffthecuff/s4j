import { EventCard, EventsDivider } from "@/components/event-card";
import { Locale } from "@/i18n-config";
import { fetchEventsAndPlaceNames } from "@/lib/utils/apiService";
import { isRubicon } from "@/lib/utils/isRubicon";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const description = params.lang === "ru" ? "Юлия Рибетки. Блог. Статьи." : "Julia Ribetki. Blog. Articles."
  const title = params.lang === "ru" ? "События | Юлия Рибетки" : "Events | Julia Ribetki";
  return {
    alternates: {
      canonical: "/events/",
      languages: {
        en: "/en/events",
        ru: "/ru/events",
      },
    },
    title,
    description,
  }
}

export default async function Page({
  params,
}: {
  params: { lang: "en" | "ru" };
}) {
  const d = await fetchEventsAndPlaceNames();

  return (
    <div className="mx-auto w-fit mt-[7.5rem] mb-16 px-4">
      {d.map((e, i) => (
        <div key={i}>
          {isRubicon(e, d[i - 1]) && <EventsDivider/>}
          <EventCard
            className="my-7 max-w-screen-md"
            lang={params.lang}
            event={e}
          />
        </div>
      ))}
    </div>
  );
}
