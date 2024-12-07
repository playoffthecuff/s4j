"use client";
import { CalendarPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useI18n } from "@/lib/utils/i18context";
import { calendarLinksGenerator } from "./calendarLinksGenerator";
import { CalendarEvent } from "@/lib/types/sanity-data";
import {
  GoogleCalendarIcon,
  IcsIcon,
  Office365Icon,
  OutlookIcon,
  YahooIcon,
} from "../icons";

export default function CalendarMenu({ e }: { e: CalendarEvent }) {
  const t = useI18n();
  const googleLink = calendarLinksGenerator.google(e);
  const outlookLink = calendarLinksGenerator.outlook(e);
  const o365Link = calendarLinksGenerator.office365(e);
  const icsLink = calendarLinksGenerator.ics(e);
  const yahooLink = calendarLinksGenerator.yahoo(e);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-muted rounded transition-colors">
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <CalendarPlus className="w-10 h-10 p-2" />
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
          <a
            className="flex gap-3 items-center text-base"
            href={googleLink}
            target="_blank"
          >
            <GoogleCalendarIcon style={{ width: "24px", height: "24px" }} />
            Google Calendar
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a
            className="flex gap-3 items-center text-base"
            href={o365Link}
            target="_blank"
          >
            <Office365Icon style={{ width: "24px", height: "24px" }} />
            Office 365
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a
            className="flex gap-3 items-center text-base"
            href={outlookLink}
            target="_blank"
          >
            <OutlookIcon style={{ width: "24px", height: "24px" }} />
            Outlook
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a
            href={yahooLink}
            className="flex gap-3 items-center text-base"
            target="_blank"
          >
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
