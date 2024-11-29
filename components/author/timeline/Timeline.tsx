import TimelineEntry from "./TimelineEntry";
import { Accordion } from "../../ui/accordion";
import { Locale } from "@/i18n-config";
import { TimelineType } from "@/types/sanity-data";

export default function Timeline({
  className,
  entries,
  lng,
}: {
  entries: TimelineType;
  className?: string;
  lng: Locale;
}) {
  return (
    <section className={className}>
      <Accordion type="single" collapsible>
        {entries.stages.map((e, i, a) => (
          <TimelineEntry
            key={i}
            index={i}
            monthVisible={entries.monthVisible}
            lng={lng}
            content={e.content}
            startDate={e.startDate}
            endDate={e.endDate}
            heading={e.heading}
            isLast={i === a.length - 1}
          />
        ))}
      </Accordion>
    </section>
  );
}
