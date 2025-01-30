import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui";
import { useI18n } from "@/lib/utils/i18context";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import { TooltipIcon } from "./TooltipIcon";

export function PaginationNavigation({
  prev,
  next,
  className,
}: {
  prev?: string | null;
  next?: string | null;
  className?: string;
}) {
  const t = useI18n();
  return (
    <Pagination className={className}>
      <PaginationContent className="gap-x-5">
        <PaginationItem className="leading-3">
          <PaginationLink href={prev ?? "/"} disabled={!prev}>
            <TooltipIcon text={t.previousTooltip} offset={8} delay={50}>
              <ChevronLeft className="w-full h-full p-2" />
            </TooltipIcon>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="leading-3">
          <PaginationLink href=".">
            <TooltipIcon text={t.listTooltip} offset={8} delay={50}>
              <List className="w-full h-full p-2" />
            </TooltipIcon>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="leading-3">
          <PaginationLink href={next ?? "/"} disabled={!next}>
            <TooltipIcon text={t.nextTooltip} offset={8} delay={50}>
              <ChevronRight className="w-full h-full p-2" />
            </TooltipIcon>
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
