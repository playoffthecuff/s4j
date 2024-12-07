import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { TypedObject } from "sanity";

export type Img = {
  lqip: string | null;
  image: SanityImageSource;
  width: number;
  height: number;
  title: string;
  description: string;
};

export type Settings = {
  mentionsVisible: boolean;
  timelineVisible: boolean;
  aboutVisible: boolean;
};

export type MainInfoType = {
  authorName: string;
  image?: SanityImageSource;
  lqip: string | null;
  annotation?: TypedObject | TypedObject[];
};

export type Stage = {
  heading: string;
  startDate: string;
  content?: TypedObject | TypedObject[];
  endDate?: string;
};

export type TimelineType = {
  monthVisible: boolean;
  stages: Stage[];
};

export type MentionType = {
  quote: string;
  link?: string;
  source?: string;
};

export type Author = {
  mainInfo?: MainInfoType;
  timeline?: TimelineType;
  mentions?: MentionType[];
};

export type BlogArticle = {
  title: string;
  content: TypedObject | TypedObject[];
  slug: string;
  titleImage: SanityImageSource;
};

export type CalendarEvent = {
  start: Date;
  title: string;
  end?: Date;
  duration?: number;
  description?: string;
  location?: string;
};

export interface EventAndPlacename extends EventType {
  placeName?: {
    ru?: string;
    en?: string;
  };
}

export type I18nString = {
  ru: string;
  en: string;
};

export type Geopoint = {
  lng: number;
  lat: number;
};

export type Link = {
  text: I18nString;
  link: string;
};

export type EventType = {
  title: I18nString;
  date: string;
  duration?: number;
  description?: I18nString;
  details?: I18nString;
  place?: Geopoint;
  visible: boolean;
  links?: Link[];
};

export type Favicon = {
  png96Url: string;
  png192Url: string;
  png512Url: string;
  svgUrl: string;
  icoUrl: string;
  logoUrl: string;
  manifestUrl: string;
  applePngUrl: string;
};

interface Contact {
  label: { ru: string; en: string };
  icon: SanityImageSource;
  visibility: boolean;
}

interface Svg {
  svg: string;
}

interface Social extends Contact {
  link: string;
}

interface Phone extends Contact {
  phone: string;
}

interface Email extends Contact {
  email: string;
}

export type SocialWithSvg = Social & Svg;
export type PhoneWithSvg = Phone & Svg;
export type EmailWithSvg = Email & Svg;

export interface Credentials {
  phone: Phone;
  email: Email;
  social: Social[];
}
