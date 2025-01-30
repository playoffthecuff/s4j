import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import { Tag } from "lucide-react";
import { PortableText } from "next-sanity";
import { Stage } from "@/lib/types/sanity-data";
import { filterDate } from "./helpers";
import clsx from "clsx";
import { BezierTransitionIcon } from "@/components/icons";

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
      className="text-muted-foreground hover:text-foreground border-0 data-[state=open]:text-foreground"
    >
      <div
        className={clsx("w-full h-3 ml-[14px]", index && "border-l-4")}
      ></div>
      <AccordionTrigger disabled={!content} className="p-0 hover:no-underline">
        <div className="flex w-full">
          <div className="relative">
            <div
              className={clsx("h-2 ml-[14px]", index && "border-l-4")}
            ></div>
            {index !== 0 && (
              <BezierTransitionIcon
                width={20}
                className="absolute bottom-[38px] left-1.5 text-border rotate-180"
              />
            )}
            <div className="w-8 h-8 rounded-full bg-border flex justify-center items-center">
              <Tag width={16} height={16} />
            </div>
            {!isLast && (
              <BezierTransitionIcon
                width={20}
                className="absolute top-[38px] left-1.5 text-border"
              />
            )}
            <div
              className={clsx("h-2 ml-[14px]", !isLast && "border-l-2")}
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
            <p>{heading}</p>
          </div>
        </div>
      </AccordionTrigger>
      <div
        className={clsx("w-full h-2 ml-[14px]", !isLast && "border-l-4")}
      ></div>
      <AccordionContent className="ml-[14px] pl-[30px] pr-6 border-l-4 border-t-4 pt-1 pb-4 prose dark:prose-invert">
        {content && <PortableText value={content} />}
      </AccordionContent>
    </AccordionItem>
  );
}
