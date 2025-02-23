"use client";
import { useI18n } from "@/lib/utils/i18context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Button } from "../ui";

export function InlineSvgTooltipButton({
  svg,
  label,
  translation,
}: {
  svg: string;
  label?: string;
  translation?: string;
}) {
  const t = useI18n();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          tabIndex={-1}
          dangerouslySetInnerHTML={{ __html: svg }}
        ></Button>
      </TooltipTrigger>
      <TooltipContent
        sideOffset={8}
        className="bg-background/60 backdrop-blur-md px-2 py-1 z-20 bottom-2 border"
      >
        {label && <p>{label}</p>}
        {translation && <p>{t[translation]}</p>}
      </TooltipContent>
    </Tooltip>
  );
}
