import { EventType } from "@/types/sanity-data";

export const DELTA = 3600 * 24;

export const isRubicon = (current: EventType, prev?: EventType) =>
  Date.now() - new Date(current.date).getTime() > DELTA &&
  new Date(prev?.date ?? 0).getTime() - Date.now() > -DELTA;