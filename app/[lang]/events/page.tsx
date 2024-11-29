import EventsDivider from "@/components/event-card/EventsDivider";
import EventCard from "@/components/event-card/EventCard";
import { fetchEventsAndPlaceNames } from "@/utils/apiService";
import { isRubicon } from "@/utils/isRubicon";

export default async function Page({
  params,
}: {
  params: { lang: "en" | "ru" };
}) {
  const d = await fetchEventsAndPlaceNames();
  return (
    <div className="px-4 mx-auto mt-20 mb-8 w-fit">
      {d.map((e, i) => (
        <>
          {isRubicon(e, d[i - 1]) && <EventsDivider />}
          <EventCard
            className="my-7 max-w-screen-md"
            lang={params.lang}
            event={e}
            key={e.date}
          />
        </>
      ))}
    </div>
  );
}
