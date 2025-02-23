"use client";

import { TooltipButton } from "@/components/buttons";
import clsx from "clsx";
import { ReactNode } from "react";

export function ToggleButton({
  className,
  onIcon,
  offIcon,
  isOn,
  onText,
  offText,
  handleOn,
  handleOff,
}: {
  className?: string;
  onIcon: ReactNode;
  offIcon: ReactNode;
  isOn: boolean;
  onText: string;
  offText: string;
  handleOn: () => void;
  handleOff: () => void;
}) {

  const handleClick = () => {
    if (isOn) {
      handleOff()
    } else {
      handleOn();
    }
  };
  return (
    <TooltipButton
      className={clsx("relative", className)}
      text={isOn ? onText : offText}
      onClick={handleClick}
      offset={8}
      zClass="z-10"
    >
      <div
        className={clsx(
          "transition-all duration-250 absolute right-1/2 translate-x-1/2 w-fit",
          isOn ? "opacity-100 scale-100" : "opacity-0 scale-0"
        )}
      >
        {offIcon}
      </div>
      <div
        className={clsx(
          "transition-all duration-250 absolute right-1/2 translate-x-1/2 w-fit",
          isOn ? "opacity-0 scale-0" : "opacity-100 scale-100"
        )}
      >
        {onIcon}
      </div>
    </TooltipButton>
  );
}
