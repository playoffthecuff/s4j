"use client";

import { TooltipButton } from "@/components/buttons";
import { useI18n } from "@/lib/utils/i18context";
import clsx from "clsx";
import { ReactNode } from "react";
import { useFullScreen } from "./hooks";

export function FullscreenButton({
  className,
  openIcon,
  closeIcon,
  handleOpen,
  handleClose,
}: {
  className?: string;
  openIcon: ReactNode;
  closeIcon: ReactNode;
  handleOpen: () => void;
  handleClose: () => void;
}) {
  const t = useI18n();
  const fs = useFullScreen();
  const handleClick = () => {
    if (fs) {
      handleClose();
    } else {
      handleOpen();
    }
  };
  return (
    <TooltipButton
      className={clsx("relative", className)}
      text={fs ? t.windowedTooltip : t.fullscreenTooltip}
      onClick={handleClick}
      offset={8}
      zClass="z-10"
    >
      <div
        className={clsx(
          "transition-all duration-250 absolute right-1/2 translate-x-1/2 w-fit",
          fs ? "opacity-100 scale-100" : "opacity-0 scale-0"
        )}
      >
        {closeIcon}
      </div>
      <div
        className={clsx(
          "transition-all duration-250 absolute right-1/2 translate-x-1/2 w-fit",
          fs ? "opacity-0 scale-0" : "opacity-100 scale-100"
        )}
      >
        {openIcon}
      </div>
    </TooltipButton>
  );
}
