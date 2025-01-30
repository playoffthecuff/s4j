"use client";
import { Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui";
import useLocale from "@/lib/hooks/useLocale";
import Link from "next/link";

export type BreadCrumbLink = {
  link: string;
  text: string;
};

export default function BreadCrumbs({
  menuLinks,
  crumbLinks,
  paigeLink,
}: {
  menuLinks: BreadCrumbLink[];
  crumbLinks: BreadCrumbLink[];
  paigeLink: string;
}) {
  const locale = useLocale();
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-base justify-center text-foreground">
        <BreadcrumbItem>
          <Link
            className="transition-colors  hover:text-muted-foreground"
            href={`/${locale}`}
          >
            <Home className="p-0.5" />
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="transition-color h-6 w-6 hover:text-muted-foreground" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {menuLinks.map((ml) => (
                <DropdownMenuItem className="text-base p-0">
                  <Link
                    className="transition-colors hover:text-muted-foreground inline-block w-full h-full px-2 py-1.5 capitalize"
                    href={`/${locale}/${ml.link}`}
                  >
                    {ml.text}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {crumbLinks.map((cl) => (
          <>
            <BreadcrumbItem>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Link
                    className="transition-color hover:text-muted-foreground underline truncate max-w-16"
                    href={`/${locale}/${cl.link}`}
                  >
                    {cl.text}
                  </Link>
                </TooltipTrigger>
                {cl.text.length > 7 && (
                  <TooltipContent className="bg-background/60 backdrop-blur-md text-base">
                    <p>{cl.text}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ))}
        <BreadcrumbItem>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <BreadcrumbPage className="capitalize truncate max-w-16 text-muted-foreground">
                {paigeLink}
              </BreadcrumbPage>
            </TooltipTrigger>
            {paigeLink.length > 6 && (
              <TooltipContent className="bg-background/60 backdrop-blur-md text-base">
                <p>{paigeLink}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
