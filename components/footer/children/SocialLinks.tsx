import { fetchCredentials } from "@/lib/utils/apiService";
import { MessageForm } from "./MessageForm";
import { InlineSvgTooltipButton } from "@/components/buttons";

export async function SocialLinks() {
  const data = await fetchCredentials();
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
                aria-label={d.label.en}
              >
                <InlineSvgTooltipButton label={d.label} svg={d.svg} />
              </a>
            ),
        )}
      {data.emailWithSvg.visibility && (
        <a
          href={`mailto:${data.emailWithSvg.email}`}
          className="rounded-md"
          aria-label="email"
        >
          <InlineSvgTooltipButton
            translation="email"
            svg={data.emailWithSvg.svg}
          />
        </a>
      )}
      {data.phoneWithSvg.visibility && (
        <a
          href={`tel:${data.phoneWithSvg.phone}`}
          className="rounded-md"
          aria-label="phone number"
        >
          <InlineSvgTooltipButton
            translation="phone"
            svg={data.phoneWithSvg.svg}
          />
        </a>
      )}
      <MessageForm />
    </div>
  );
}
