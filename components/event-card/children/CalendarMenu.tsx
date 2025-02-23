"use client";
import { useI18n } from "@/lib/utils/i18context";
import { CalendarPlus } from "lucide-react";
import {
  GoogleCalendarIcon,
  IcsIcon,
  Office365Icon,
  OutlookIcon,
  YahooIcon,
} from "../../icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { CalendarEvent } from "./helpers";
import useLinks from "./use-links";

export default function CalendarMenu({ e }: { e: CalendarEvent }) {
  const t = useI18n();
  const { googleLink, icsLink, o365Link, outlookLink, yahooLink } = useLinks(e);
  const p = (e: Event) => e.preventDefault();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-muted rounded-sm transition-colors hover:cursor-pointer">
        <Tooltip >
          <TooltipTrigger asChild>
            <CalendarPlus className="w-10 h-10 p-2 stroke-2" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{t.addToCalendar}</p>
          </TooltipContent>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 tracking-wider" onCloseAutoFocus={p}>
        <DropdownMenuItem>
          <a
            className="flex gap-3 items-center text-lg"
            href={googleLink}
            target="_blank"
          >
            <GoogleCalendarIcon style={{ width: "24px", height: "24px" }} />
            Google Calendar
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a
            className="flex gap-3 items-center text-lg"
            href={o365Link}
            target="_blank"
          >
            <Office365Icon style={{ width: "24px", height: "24px" }} />
            Office 365
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a
            className="flex gap-3 items-center text-lg"
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
            className="flex gap-3 items-center text-lg"
            target="_blank"
          >
            <YahooIcon style={{ width: "24px", height: "24px" }} />
            Yahoo
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href={icsLink} className="flex gap-3 items-center text-lg" >
            <IcsIcon style={{ width: "24px", height: "24px" }} />
            File .ics
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
