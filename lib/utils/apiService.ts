import { Locale } from "@/i18n-config";
import { client } from "@/lib/sanity/client";
import { I18nString } from "@/lib/types/i18n-string";
import {
  Author,
  BlogArticle,
  Credentials,
  EmailWithSvg,
  EventAndPlacename,
  EventType,
  Favicon,
  Img,
  MainInfoType,
  MentionType,
  PhoneWithSvg,
  Settings,
  SocialWithSvg,
  TimelineType,
} from "@/lib/types/sanity-data";
import { urlFor } from "../sanity/image";

export const fetchGalleryImages = async () => {
  const query = `
    * [_type == 'galleryImage'] {
        image,
        description,
        title,
        'lqip': image.asset->metadata.lqip,
        'width': image.asset->metadata.dimensions.width,
        'height': image.asset->metadata.dimensions.height
      }`;
  const d: Img[] = await client.fetch(query);
  return d;
};

export const fetchGreetings = async (l: Locale) => {
  const q = `* [_type == 'phrase' && name == 'Приветствие'] {phrase}[0]`;
  const d: { phrase: I18nString } = await client.fetch(q);
  const { [l]: g } = d.phrase;
  return g;
};

const fetchAuthorSettings = async () => {
  const q = `* [_type == 'author'][0]{
'timelineVisible':settings.timelineVisible,
'aboutVisible': settings.aboutVisible,
'mentionsVisible':settings.mentionsVisible,
}`;
  const d: Settings = await client.fetch(q);
  return d;
};

const fetchMainInfo = async (l: Locale) => {
  const q = `* [_type == 'author'][0]{
    "image": mainInfo.image,
    "lqip": mainInfo.image.asset->metadata.lqip,
    "annotation": mainInfo.annotation.${l},
    "authorName": mainInfo.authorName.${l},
  }`;
  const d: MainInfoType = await client.fetch(q);
  return d;
};

const fetchTimeline = async (l: Locale) => {
  const q = `* [_type == 'author'][0]{
    'monthVisible': timeline.settings.monthVisible,
    'stages': timeline.stages[]{
      startDate,
      endDate,
      'heading': heading.${l},
      'content': content.${l},
    },
  }`;
  const d: TimelineType = await client.fetch(q);
  return d;
};

const fetchMentions = async () => {
  const q = `* [_type == 'author'][0]{mentions}`;
  const d: { mentions: MentionType[] } = await client.fetch(q);
  return d.mentions;
};

export const fetchAuthor = async (l: Locale): Promise<Author> => {
  const settings = await fetchAuthorSettings();
  const mainInfo = settings.aboutVisible ? await fetchMainInfo(l) : undefined;
  const timeline = settings.timelineVisible
    ? await fetchTimeline(l)
    : undefined;
  const mentions = settings.mentionsVisible ? await fetchMentions() : [];
  return { mainInfo, timeline, mentions };
};

export const fetchBlogArticle = async (slug: string) => {
  const query = `
  *[_type == "blog" && slug.current == "${slug}"] {
    "slug": slug.current,
      title,
      content,
      titleImage
  }[0]`;
  const d: BlogArticle = await client.fetch(query);
  return d;
};

const API_URL = "https://nominatim.openstreetmap.org/reverse?";

const fetchPlaceName = async (lat: number, lon: number, lng: string) => {
  try {
    const r = await fetch(
      `${API_URL}lat=${lat}&lon=${lon}&format=json&accept-language=${lng}`,
    );
    const d = await r.json();
    return d.display_name;
  } catch (e) {
    const err = e as Error;
    console.error(err?.message ?? "");
    return null;
  }
};

export const fetchEventsAndPlaceNames = async () => {
  const q = `* [_type == 'event'] | order(date desc)`;
  const d: EventType[] = await client.fetch(q);
  const e: EventAndPlacename[] = await Promise.all(
    d.map(async (e) => {
      if (e.place?.lat && e.place.lng) {
        const { lat, lng } = e.place;
        const [en, ru] = await Promise.all([
          fetchPlaceName(lat, lng, "en"),
          fetchPlaceName(lat, lng, "ru"),
        ]);
        return en && ru ? { ...e, placeName: { ru, en } } : e;
      } else {
        return e;
      }
    }),
  );
  return e;
};

export async function fetchFavicon() {
  const q = `
  * [_type == 'favicon' && use] {
    "svgUrl": svg.asset -> url,
    "icoUrl": ico.asset -> url,
    "logoUrl": logo.asset -> url,
    "manifestUrl": manifest.asset -> url,
    "applePngUrl": applePng.asset -> url,
    "png96Url": png192.asset -> url,
    "png192Url": png192.asset -> url,
    "png512Url": png512.asset -> url,
  }[0]
  `;
  const d: Favicon = await client.fetch(q);
  return d;
}

export async function fetchCredentials() {
  const q = `
    * [_type == 'credentials'][0]
  `;
  const credentials = await client.fetch(q);
  const { phone, email, social }: Credentials = credentials;

  const socialsWithSvg: SocialWithSvg[] = await Promise.all(
    social
      .filter((s) => !!s?.icon)
      .map(async (s) => {
        const svgUrl = urlFor(s.icon).url();
        const svg = await fetch(svgUrl).then((res) => res.text());
        return {
          ...s,
          svg,
        };
      }),
  );
  const phoneSvg = await fetch(urlFor(phone.icon).url()).then((r) => r.text());
  const emailSvg = await fetch(urlFor(email.icon).url()).then((r) => r.text());
  const phoneWithSvg: PhoneWithSvg = {
    ...phone,
    svg: phoneSvg,
  };
  const emailWithSvg: EmailWithSvg = {
    ...email,
    svg: emailSvg,
  };
  return {
    socialsWithSvg,
    phoneWithSvg,
    emailWithSvg,
  };
}
