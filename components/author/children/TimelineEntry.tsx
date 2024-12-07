import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import { Tag } from "lucide-react";
import { PortableText } from "next-sanity";
import { Locale } from "@/i18n-config";
import { Stage } from "@/lib/types/sanity-data";
import { formatDate } from "./formatDate";
import clsx from "clsx";
import { BezierTransitionIcon } from "@/components/icons";

export interface TimelineEntryProps extends Stage {
  index?: number;
  isLast?: boolean;
  monthVisible: boolean;
  lng: Locale;
}

export function TimelineEntry({
  startDate,
  endDate,
  index,
  lng,
  heading,
  monthVisible,
  isLast = false,
  content,
}: TimelineEntryProps) {
  startDate = formatDate(monthVisible, startDate, lng);
  if (endDate) endDate = formatDate(monthVisible, endDate, lng);
  return (
    <AccordionItem
      disabled={!content}
      value={"" + index}
      className="text-muted-foreground hover:text-foreground border-0 data-[state=open]:text-foreground"
    >
      <div
        className={clsx("w-full h-3 ml-[14px]", index && "border-l-[4px]")}
      ></div>
      <AccordionTrigger disabled={!content} className="p-0 hover:no-underline">
        <div className="flex">
          <div className="relative">
            <div
              className={clsx("h-2 ml-[14px]", index && "border-l-[4px]")}
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
              className={clsx("h-2 ml-[14px]", !isLast && "border-l-[2px]")}
            ></div>
          </div>
          <div className="px-3 text-start w-full">
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
        className={clsx("w-full h-2 ml-[14px]", !isLast && "border-l-[4px]")}
      ></div>
      <AccordionContent className="ml-[14px] pl-6 pr-4 border-l-[4px] pb-1 prose dark:prose-invert">
        {content && <PortableText value={content} />}
      </AccordionContent>
    </AccordionItem>
  );
}
