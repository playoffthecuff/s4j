import { useState, useEffect } from "react";
import { CalendarEvent, calendarLinksGenerator } from "./helpers";

export default function useLinks(e: CalendarEvent) {
  const [googleLink, setGoogleLink] = useState("");
  const [icsLink, setIcsLink] = useState("");
  const [o365Link, setO365Link] = useState("");
  const [outlookLink, setOutlookLink] = useState("");
  const [yahooLink, setYahooLink] = useState("");
  useEffect(() => {
    setGoogleLink(calendarLinksGenerator.google(e));
    setIcsLink(calendarLinksGenerator.ics(e));
    setO365Link(calendarLinksGenerator.office365(e));
    setOutlookLink(calendarLinksGenerator.outlook(e));
    setYahooLink(calendarLinksGenerator.yahoo(e));
  }, [e]);
  return {googleLink, icsLink, o365Link, outlookLink, yahooLink}
}
