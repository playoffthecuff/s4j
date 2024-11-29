"use client";
import { CalendarPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import GoogleCalendarIcon from "../icons/google-calendar";
import Office365Icon from "../icons/office365";
import OutlookIcon from "../icons/outlook";
import YahooIcon from "../icons/yahoo";
import IcsIcon from "../icons/ics";
import { useI18n } from "@/utils/i18context";
import { cG } from "@/utils/calendarLinkGenerator";
import { CalendarEvent } from "@/types/sanity-data";

export default function CalendarMenu({
  e,
}: {
  e: CalendarEvent
}) {
  const t = useI18n();
  const googleLink = cG.google(e);
  const outlookLink = cG.outlook(e);
  const o365Link = cG.office365(e);
  const icsLink = cG.ics(e);
  const yahooLink = cG.yahoo(e);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-muted rounded transition-colors">
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <CalendarPlus className="w-10 h-10 p-2"/>
          </TooltipTrigger>
          <TooltipContent
            className={`bg-background/50 backdrop-blur-sm px-2 py-1 rounded-sm z-0 mb-4}`}
          >
            <p>{t.addToCalendar}</p>
          </TooltipContent>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <a className="flex gap-3 items-center text-base" href={googleLink} target="_blank">
            <GoogleCalendarIcon style={{ width: "24px", height: "24px" }} />
            Google Calendar
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a className="flex gap-3 items-center text-base" href={o365Link} target="_blank">
            <Office365Icon style={{ width: "24px", height: "24px" }} />
            Office 365
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a className="flex gap-3 items-center text-base" href={outlookLink} target="_blank">
            <OutlookIcon style={{ width: "24px", height: "24px" }} />
            Outlook
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href={yahooLink} className="flex gap-3 items-center text-base" target="_blank">
            <YahooIcon style={{ width: "24px", height: "24px" }} />
            Yahoo
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href={icsLink} className="flex gap-3 items-center text-base">
            <IcsIcon style={{ width: "24px", height: "24px" }} />
            File .ics
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
