"use client";
import {
  TouchScrollIcon,
  MouseScrollIcon,
  LeftArrowKeyIcon,
  LeftClickZoomIcon,
  EscapeKeyIcon,
  F11KeyIcon,
  RightArrowKeyIcon,
  TapCenterIcon,
  TapSideIcon,
  LeftClickNavIcon,
} from "@/components/icons";
import { EnterKeyIcon } from "@/components/icons/enter";
import { useI18n } from "@/lib/utils/i18context";

export function InfoButtonPopoverContent() {
  const t = useI18n();
  return (
    <div className="backdrop-blur-md bg-background/60 p-2">
      <div className="flex gap-2 h-16 items-center">
        <div className="[@media(any-hover:hover)]:hidden">
          <TouchScrollIcon width={56} height={44} />
        </div>
        <div className="[@media(any-hover:none)]:hidden">
          <MouseScrollIcon width={56} height={44} />
        </div>
        {t.scrollHintTooltip}
        <br />
        {t.interfaceTooltip}
      </div>
      <div className="flex gap-2 h-16 items-center">
        <div className="[@media(any-hover:hover)]:hidden">
          <TapCenterIcon width={56} height={48} />
        </div>
        <div className="[@media(any-hover:none)]:hidden">
          <LeftClickZoomIcon width={56} height={56} />
        </div>
        <div>
          {t.centerZoomClickHintStartTooltip}
          <br />
          {t.centerZoomClickHintEndTooltip}
        </div>
      </div>
      <div className="flex gap-2 h-16 items-center leading-tight">
        <div className="[@media(any-hover:hover)]:hidden">
          <TapSideIcon width={56} height={48} />
        </div>
        <div className="[@media(any-hover:none)]:hidden">
          <LeftClickNavIcon width={56} height={56} />
        </div>
        <div>
          {t.sideZoomClickHintStartTooltip}
          <br />
          {t.sideZoomClickHintEndTooltip}
        </div>
      </div>
      <div className="hidden gap-2 h-16 items-center lowercase [@media(any-hover:hover)]:flex">
        <div>
          <LeftArrowKeyIcon width={56} height={56} />
        </div>
        {t.previousSlideTooltip}
      </div>
      <div className="hidden gap-2 h-16 items-center lowercase [@media(any-hover:hover)]:flex">
        <div>
          <RightArrowKeyIcon width={56} height={56} />
        </div>
        {t.nextSlideTooltip}
      </div>
      <div className="hidden gap-2 h-16 items-center lowercase [@media(any-hover:hover)]:flex">
        <div>
          <EnterKeyIcon width={56} height={36} />
        </div>
        {t.centerZoomClickHintEndTooltip}
      </div>
      <div className="hidden gap-2 h-16 items-center lowercase [@media(any-hover:hover)]:flex">
        <div>
          <F11KeyIcon width={56} height={36} />
        </div>
        {t.screenModeTooltip}
        <br />
        {t.modeTooltip}
      </div>
      <div className="hidden gap-2 h-16 items-center lowercase [@media(any-hover:hover)]:flex">
        <div>
          <EscapeKeyIcon width={56} height={36} />
        </div>
        {t.escapeTooltip}
      </div>
    </div>
  );
}
