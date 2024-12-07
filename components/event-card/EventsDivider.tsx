"use client";

import { ClockArrowDown, ClockArrowUp } from "lucide-react";
import { Separator } from "../ui/separator";
import { useI18n } from "@/lib/utils/i18context";

export function EventsDivider() {
  const t = useI18n();
  return (
    <div className="px-6 sm:px-2 before:w-full before:h-full before:bg-gradient-to-b before:from-background/0 before:to-background/60 relative before:absolute before:top-0 before:left-0 before:pointer-events-none">
      <div className="flex gap-2 mb-2 sm:pl-2">
        <ClockArrowUp />
        <p>{t.upcomingEvents}</p>
      </div>
      <Separator className="bg-muted-foreground h-0.5 rounded" />
      <div className="flex gap-2 justify-end mt-2 sm:pr-2">
        <p>{t.pastEvents}</p>
        <ClockArrowDown />
      </div>
    </div>
  );
}
