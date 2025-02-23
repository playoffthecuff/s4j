import { Locale } from "@/i18n-config";
import { client } from "@/lib/sanity/client";
import { TypedObject } from "@portabletext/types";

type Geopoint = {
  lng: number;
  lat: number;
};

type Event = {
  title: string;
  date: string;
  dateEnd: string;
  place: Geopoint | null;
  content: TypedObject | TypedObject[];
};

export interface EventType extends Event {
  placeName: string | null;
}

const fetchPlaceName = async (lat: number, lon: number, lng: string) => {
  try {
    const r = await fetch(
      `${process.env.NOMINATIM_API_URL}lat=${lat}&lon=${lon}&format=json&accept-language=${lng}`
    );
    const d: { display_name: string } = await r.json();
    return d.display_name;
  } catch (e) {
    const err = e as Error;
    console.error(err?.message ?? "");
    return null;
  }
};

export const fetchEvents = async (l: Locale) => {
  const q = `* [_type == 'event' && visible == true]{
  place,
  "title": title.${l},
  name,
  "content": content.${l},
  date,
  dateEnd,
} | order(date desc)`;
  const d: Event[] = await client.fetch(q);
  const e: EventType[] = await Promise.all(
    d.map(async (e) => {
      if (e.place?.lat && e.place.lng) {
        const { lat, lng } = e.place;
        const placeName = await fetchPlaceName(lat, lng, l);
        return { ...e, placeName };
      } else {
        return { ...e, placeName: null };
      }
    })
  );
  return e;
};
