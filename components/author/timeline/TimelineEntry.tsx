import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Tag } from "lucide-react";
import css from "./item.module.css";
import BezierTransitionIcon from "../../icons/bezier-transition";
import { PortableText } from "next-sanity";
import { Locale } from "@/i18n-config";
import { Stage } from "@/types/sanity-data";
import { formatDate } from "@/utils/formatDate";

export interface TimelineEntryProps extends Stage {
  index?: number;
  isLast?: boolean;
  monthVisible: boolean;
  lng: Locale;
}

export default function TimelineEntry({
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
      className={`text-muted-foreground hover:text-foreground border-0 ${css.item}`}
    >
      <div
        className={`w-full h-3 ml-[15px] ${index ? "border-l-[3px]" : ""}`}
      ></div>
      <AccordionTrigger disabled={!content} className="p-0 hover:no-underline">
        <div className="flex">
          <div className="relative">
            <div
              className={`h-2 ml-[15px] ${index ? "border-l-[3px]" : ""}`}
            ></div>
            {index !== 0 && (
              <BezierTransitionIcon
                width={12}
                className="absolute bottom-[35px] left-[10px] text-border rotate-180"
              />
            )}
            <div
              className={`w-8 h-8 rounded-full bg-border flex justify-center items-center`}
            >
              <Tag width={16} height={16} />
            </div>
            {!isLast && (
              <BezierTransitionIcon
                width={12}
                className="absolute top-[35px] left-[10px] text-border"
              />
            )}
            <div
              className={`h-2 ml-[15px] ${!isLast ? "border-l-[3px]" : ""}`}
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
        className={`w-full h-2 ml-[15px] ${!isLast ? "border-l-[3px]" : ""}`}
      ></div>
      <AccordionContent className="ml-[15px] pl-6 pr-4 border-l-[3px] pb-1 prose dark:prose-invert">
        {content && <PortableText value={content} />}
      </AccordionContent>
    </AccordionItem>
  );
}
