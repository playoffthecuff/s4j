import { fetchCredentials } from "@/components/footer/children/fetchCredentials";
import { PushNotificationManager } from "@/components/subscription";
import { TooltipIcon, TooltipTranslationIcon } from "@/components/tooltips";
import { LinkButton } from "@/components/ui";
import { Locale } from "@/i18n-config";
import { MessageForm } from "./MessageForm";

export async function SocialLinks({ lang }: { lang: Locale }) {
  const data = await fetchCredentials(lang);
  const subject = encodeURIComponent(
    lang === "en"
      ? "message from ribetki.vercel.app"
      : "сообщение с ribetki.vercel.app"
  );
  return (
    <div className="mx-auto px-4 flex justify-center gap-5 flex-wrap">
      {data.socialsWithSvg &&
        data.socialsWithSvg.map(
          (d) =>
            d.visibility && (
              <TooltipIcon text={d.label ?? ""} offset={8} key={d.link}>
                <LinkButton
                  href={d.link}
                  target="_blank"
                  className="rounded-md px-2 w-10"
                  aria-label={d.label ?? undefined}
                  variant="outline"
                  dangerouslySetInnerHTML={{ __html: d.svg }}
                />
              </TooltipIcon>
            )
        )}
      {data.emailWithSvg?.visibility && (
        <TooltipTranslationIcon translation="email" offset={8}>
          <LinkButton
            href={`mailto:${data.emailWithSvg.email}?subject=${subject}`}
            className="rounded-md"
            aria-label={lang === "en" ? "Email" : "Электронная почта"}
            variant="outline"
            size="icon"
            dangerouslySetInnerHTML={{ __html: data.emailWithSvg.svg }}
          />
        </TooltipTranslationIcon>
      )}
      {data.phoneWithSvg?.visibility && (
        <TooltipTranslationIcon translation="phone" offset={8}>
          <LinkButton
            href={`tel:${data.phoneWithSvg.phone}`}
            className="rounded-md"
            aria-label={lang === "en" ? "Phone number" : "Номер телефона"}
            variant="outline"
            size="icon"
            dangerouslySetInnerHTML={{ __html: data.phoneWithSvg.svg }}
          />
        </TooltipTranslationIcon>
      )}
      {data.rssWithSvg?.visibility && (
        <TooltipTranslationIcon translation="rss" offset={8}>
          <LinkButton
            href={data.rssWithSvg.link}
            className="rounded-md"
            aria-label={lang === "en" ? "RSS feed" : "RSS лента"}
            variant="outline"
            target="_blank"
            size="icon"
            dangerouslySetInnerHTML={{ __html: data.rssWithSvg.svg }}
          />
        </TooltipTranslationIcon>
      )}
      <PushNotificationManager />
      <MessageForm />
    </div>
  );
}
