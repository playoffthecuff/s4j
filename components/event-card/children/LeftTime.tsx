import { HourGlassClockIcon } from "@/components/icons";
import { getTimeDifference, phrasesFuture, phrasesPast } from "./helpers";
import clsx from "clsx";

export function LeftTime({
  dt,
  lng,
  pre,
  className,
}: {
  dt: string;
  lng: "en" | "ru";
  pre?: string;
  className?: string;
}) {
  const d = new Date(dt);
  const dif = getTimeDifference(d, new Date());
  const phrases = d >= new Date() ? phrasesFuture : phrasesPast;

  return (
    <p className={clsx("text-base py-2 items-center flex gap-3", className)}>
      {pre && <span>{pre}</span>}
      <HourGlassClockIcon style={{ width: "24px", height: "24px" }} />
      <span>
        {dif.years
          ? phrases[lng].y(dif.years)
          : dif.months
            ? phrases[lng].m(dif.months)
            : dif.days
              ? phrases[lng].d(dif.days)
              : phrases[lng].h(dif.hours)}
        .
      </span>
    </p>
  );
}
