import getCredentials from "./api";
import TooltipButton from "@/components/tooltip-button/TooltipButton";
import MessageForm from "../message-form/MessageForm";

export default async function SocialLinks() {
  const data = await getCredentials();
  return (
    <div className="max-w-7xl mx-auto px-4 flex justify-center gap-x-5 gap-y-4 flex-wrap">
      {data.socialsWithSvg &&
        data.socialsWithSvg.map(
          (d) =>
            d.visibility && (
              <a
                href={d.link}
                key={d.link}
                target="_blank"
                className="rounded-md"
              >
                <TooltipButton label={d.label} svg={d.svg} />
              </a>
            ),
        )}
      {data.emailWithSvg.visibility && (
        <a href={`mailto:${data.emailWithSvg.email}`} className="rounded-md" aria-label="email">
          <TooltipButton translation="email" svg={data.emailWithSvg.svg} />
        </a>
      )}
      {data.phoneWithSvg.visibility && (
        <a href={`tel:${data.phoneWithSvg.phone}`} className="rounded-md" aria-label="phone number">
          <TooltipButton translation="phone" svg={data.phoneWithSvg.svg} />
        </a>
      )}
      <MessageForm />
    </div>
  );
}
