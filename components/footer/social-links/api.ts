import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { defineQuery } from "next-sanity";

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

type SocialWithSvg = Social & Svg;
type PhoneWithSvg = Phone & Svg;
type EmailWithSvg = Email & Svg;

interface Credentials {
  phone: Phone;
  email: Email;
  social: Social[];
}

export default async function getCredentials() {
  const q = defineQuery(`
    * [_type == 'credentials'][0]
  `);
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