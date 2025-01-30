import { Locale } from "@/i18n-config";
import { client } from "@/lib/sanity/client";
import { I18nString } from "@/lib/types/i18n-string";
import {
  Author,
  BlogArticle,
  BlogImageSlugs,
  BlogLightArticle,
  Credentials,
  EmailWithSvg,
  EventAndPlacename,
  EventType,
  Favicon,
  Img,
  MainInfoType,
  MentionType,
  PhoneWithSvg,
  SearchedContent,
  Settings,
  SocialWithSvg,
  TimelineType,
} from "@/lib/types/sanity-data";
import { urlFor } from "../sanity/image";

export const fetchGalleryImage = async (slug: string, l: Locale) => {
  const query = `
    * [_type == 'galleryImage' && slug.current == '${slug}'] {
          "image": image.asset->{
            'width': metadata.dimensions.width,
            'height': metadata.dimensions.height,
            'lqip': metadata.lqip,
            url,
          },
          'description': description.${l},
          'title': title.${l},
          'slug': slug.current,
        }[0]`;
  const d: Img | null = await client.fetch(query);
  return d;
};

export const fetchGalleryImageSlugs = async () => {
  const query = `
    * [_type == 'galleryImage' && visible == true] {
        'slug': slug.current,
      }.slug`;
  const d: string[] = await client.fetch(query);
  return d;
};

export const fetchGalleryImages = async (l: Locale) => {
  const query = `
    * [_type == 'galleryImage' && visible == true] {
        image,
        'slug': slug.current,
        'description': description.${l},
        'title': title.${l},
        'lqip': image.asset->metadata.lqip,
        'width': image.asset->metadata.dimensions.width,
        'height': image.asset->metadata.dimensions.height,
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
    "image": mainInfo.image.asset->{
      "lqip": metadata.lqip,
      "width": metadata.dimensions.width,
      "height": metadata.dimensions.height,
      url,
    },
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

export const fetchBlogArticle = async (slug: string, l: Locale) => {
  const query = `
  *[_type == "blog" && slug.current == "${slug}"]{
    "title": title.${l},
    "content": content.${l}[]{
    ...,
    _type == "ref" => {
      ...,
      "imageData": @->{
        "url": image.asset->url,
        "lqip": image.asset->metadata.lqip,
        "width": image.asset->metadata.dimensions.width,
        "height": image.asset->metadata.dimensions.height,
        "description": description.${l},
        "title": title.${l},
        "slug": slug.current,
        }
      }
    },
    publishedAt,
    "titleImageData": titleImage->{
    "url": image.asset->url,
    "lqip": image.asset->metadata.lqip,
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height,
    'description': description.${l},
    'title': title.${l},
    'slug': slug.current,
    }
  }[0]`;
  const d: BlogArticle | null = await client.fetch(query);
  return d;
};

// export const fetchBlogArticle = async (slug: string, l: Locale) => {
//   const query = `
//   *[_type == "blog" && slug.current == "${slug}"]{
//     "title": title.${l},
//     "content": content.${l}[]{
//     ...,
//     _type == "ref" => {
//       ...,
//       "imageData": @->{
//         "imageUrl": image.asset->url,
//         "lqip": image.asset->metadata.lqip,
//         "width": image.asset->metadata.dimensions.width,
//         "height": image.asset->metadata.dimensions.height,
//         "description": description.${l},
//         "title": title.${l},
//         "slug": slug.current,
//       }
//     }
//   },
//     publishedAt,
//     'titleImage': titleImage->{
//       image {
//         asset->{
//           url,
//           metadata {
//             lqip,
//             dimensions {
//               width,
//               height
//             }
//           }
//         }
//       },
//     'description': description.${l},
//     'title': title.${l},
//     'slug': slug.current,
//     }
//   }[0]`;
//   const d: BlogArticle = await client.fetch(query);
//   return d;
// };

export const fetchBlogArticles = async (l: Locale) => {
  const query = `
  *[_type == "blog"]{
    "slug": slug.current,
    "title": title.${l},
    publishedAt,
    'titleImageData': titleImage->{
    "url": image.asset->url,
    "lqip": image.asset->metadata.lqip,
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height,
    'description': description.${l},
    'title': title.${l},
    'slug': slug.current,
    },
    "content": content.${l}[style == "normal" && !defined(listItem)].children[].text,
  } | order(publishedAt desc)`;
  const d: BlogLightArticle[] | null = await client.fetch(query);
  return d;
};

export const fetchSearchedBlogArticles = async (l: Locale, s: string) => {
  const query = `*[_type == "blog" && (pt::text(content.${l}) match "${s}" || title.${l} match "${s}")]
  {
    "title": title.${l},
    "slug": slug.current,
    "text": pt::text(content.${l}),
    'titleImageData': titleImage->{
    "url": image.asset->url,
    "lqip": image.asset->metadata.lqip,
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height,
    'title': title.${l},
    },
    publishedAt,
  } | order(publishedAt desc)`;
  const d: SearchedContent[] = await client.fetch(query);
  return d;
};

export const fetchSearchedGalleryImages = async (l: Locale, s: string) => {
  const query = `*[_type == "galleryImage" && visible == true  && (title.${l} match "${s}" || description.${l} match "${s}")]
  {
    publishedAt,
    "slug": slug.current,
    "title": title.${l},
    "text": description.${l},
    "titleImageData": image.asset->{
      url,
      "lqip": metadata.lqip,
      "width": metadata.dimensions.width,
      "height": metadata.dimensions.height,
  }
} | order(publishedAt desc)`;
  const d: SearchedContent[] = await client.fetch(query);
  return d;
};

export const fetchBlogArticleSlugs = async () => {
  const query = `*[_type == "blog"].slug.current`;
  const d: string[] | null = await client.fetch(query);
  return d;
};

export const fetchBlogImageSlugs = async (l: Locale, slug: string) => {
  const q = `*[_type == "blog" && slug.current == "${slug}"]{
    "titleImageSlug": titleImage->slug.current,
    "imageSlugs": content.${l}[_type == "ref"][]->slug.current,
    "title": title.${l},
}[0]`;
  const d: BlogImageSlugs = await client.fetch(q);
  return d;
};

const fetchPlaceName = async (lat: number, lon: number, lng: string) => {
  try {
    const r = await fetch(
      `${process.env.NOMINATIM_API_URL}lat=${lat}&lon=${lon}&format=json&accept-language=${lng}`,
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
