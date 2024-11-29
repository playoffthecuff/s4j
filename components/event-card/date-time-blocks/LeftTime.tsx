import HourGlassClockIcon from "@/components/icons/sand-clocks/hour-glass-clock";
import getTimeDifference from "@/utils/getTimeDifference";

const phrasesFuture = {
  en: {
    y: (n: number) =>
      n > 1
        ? "More than " + n + " years before the start"
        : "More than a year until the start",
    m: (n: number) =>
      n > 10
        ? "Less than a year until the start"
        : "Less than " + (n + 1) + " months until the start",
    d: (n: number) =>
      n > 26
        ? "Less than a month left until the start"
        : n + 1 + "Less than " + (n + 1) + "days until the start",
    h: (n: number) =>
      n > 22
        ? "Less than a day left until the start"
        : n < 1
          ? "Less than an hour until the start"
          : "Less than" + (n + 1) + "hours until start",
  },
  ru: {
    y: (n: number) => "До начала больше " + (n > 1 ? n + " лет" : "года"),
    m: (n: number) =>
      "До начала меньше " + (n > 10 ? "года" : n + 1 + " месяцев"),
    d: (n: number) =>
      "До начала меньше " + (n > 26 ? "месяца" : n + 1 + " дней"),
    h: (n: number) =>
      "До начала менее " +
      (n > 22 ? "суток" : n < 1 ? "часа" : n + 1 + " часов"),
  },
};

const phrasesPast = {
  en: {
    y: (n: number) =>
      n > 1
        ? "More than " + n + " years have passed since the beginning"
        : "More than a year has passed since the beginning",
    m: (n: number) =>
      n > 10
        ? "Almost a year has passed since the beginning"
        : n < 2
          ? "More than a month has passed since the start"
          : n + "months have passed since the start",
    d: (n: number) =>
      n > 26
        ? "Almost a month has passed since the beginning"
        : n < 2
          ? "More than a day has passed since the start"
          : "More than " + n + " days have passed since the start",
    h: (n: number) =>
      n > 22
        ? "Almost a day has passed since the start"
        : n < 1
          ? "It's been less than an hour since the beginning"
          : n + " hours have passed since the beginning",
  },
  ru: {
    y: (n: number) =>
      "После начала прошло больше " + (n > 1 ? n + " лет" : " года"),
    m: (n: number) =>
      n > 10
        ? "После начала прошёл почти год"
        : n < 2
          ? "После начала прошло больше месяца"
          : "После начала прошло больше " + n + " месяцев",
    d: (n: number) =>
      n > 26
        ? "После начала прошёл почти месяц"
        : n < 2
          ? "После начала прошло более суток"
          : "После начала прошло больше " + n + " дней",
    h: (n: number) =>
      n > 22
        ? "После начала прошли почти сутки"
        : n < 1
          ? "С начала прошло менее часа"
          : "С начала прошло " + n + " часов",
  },
};

export default function LeftTime({
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
    <p className={className}>
      {pre && <span>{pre}</span>}
      <HourGlassClockIcon style={{ width: "24px", height: "24px" }} />
      <span>
        {dif.years
          ? phrases[lng].y(dif.years)
          : dif.months
            ? phrases[lng].m(dif.months)
            : dif.days
              ? phrases[lng].d(dif.days)
              : phrases[lng].h(dif.hours)}.
      </span>
    </p>
  );
}
