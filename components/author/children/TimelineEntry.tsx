import { Stage } from "@/app/[lang]/(with-footer)/about/fetchAuthor";
import { BezierTransitionIcon } from "@/components/icons";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import clsx from "clsx";
import { Tag } from "lucide-react";
import { PortableText } from "next-sanity";
import { filterDate } from "./helpers";

export interface TimelineEntryProps extends Stage {
  index?: number;
  isLast?: boolean;
  monthVisible: boolean;
}

export function TimelineEntry({
  startDate,
  endDate,
  index,
  heading,
  monthVisible,
  isLast = false,
  content,
}: TimelineEntryProps) {
  startDate = filterDate(monthVisible, startDate);
  if (endDate) endDate = filterDate(monthVisible, endDate);
  return (
    <AccordionItem
      disabled={!content}
      value={"" + index}
      className="border-0 data-[state=open]:text-foreground pr-2"
    >
      <div className={clsx("w-full h-4 ml-[15px]", index && "border-l-2")} />
      <AccordionTrigger
        disabled={!content}
        className="p-0 data-[state=open]:text-(--tw-prose-body) hover:text-foreground hover:cursor-pointer text-muted-foreground hover:no-underline disabled:pointer-events-none disabled:hover:text-muted-foreground disabled:[&>svg]:text-muted"
      >
        <div className="flex w-full">
          <div className="relative">
            {index !== 0 && (
              <BezierTransitionIcon
                width={20}
                className="absolute bottom-[37.75px] left-1.5 text-border rotate-180"
              />
            )}
            <div className={clsx("h-2 ml-[15px]", index !== 0 && "border-l-2")} />
            <div className="w-8 h-8 rounded-full bg-border flex justify-center items-center">
              <Tag width={16} height={16} />
            </div>
            {!isLast && (
              <BezierTransitionIcon
                width={20}
                className="absolute top-[37.75px] left-1.5 text-border"
              />
            )}
            <div
              className={clsx("h-2 ml-[15px]", !isLast && "border-l-2")}
            ></div>
          </div>
          <div className="px-4 text-start">
            <p className="flex justify-between">
              <span className="font-mono">{startDate}</span>
              {endDate && (
                <>
                  <span className="text-center w-12">—</span>
                  <span className="font-mono">{endDate}</span>
                </>
              )}
            </p>
            <p className="text-lg tracking-wide">{heading}</p>
          </div>
        </div>
      </AccordionTrigger>
      <div className={clsx("w-full h-2 ml-[15px]", !isLast && "border-l-2")} />
      <AccordionContent className="border-l-2 ml-[15px] pt-4 pr-2 relative">
        <BezierTransitionIcon
          width={9}
          className="absolute top-[5px] left-px text-border -rotate-90 scale-x-200"
        />
        <div className="border-t-2 pt-1 prose dark:prose-invert pl-[30px] pr-3 max-w-full [&>ul]:list-inside tracking-wide text-lg">
          {content && <PortableText value={content} />}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
