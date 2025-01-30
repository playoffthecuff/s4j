"use client";

import { useI18n } from "@/lib/utils/i18context";
import clsx from "clsx";
import { TooltipButton } from "@/components/buttons";
import { ReactNode, useState } from "react";
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
      className={clsx("grid content-center", className)}
      text={fs ? t.windowedTooltip : t.fullscreenTooltip}
      onClick={handleClick}
      style={{ gridTemplateAreas: "icon" }}
      offset={8}
      zClass="z-10"
      tooltipStyle={{
        backgroundColor: "hsl(var(--background) / 0.6)",
        backdropFilter:
          "blur(12px) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
        fontSize: "16px",
      }}
    >
      <div
        className={clsx(
          "transition-all duration-250",
          fs ? "opacity-100 scale-100" : "opacity-0 scale-0",
        )}
        style={{ gridArea: "icon" }}
      >
        {closeIcon}
      </div>
      <div
        className={clsx(
          "transition-all duration-250",
          fs ? "opacity-0 scale-0" : "opacity-100 scale-100",
        )}
        style={{ gridArea: "icon" }}
      >
        {openIcon}
      </div>
    </TooltipButton>
  );
}
