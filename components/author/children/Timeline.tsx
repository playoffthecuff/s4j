import { Accordion } from "@/components/ui";
import { Locale } from "@/i18n-config";
import { TimelineType } from "@/lib/types/sanity-data";
import { TimelineEntry } from "./TimelineEntry";

export function Timeline({
  className,
  entries,
  lng,
}: {
  entries: TimelineType;
  className?: string;
  lng: Locale;
}) {
  return (
    <Accordion type="single" collapsible className={className}>
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
  );
}
