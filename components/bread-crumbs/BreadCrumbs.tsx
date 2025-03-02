"use client";
import useLocale from "@/lib/hooks/use-locale";
import { Home } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui";

export type BreadCrumbLink = {
  link: string;
  text: string;
};

export default function BreadCrumbs({
  menuLinks,
  crumbLinks,
  pageLink,
}: {
  menuLinks: BreadCrumbLink[];
  crumbLinks: BreadCrumbLink[];
  pageLink: string;
}) {
  const locale = useLocale();
  return (
    <Breadcrumb>
      <BreadcrumbList className="justify-center text-foreground tracking-wide text-lg">
        <BreadcrumbItem>
          <Link
            className="transition-colors  hover:text-muted-foreground"
            href={`/${locale}`}
            aria-label={locale === "en" ? "go to home page" : "перейти на домашнюю страницу"}
          >
            <Home className="p-0.5" style={{ strokeWidth: 1.5 }} />
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="transition-color h-6 w-6 hover:text-muted-foreground hover:cursor-pointer" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="tracking-wide">
              {menuLinks.map((ml, i) => (
                <DropdownMenuItem className="p-0 text-lg" key={i}>
                  <Link
                    className="transition-colors w-full h-full px-2 py-1.5 capitalize -mt-px mb-px"
                    href={`/${locale}/${ml.link}`}
                    aria-label={`${locale === "en" ? "go to" : "перейти на страницу"} ${ml.link}${locale === "en" ? " page" : ""}`}
                  >
                    {ml.text}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {crumbLinks.map((cl, i) => (
          <Fragment key={i}>
            <BreadcrumbItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className="transition-color hover:text-muted-foreground underline truncate max-w-16"
                    href={`./${cl.link}`}
                    aria-label={`${locale === "en" ? "go to" : "перейти на страницу"} ${cl.text} ${locale === "en" ? "page" : ""}`}
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
          </Fragment>
        ))}
        <BreadcrumbItem>
          <Tooltip>
            <TooltipTrigger asChild>
              <BreadcrumbPage className="capitalize truncate max-w-16 text-muted-foreground">
                {pageLink}
              </BreadcrumbPage>
            </TooltipTrigger>
            {pageLink.length > 6 && (
              <TooltipContent className="bg-background/60 backdrop-blur-md text-base">
                <p>{pageLink}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
