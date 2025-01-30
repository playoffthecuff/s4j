"use client";

import { Share2, X } from "lucide-react";
import { useI18n } from "@/lib/utils/i18context";
import clsx from "clsx";
import { TooltipButton } from "@/components/buttons";

export function ShareButton({
  className,
  open,
  handleClick,
}: {
  className?: string;
  open: boolean;
  handleClick: () => void;
}) {
  const t = useI18n();
  const tooltipStyle = {
    backgroundColor: "hsl(var(--background) / 0.6)",
    backdropFilter:
      "blur(12px) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
    fontSize: "16px",
  };
  return (
    <TooltipButton
      className={clsx("grid content-center rounded-full", className)}
      text={open ? t.closeTooltip : t.shareTooltip}
      onClick={handleClick}
      style={{ gridTemplateAreas: "icon" }}
      offset={8}
      zClass="z-50"
      tooltipStyle={tooltipStyle}
    >
      <X
        className={clsx(
          "transition-all duration-250",
          open ? "opacity-100 scale-100" : "opacity-0 scale-0",
        )}
        style={{ gridArea: "icon" }}
      />
      <Share2
        className={clsx(
          "transition-all duration-250",
          open ? "opacity-0 scale-0" : "opacity-100 scale-100",
        )}
        style={{ gridArea: "icon" }}
      />
    </TooltipButton>
  );
}
