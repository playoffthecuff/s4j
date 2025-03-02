import { Locale } from "@/i18n-config";
import { TypedObject } from "@portabletext/types";
import { client } from "@/lib/sanity/client";
import { ImageType } from "../../types";

export type MainInfoType = {
  authorName: string;
  image: ImageType | null;
  annotation: TypedObject | TypedObject[];
};

export type Stage = {
  heading: string;
  startDate: string;
  content: TypedObject | TypedObject[];
  endDate: string | null;
};

export type TimelineType = {
  monthVisible: boolean;
  stages: Stage[];
};

export type MentionType = {
  quote: string;
  link: string;
  source: string | null;
};

export type Author = {
  mainInfo: MainInfoType | null;
  timeline?: TimelineType | null;
  mentions?: MentionType[] | null;
};

const fetchMainInfo = async (l: Locale) => {
  const q = `* [_type == 'author' && settings.aboutVisible == true][0]{
    "image": mainInfo.image.asset->{
      "lqip": metadata.lqip,
      "width": metadata.dimensions.width,
      "height": metadata.dimensions.height,
      url,
    },
    "annotation": mainInfo.annotation.${l},
    "authorName": mainInfo.authorName.${l},
  }`;
  const d: MainInfoType | null = await client.fetch(q);
  return d;
};

const fetchTimeline = async (l: Locale) => {
  const q = `* [_type == 'author' && settings.timelineVisible == true][0]{
    'monthVisible': timeline.settings.monthVisible,
    'stages': timeline.stages[]{
      startDate,
      endDate,
      'heading': heading.${l},
      'content': content.${l},
    } | order(startDate desc),
  }`;
  const d: TimelineType | null = await client.fetch(q);
  return d;
};

const fetchMentions = async () => {
  const q = `* [_type == 'author' && settings.mentionsVisible == true][0].mentions`;
  const d: MentionType[] | null = await client.fetch(q);
  return d;
};

export const fetchAuthor = async (l: Locale): Promise<Author> => {
  const mainInfo = await fetchMainInfo(l);
  const timeline = await fetchTimeline(l);
  const mentions = await fetchMentions();
  return { mainInfo, timeline, mentions };
};
