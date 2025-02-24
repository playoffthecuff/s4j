import { fetchCredentials } from "@/components/footer/children/fetchCredentials";
import { TooltipIcon, TooltipTranslationIcon } from "@/components/tooltips";
import { Button } from "@/components/ui";
import { Locale } from "@/i18n-config";
import { MessageForm } from "./MessageForm";
import { PushNotificationManager } from "@/components/subscription";

export async function SocialLinks({ lang }: { lang: Locale }) {
  const data = await fetchCredentials(lang);
  const subject = encodeURIComponent(
    lang === "en"
      ? "message from ribetki.vercel.app"
      : "сообщение с ribetki.vercel.app"
  );
  return (
    <div className="max-w-7xl mx-auto px-4 flex justify-center gap-5 flex-wrap">
      {data.socialsWithSvg &&
        data.socialsWithSvg.map(
          (d) =>
            d.visibility && (
              <a
                href={d.link}
                key={d.link}
                target="_blank"
                className="rounded-md"
                aria-label={d.label ?? undefined}
              >
                <TooltipIcon text={d.label ?? ""} offset={8}>
                  <Button
                    variant="outline"
                    size="icon"
                    dangerouslySetInnerHTML={{ __html: d.svg }}
                  />
                </TooltipIcon>
              </a>
            )
        )}
      {data.emailWithSvg && (
        <a
          href={`mailto:${data.emailWithSvg.email}?subject=${subject}`}
          className="rounded-md"
          aria-label="email"
        >
          <TooltipTranslationIcon translation="email" offset={8}>
            <Button
              variant="outline"
              size="icon"
              dangerouslySetInnerHTML={{ __html: data.emailWithSvg.svg }}
            />
          </TooltipTranslationIcon>
        </a>
      )}
      {data.phoneWithSvg && (
        <a
          href={`tel:${data.phoneWithSvg.phone}`}
          className="rounded-md"
          aria-label="phone number"
        >
          <TooltipTranslationIcon translation="phone" offset={8}>
            <Button
              variant="outline"
              size="icon"
              dangerouslySetInnerHTML={{ __html: data.phoneWithSvg.svg }}
            />
          </TooltipTranslationIcon>
        </a>
      )}
      {data.rssWithSvg && (
        <a
          href={data.rssWithSvg.link}
          className="rounded-md"
          aria-label="rss-feed"
        >
          <TooltipTranslationIcon translation="rss" offset={8}>
            <Button
              variant="outline"
              size="icon"
              dangerouslySetInnerHTML={{ __html: data.rssWithSvg.svg }}
            />
          </TooltipTranslationIcon>
        </a>
      )}
      <PushNotificationManager />
      <MessageForm />
    </div>
  );
}
