import { MentionType } from "@/app/[lang]/(with-footer)/about/fetchAuthor";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";

export function Quote({
  className,
  data,
}: {
  className?: string;
  data: MentionType;
}) {
  return (
    <Alert
      className={cn(
        "border-0 bg-border border-s-4 border-s-muted-foreground pl-2.5 pr-3 pt-1.5 pb-1.25 min-w-64 tracking-wide text-lg",
        className
      )}
    >
      <AlertTitle className="w-fit">
        <em>
          <blockquote className="before:content-['“'] before:text-2xl after:text-2xl before:mr-1 after:ml-0 after:content-['”'] after:relative after:top-4">
            {data.quote}
          </blockquote>
        </em>
      </AlertTitle>
      {(data.link || data.source) && (
        <AlertDescription className="text-muted-foreground w-fit ml-auto text-base mt-2">
          {data.link && (
            <a
              className="underline hover:text-foreground leading-8"
              href={data.link}
              target="_blank"
            >
              {data.source}
            </a>
          )}
          <span className="leading-8">
            {!data.link && data.source && data.source}
          </span>
        </AlertDescription>
      )}
    </Alert>
  );
}
