import { Accordion } from "@/components/ui";
import { TimelineType } from "@/lib/types/sanity-data";
import { TimelineEntry } from "./TimelineEntry";

export function Timeline({
  className,
  entries,
}: {
  entries: TimelineType;
  className?: string;
}) {
  return (
    <Accordion type="single" collapsible className={className} id="time-line">
      {entries.stages.map((e, i, a) => (
        <TimelineEntry
          key={i}
          index={i}
          monthVisible={entries.monthVisible}
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
