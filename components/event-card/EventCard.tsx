"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useI18n } from "@/utils/i18context";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { CalendarEvent, EventAndPlacename } from "@/types/sanity-data";
import { DELTA } from "@/utils/isRubicon";
import DateTimeBlock from "./date-time-blocks/DateTimeBlock";
import LeftTime from "./date-time-blocks/LeftTime";

const DynamicMenu = dynamic(() => import("../calendar-menu/CalendarMenu"), {
  ssr: false,
});

export default function EventCard({
  lang,
  event,
  className,
}: {
  lang: "en" | "ru";
  event: EventAndPlacename;
  className?: string;
}) {
  const t = useI18n();
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => setExpanded(!expanded);

  const e: CalendarEvent = {
    start: new Date(event.date),
    title: event.title[lang],
    duration: event.duration,
    description: event.description?.[lang],
    location: event.placeName?.[lang],
  };

  const address = event.placeName?.[lang]?.split(",");
  const paramountAddress = address?.slice(0, -4).join(",");
  const secondaryAddress = address?.slice(-4).join(",");

  const future = new Date(Date.now() + DELTA) < new Date(event.date);

  const { theme } = useTheme();

  const testText =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis deserunt ducimus dolor libero nostrum enim, ex assumenda culpa, at amet, atque eaque? Eaque quas accusamus, facere recusandae nulla dignissimos vel itaque dicta nisi reprehenderit quasi dolorem inventore natus maxime aliquid perferendis nemo reiciendis, illum repellat deserunt nam sapiente voluptatem, ea a. Autem iusto, dolor magnam aut cum non. Quibusdam error perferendis repellat numquam neque dolorem ipsam optio voluptates, possimus illum a est voluptatem. Saepe a excepturi ipsam deserunt voluptas, unde totam possimus modi consequuntur? Deserunt excepturi velit aut expedita molestias eveniet repellendus esse possimus doloremque. Rerum a aliquid aliquam nulla.";

  return (
    <Card
      className={`${className} ${!future && !expanded && "opacity-65"} transition-opacity duration-200 hover:opacity-100`}
    >
      <CardHeader className="px-4 pb-0 pt-2">
        <CardTitle className="flex justify-between font-normal items-center leading-[1.75]">
          <span>{event.title[lang]}</span>
          {future ? (
            <div className="float-right leading-[0.68]">
              <DynamicMenu e={e} />
            </div>
          ) : (
            <p className="text-2xl float-right text-muted-foreground font-bold">
              {e.start.getFullYear()}
            </p>
          )}
        </CardTitle>
        <Separator style={{ marginTop: 2 }} />
        <div
          className={`text-base pt-0.5 ${!expanded ? "line-clamp-6 max-h-[144px]" : "max-h-[2000px]"} transition-all duration-100`}
        >
          <DateTimeBlock
            dt={event.date}
            lng={lang}
            className="mr-[10px] mt-2 text-primary py-1.5 px-2 bg-secondary rounded-sm inline-block float-start"
          />
          <span>{testText}</span>
        </div>
      </CardHeader>
      {((testText.length ?? 0) > 480 ||
        event.place ||
        event.links?.length ||
        (testText.length ?? 0) >
          Math.abs(window.innerWidth - 300) * 0.7 + 80) && (
        <Accordion type="single" collapsible onValueChange={handleChange}>
          <AccordionItem value="item-1">
            <AccordionTrigger className="px-6 sm:px-4 py-2 mb-2 hover:bg-muted hover:no-underline">
              {expanded ? t.collapse : t.expand}
            </AccordionTrigger>
            <AccordionContent className="pb-2">
              <CardContent className="p-0 sm:px-4 pb-2">
                {paramountAddress && <p className="pl-4">{paramountAddress}</p>}
                {secondaryAddress && <p className="pl-4">{secondaryAddress}</p>}
                <div className="flex gap-3 flex-col sm:flex-row">
                  {event.place && (
                    <div
                      className={`h-80 min-w-80 w-full ${event.links?.length ? "sm:w-80" : ""} ${theme === "dark" && "hue-rotate-180 contrast-75 invert-[1] grayscale-[25%]"}`}
                    >
                      <iframe
                        width="100%"
                        height="100%"
                        title="map"
                        src={`https://maps.google.com/maps?q=${event.place.lat},${event.place.lng}&hl=${"ru"}&z=14&amp&output=embed`}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  )}
                  {event.links?.length && (
                    <div className="max-w-1/2 flex flex-col pl-6 sm:pl-1">
                      {event.links.map((l, i) => (
                        <a
                          className="text-base hover:bg-border w-fit px-2 py-1 mb-2 relative before:content-[''] after:content-[''] before:absolute after:absolute before:bg-border after:bg-border before:w-0.5 after:w-3 before:h-3 after:h-0.5 before:bottom-0 before:left-0 after:bottom-0 after:left-0"
                          href={l.link}
                          target="_blank"
                          key={i}
                        >
                          {l.text[lang]}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      <CardFooter className="px-6 sm:px-4 py-1 justify-end">
        <LeftTime
          className={`text-base py-2 ${future ? "text-foreground font-semibold" : "text-muted-foreground"} flex gap-2`}
          lng={lang}
          dt={event.date}
        />
      </CardFooter>
    </Card>
  );
}
