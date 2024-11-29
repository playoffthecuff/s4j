import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { MentionType } from "@/types/sanity-data";

export default function Quote({
  className,
  data,
}: {
  className?: string;
  data: MentionType;
}) {
  return (
    <div className={className}>
      <Alert className="border-0 bg-border border-s-4 border-s-muted-foreground pl-3 py-2 min-w-64">
        <AlertTitle className="w-fit">
          <em>
            <blockquote className="before:content-['“'] before:text-2xl after:text-2xl before:mr-1 after:ml-1 after:content-['„']">{data.quote}</blockquote>
          </em>
        </AlertTitle>
        {(data.link || data.source) && (
          <AlertDescription className="text-muted-foreground w-fit ml-auto">
            {data.link && (
              <a className="underline hover:text-foreground leading-8" href={data.link} target="_blank">
                {data.source}
              </a>
            )}
            <span className="leading-8">{!data.link && data.source && data.source}</span>
          </AlertDescription>
        )}
      </Alert>
    </div>
  );
}
