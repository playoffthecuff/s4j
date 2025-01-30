"use client";
import { useI18n } from "@/lib/utils/i18context";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { CalendarEvent, EventAndPlacename } from "@/lib/types/sanity-data";
import { DELTA } from "@/lib/utils/isRubicon";
import { cn } from "@/lib/utils";
import { DateTimeBlock, LeftTime } from "./children";
import { GoogleMap } from "./children/GoogleMap";
import css from "./event-card.module.css";
import CalendarMenu from "./children/CalendarMenu";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui";

export function EventCard({
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

  const testText =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis deserunt ducimus dolor libero nostrum enim, ex assumenda culpa, at amet, atque eaque? Eaque quas accusamus, facere recusandae nulla dignissimos vel itaque dicta nisi reprehenderit quasi dolorem inventore natus maxime aliquid perferendis nemo reiciendis, illum repellat deserunt nam sapiente voluptatem, ea a. Autem iusto, dolor magnam aut cum non. Quibusdam error perferendis repellat numquam neque dolorem ipsam optio voluptates, possimus illum a est voluptatem. Saepe a excepturi ipsam deserunt voluptas, unde totam possimus modi consequuntur? Deserunt excepturi velit aut expedita molestias eveniet repellendus esse possimus doloremque. Rerum a aliquid aliquam nulla.";

  return (
    <Card
      className={cn(
        "transition-opacity duration-200 hover:opacity-100",
        !future && !expanded && "opacity-65",
        className,
      )}
    >
      <CardHeader className="px-4 py-0">
        <CardTitle className="flex justify-between font-normal items-center leading-tight pt-2 pb-1">
          <span>{event.title[lang]}</span>
          {future ? (
            <div className="float-right leading-[0.68]">
              <CalendarMenu e={e} />
            </div>
          ) : (
            <p className="text-2xl float-right text-muted-foreground font-bold">
              {e.start.getFullYear()}
            </p>
          )}
        </CardTitle>
        <Separator style={{ marginTop: 2 }} />
        <div
          className={cn(
            "text-base pt-0.5 transition-all duration-100",
            css.dropdown,
            !expanded && "line-clamp-6",
            !expanded && css.collapsed,
          )}
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
          <AccordionItem value="item-1" className="border-0">
            <AccordionTrigger
              className={cn(
                "px-4 py-2 mt-2 hover:bg-muted hover:no-underline border-y",
              )}
            >
              {expanded ? t.collapse : t.expand}
            </AccordionTrigger>
            <AccordionContent className="py-0">
              <CardContent className="p-0 sm:p-4 pt-3 border-b">
                {paramountAddress && <p className="pl-4">{paramountAddress}</p>}
                {secondaryAddress && (
                  <p className="pl-4 mb-1">{secondaryAddress}</p>
                )}
                <div className="flex flex-col sm:flex-row">
                  {event.place && (
                    <GoogleMap
                      className="h-80 min-w-80 w-full"
                      lang={lang}
                      lat={event.place.lat}
                      lng={event.place.lng}
                      variant={event.links?.length ? "thin" : "wide"}
                    />
                  )}
                  {event.links?.length && (
                    <div className="max-w-1/2 flex flex-col gap-3 p-4 sm:py-0">
                      {event.links.map((l, i) => (
                        <a
                          className="text-base hover:bg-border w-fit px-2 py-1 relative before:content-[''] after:content-[''] before:absolute after:absolute before:bg-border after:bg-border before:w-0.5 after:w-3 before:h-3 after:h-0.5 before:bottom-0 before:left-0 after:bottom-0 after:left-0"
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
      <CardFooter className="px-4 py-1 justify-end">
        <LeftTime
          className={`${future ? "text-foreground font-semibold" : "text-muted-foreground"}`}
          lng={lang}
          dt={event.date}
        />
      </CardFooter>
    </Card>
  );
}
