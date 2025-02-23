import { Locale } from "@/i18n-config";
import { client } from "@/lib/sanity/client";

interface Svg {
  svg: string;
}

interface Contact {
  iconUrl: string;
  visibility: boolean;
}

interface Social extends Contact {
  label: string | null;
  link: string;
}

interface Phone extends Contact {
  phone: string;
}

interface Email extends Contact {
  email: string;
}

interface Rss extends Contact {
  link: string;
}

type SocialWithSvg = Social & Svg;
type PhoneWithSvg = Phone & Svg;
type EmailWithSvg = Email & Svg;
type RssWithSvg = Rss & Svg;

export interface Credentials {
  phoneData: Phone | null;
  emailData: Email | null;
  rssData: Rss | null;
  socialData: Social[];
}

export async function fetchCredentials(l: Locale) {
  const q = `
    * [_type == 'credentials'][0]{
      "phoneData": {
        "phone": phone.phone,
        "visibility": phone.visibility,
        "iconUrl": phone.icon.asset -> url,
      },
      "emailData": {
        "email": email.email,
        "visibility": email.visibility,
        "iconUrl": email.icon.asset -> url,
      },
      "socialData": social[]{
      "label": label.${l},
      visibility,
      "iconUrl": icon.asset -> url,
      link,
      },
       "rssData": {
        "visibility": rss.visibility,
        "iconUrl": rss.icon.asset -> url,
        "link": ${l === "ru" ? "rss.linkRu" : "linkEn"},
      }
    }
  `;

  const credentials: Credentials = await client.fetch(q);
  const { phoneData, emailData, socialData, rssData }: Credentials =
    credentials;
  const socialsWithSvg: SocialWithSvg[] = await Promise.all(
    socialData
      .filter((s) => !!s?.iconUrl)
      .map(async (s) => {
        const svgUrl = s.iconUrl;
        const svg = await fetch(svgUrl).then((res) => res.text());
        return {
          ...s,
          svg,
        };
      })
  );
  const phoneSvg = phoneData
    ? await fetch(phoneData.iconUrl).then((r) => r.text())
    : null;
  const emailSvg = emailData
    ? await fetch(emailData.iconUrl).then((r) => r.text())
    : null;
  const rssSvg = rssData
    ? await fetch(rssData.iconUrl).then((r) => r.text())
    : null;
  const phoneWithSvg: PhoneWithSvg | null =
    phoneData && phoneSvg
      ? {
          ...phoneData,
          svg: phoneSvg,
        }
      : null;
  const emailWithSvg: EmailWithSvg | null =
    emailData && emailSvg
      ? {
          ...emailData,
          svg: emailSvg,
        }
      : null;
  const rssWithSvg: RssWithSvg | null =
    rssData && rssSvg
      ? {
          ...rssData,
          svg: rssSvg,
        }
      : null;
  return {
    socialsWithSvg,
    phoneWithSvg,
    emailWithSvg,
    rssWithSvg,
  };
}
