export type CalendarEvent = {
  start: Date;
  title: string;
  end?: Date;
  duration?: number;
  description?: string;
  location?: string;
};

const MS_IN_HOUR = 3600000;
const DEFAULT_DURATION = 1;

const formatTime = (date: Date) => {
  return date.toISOString().replace(/-|:|\.\d+/g, "");
};

const calculateEndTime = (event: CalendarEvent) => {
  return event.end
    ? formatTime(event.end)
    : formatTime(
        new Date(
          event.start.getTime() +
            (event.duration ?? DEFAULT_DURATION) * MS_IN_HOUR
        )
      );
};

export const calendarLinksGenerator = {
  google(event: CalendarEvent) {
    const startTime = formatTime(event.start);
    const endTime = calculateEndTime(event);

    return encodeURI(
      [
        "https://www.google.com/calendar/render",
        "?action=TEMPLATE",
        "&text=" + (event.title || ""),
        "&dates=" + (startTime || ""),
        "/" + (endTime || ""),
        "&details=" + (event.description || ""),
        "&location=" + (event.location || ""),
        "&sprop=&sprop=name:",
      ].join("")
    );
  },

  yahoo(event: CalendarEvent) {
    const startTime = formatTime(event.start);
    const endTime = calculateEndTime(event);

    return encodeURI(
      [
        "https://calendar.yahoo.com/",
        "?desc=" + (event.location ?? ""),
        "&dur=false",
        "&et=" + endTime,
        "&in_loc=" + (event.location ?? ""),
        "&st=" + startTime,
        "&title=" + (event.title ?? ""),
        "&v=60",
      ].join("")
    );
  },

  ics(event: CalendarEvent) {
    const startTime = formatTime(event.start);
    const endTime = calculateEndTime(event);

    return encodeURI(
      "data:text/calendar;charset=utf8," +
        [
          "BEGIN:VCALENDAR",
          "VERSION:2.0",
          "BEGIN:VEVENT",
          "URL:" + document.URL,
          "DTSTART:" + (startTime || ""),
          "DTEND:" + (endTime || ""),
          "SUMMARY:" + (event.title || ""),
          "DESCRIPTION:" + (event.description || ""),
          "LOCATION:" + (event.location || ""),
          "END:VEVENT",
          "END:VCALENDAR",
        ].join("\n")
    );
  },

  ical(event: CalendarEvent) {
    return this.ics(event);
  },

  outlook: function (event: CalendarEvent) {
    const startTime = formatTime(event.start);
    const endTime = calculateEndTime(event);
    return encodeURI(
      [
        "https://outlook.live.com/calendar/0/action/compose?allday=false",
        "&body=" + (event.description || ""),
        "&enddt=" + endTime.slice(0, endTime.length - 1),
        event.location ? "&location=" + event.location : "",
        "&path=%2Fcalendar%2Faction%2Fcompose",
        "&rru=addevent",
        "&startdt=" + startTime.slice(0, startTime.length - 1),
        "&subject=" + event.title,
      ].join("")
    );
  },

  office365(event: CalendarEvent) {
    const startTime = formatTime(event.start);
    const endTime = calculateEndTime(event);

    return encodeURI(
      [
        "https://outlook.live.com/calendar/0/action/compose?allday=false",
        "&body=" + (event.description || ""),
        "&enddt=" + endTime.slice(0, endTime.length - 1),
        event.location ? "&location=" + event.location : "",
        "&path=%2Fcalendar%2Faction%2Fcompose",
        "&rru=addevent",
        "&startdt=" + startTime.slice(0, startTime.length - 1),
        "&subject=" + event.title,
      ].join("")
    );
  },
};

export const phrasesFuture = {
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
        : "Less than " + (n + 1) + " days until the start",
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

export const phrasesPast = {
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

export function getTimeDifference(d1: Date, d2: Date) {
  const startDate = d1 < d2 ? d1 : d2;
  const endDate = d1 < d2 ? d2 : d1;

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();
  let hours = endDate.getHours() - startDate.getHours();

  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    const previousMonth = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      0
    );
    days += previousMonth.getDate();
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days, hours };
}

export const localeDateData = {
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  ru: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница"],
};

export const months = {
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  ru: [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ],
};
