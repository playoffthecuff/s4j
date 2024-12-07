import { MentionType } from "@/lib/types/sanity-data";
import { cn } from "@/lib/utils";
import { Quote } from "./children";

export function Mentions({
  className,
  data,
}: {
  className?: string;
  data: MentionType[];
}) {
  return (
    <section
      className={cn("min-[576px]:columns-2 columns-1 gap-x-6", className)}
    >
      {data &&
        data.map((m, i) => (
          <Quote className="mb-6 break-inside-avoid-column" data={m} key={i} />
        ))}
    </section>
  );
}
