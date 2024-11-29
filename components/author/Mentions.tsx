import { MentionType } from "@/types/sanity-data";
import Quote from "../quote/Quote";

export default function Mentions({
  className,
  data,
}: {
  className?: string;
  data: MentionType[];
}) {
  return (
    <section className={className}>
      <div className="min-[576px]:columns-2 columns-1" style={{columnGap: 16}}>
        {data &&
          data.map((m, i) => <Quote className="mb-4 break-inside-avoid-column" data={m} key={i} />)}
      </div>
    </section>
  );
}
