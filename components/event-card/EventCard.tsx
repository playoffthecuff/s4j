"use client";
import { EventType } from "@/app/[lang]/(with-footer)/events/fetchEvents";
import { Locale } from "@/i18n-config";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/utils/i18context";
import { DELTA } from "@/lib/utils/isRubicon";
import clsx from "clsx";
import { PortableText, PortableTextReactComponents } from "next-sanity";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui";
import { Separator } from "../ui/separator";
import { DateTimeBlock, LeftTime } from "./children";
import CalendarMenu from "./children/CalendarMenu";
import { GoogleMap } from "./children/GoogleMap";
import { CalendarEvent } from "./children/helpers";
import "./event-card.css";
import css from "./event-card.module.css";

interface Event extends EventType {
  description: string;
}

export function EventCard({
  lang,
  event,
  className,
}: {
  lang: Locale;
  event: Event;
  className?: string;
}) {
  const t = useI18n();
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => setExpanded(!expanded);

  const e: CalendarEvent = {
    start: new Date(event.date),
    title: event.title,
    end: new Date(event.dateEnd),
    description: event.description ?? "",
    location: event.placeName ?? "",
  };

  const address = event.placeName?.split(",");
  const paramountAddress = address?.slice(0, -4).join(",");
  const secondaryAddress = address?.slice(-4).join(",");

  const future = new Date(Date.now() + DELTA) < new Date(event.date);

  const components: Partial<PortableTextReactComponents> = {
    block: {
      blockquote: (props) => {
        return (
          <div>
            <blockquote>{props.children}</blockquote>
          </div>
        );
      },
    },
    marks: {
      marked: (props) => {
        return <mark>{props.children}</mark>;
      },
    },
  };

  return (
    <Card
      className={cn(
        "transition-opacity duration-200 hover:opacity-100 tracking-wider",
        !future && !expanded && "opacity-65",
        className
      )}
    >
      <CardHeader className="px-4 py-0">
        <CardTitle
          className={clsx(
            "flex justify-between font-normal items-center leading-tight pt-2 tracking-wide mb-1.5",
            future && "mb-1"
          )}
        >
          <span>{event.title}</span>
          {future ? (
            <div className="float-right leading-[0.68] ml-2">
              <CalendarMenu e={e} />
            </div>
          ) : (
            <p className="text-2xl float-right text-muted-foreground font-mono tracking-normal ml-2">
              {e.start.getFullYear()}
            </p>
          )}
        </CardTitle>
        <Separator style={{ marginTop: 2 }} />
        <div
          className={cn(
            "text-lg pt-0.5 transition-all duration-100",
            css.dropdown,
            !expanded && "overflow-y-hidden",
            !expanded && css.collapsed
          )}
        >
          <DateTimeBlock
            dt={event.date}
            lng={lang}
            className="mr-2.5 mt-0.5 text-primary bg-secondary inline-block float-start"
          />
          {event && event.content && (
            <section className="prose dark:prose-invert text-lg">
              <PortableText value={event.content} components={components} />
            </section>
          )}
        </div>
      </CardHeader>
      {event.place && (
        <Accordion type="single" collapsible onValueChange={handleChange}>
          <AccordionItem value="item-1" className="border-0">
            <AccordionTrigger
              className={cn(
                "px-4 py-2 mt-2 border-y hover:bg-muted hover:no-underline hover:cursor-pointer text-lg"
              )}
            >
              {expanded ? t.collapse : t.expand}
            </AccordionTrigger>
            <AccordionContent className="py-0">
              <CardContent className="p-0 sm:p-4 pt-3 border-b text-base">
                <address>
                  {paramountAddress && <p className="pl-4">{paramountAddress}</p>}
                  {secondaryAddress && (
                    <p className="pl-4 mb-1">{secondaryAddress}</p>
                  )}
                </address>
                <div className="flex flex-col sm:flex-row">
                  {event.place && (
                    <GoogleMap
                      className="h-80 min-w-80 w-full"
                      lang={lang}
                      lat={event.place.lat}
                      lng={event.place.lng}
                      variant="wide"
                    />
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
