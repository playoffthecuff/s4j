"use client";
import { TooltipIcon } from "@/components/tooltips/";
import {
  Button,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui";
import { useI18n } from "@/lib/utils/i18context";
import { ChevronLeft, ChevronRight, List } from "lucide-react";

export function PaginationNavigation({
  prev,
  next,
  className,
  stepBack = 1,
}: {
  prev: string | null;
  next: string | null;
  className?: string;
  stepBack?: 1 | 2;
}) {
  const t = useI18n();
  return (
    <Pagination className={className} aria-label={t.pagination}>
      <PaginationContent className="gap-x-5">
        <PaginationItem className="leading-3">
          <PaginationLink
            href={prev ?? ""}
            aria-disabled={!prev}
            className="aria-disabled:pointer-events-none"
          >
            <TooltipIcon
              text={t.previousTooltip}
              offset={8}
              delay={50}
              disabled={!prev}
            >
              <Button
                variant="ghost"
                size="icon"
                disabled={!prev}
                aria-label={t.previousTooltip}
                tabIndex={-1}
              >
                <ChevronLeft />
              </Button>
            </TooltipIcon>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="leading-3">
          <PaginationLink href={stepBack === 1 ? "." : "../"}>
            <TooltipIcon text={t.listTooltip} offset={8}>
              <Button
                variant="ghost"
                size="icon"
                aria-label={t.listTooltip}
                tabIndex={-1}
              >
                <List />
              </Button>
            </TooltipIcon>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="leading-3">
          <PaginationLink
            href={next ?? "./"}
            aria-disabled={!next}
            className="aria-disabled:pointer-events-none"
          >
            <TooltipIcon text={t.nextTooltip} offset={8}>
              <Button
                variant="ghost"
                size="icon"
                disabled={!next}
                aria-label={t.nextTooltip}
                tabIndex={-1}
              >
                <ChevronRight />
              </Button>
            </TooltipIcon>
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
