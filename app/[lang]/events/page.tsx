import { EventCard, EventsDivider } from "@/components/event-card";
import { fetchEventsAndPlaceNames } from "@/lib/utils/apiService";
import { isRubicon } from "@/lib/utils/isRubicon";

export default async function Page({
  params,
}: {
  params: { lang: "en" | "ru" };
}) {
  const d = await fetchEventsAndPlaceNames();
  return (
    <div className="px-4 mx-auto mt-28 mb-14 w-fit min-h-[calc(100vh-236px)]">
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
