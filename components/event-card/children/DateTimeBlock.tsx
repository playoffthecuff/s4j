import { DELTA } from "@/lib/utils/isRubicon";
import clsx from "clsx";
import { localeDateData, months } from "./helpers";

export function DateTimeBlock({
  dt,
  lng,
  className,
}: {
  dt: string;
  lng: "en" | "ru";
  className?: string;
}) {
  const d = new Date(dt);
  const year = d.getFullYear();
  const month = d.getMonth();
  const date = d.getDate();
  const fDate = `${("" + date).padStart(2, "0")}`;
  const day = d.getDay();
  const hour = d.getHours();
  const minutes = d.getMinutes();
  const past = new Date(Date.now() - DELTA) > d;

  return (
    <time
      dateTime={`${year}-${("" + (month + 1)).padStart(2, "0")}-${fDate}`}
      className={clsx("rounded-sm px-2 py-1", className)}
    >
      <div className="flex gap-2 items-end">
        <p className="text-[42px] leading-none font-mono">{fDate}</p>
        <div className={clsx("w-full")}>
          {past && (
            <p className="font-mono text-muted-foreground font-bold leading-tight"></p>
          )}
          <p
            className={clsx(
              "text-lg leading-tight mb-[2px]",
            )}
          >
            {months[lng][month]}
          </p>
        </div>
      </div>
      <div className="flex gap-2 text-base">
        <p className="font-mono mt-0.75 tracking-normal px-0.5">
          <span>{("" + hour).padStart(2, "0")}</span>
          <span>:</span>
          <span>{("" + minutes).padStart(2, "0")}</span>
        </p>
        <p
          className={clsx(
            "text-muted-foreground text-lg",
            past && "w-full"
          )}
        >
          {localeDateData[lng][day]}
        </p>
      </div>
    </time>
  );
}
