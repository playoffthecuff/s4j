import { CalendarEvent } from "@/lib/types/sanity-data";

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
            (event.duration ?? DEFAULT_DURATION) * MS_IN_HOUR,
        ),
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
      ].join(""),
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
      ].join(""),
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
        ].join("\n"),
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
      ].join(""),
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
      ].join(""),
    );
  },
};
