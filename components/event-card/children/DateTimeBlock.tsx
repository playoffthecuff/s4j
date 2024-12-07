import { DELTA } from "@/lib/utils/isRubicon";
import { localeDateData, m } from "./localeDateData";

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
  const day = d.getDay();
  const hour = d.getHours();
  const minutes = d.getMinutes();
  const past = new Date(Date.now() - DELTA) > d;

  return (
    <div className={className}>
      <time
        dateTime={`${year}-${("" + (month + 1)).padStart(2, "0")}-${("" + date).padStart(2, "0")}`}
      >
        <div className="flex gap-2 items-end">
          <p className="text-[42px] leading-none font-mono">
            {("" + date).padStart(2, "0")}
          </p>
          <div className={`${lng === "en" && "order-first"} w-full`}>
            {past && (
              <p className="font-mono text-muted-foreground font-bold leading-tight"></p>
            )}
            <p
              className={`text-base leading-tight mb-[2px] ${lng === "en" && "order-first"}`}
            >
              {m[lng][month]}
            </p>
          </div>
        </div>
        <div className="flex gap-2 text-base mt-1">
          <p className="font-mono">
            <span>{("" + hour).padStart(2, "0")}</span>
            <span>:</span>
            <span>{("" + minutes).padStart(2, "0")}</span>
          </p>
          <p
            className={`text-muted-foreground ${lng === "en" && "order-first"} ${past && "w-full"}`}
          >
            {localeDateData[lng][day]}
          </p>
        </div>
      </time>
    </div>
  );
}
