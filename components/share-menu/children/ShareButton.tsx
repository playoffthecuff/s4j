"use client";

import { TooltipButton } from "@/components/buttons";
import { useI18n } from "@/lib/utils/i18context";
import clsx from "clsx";
import { Share2, X } from "lucide-react";

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
  return (
    <TooltipButton
      className={clsx("rounded-full", className)}
      text={open ? t.closeTooltip : t.shareTooltip}
      onClick={handleClick}
      offset={8}
      zClass="z-50"
      ariaLabel={open ? t.closeTooltip : t.shareTooltip}
    >
      <X
        className={clsx(
          "transition-all duration-250 absolute bottom-1/2 translate-y-1/2",
          open ? "opacity-100 scale-100" : "opacity-0 scale-0"
        )}
      />
      <Share2
        className={clsx(
          "transition-all duration-250 absolute bottom-1/2 translate-y-1/2",
          open ? "opacity-0 scale-0" : "opacity-100 scale-100"
        )}
      />
    </TooltipButton>
  );
}
