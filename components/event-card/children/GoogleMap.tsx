"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function GoogleMap({
  className,
  lang,
  lat,
  lng,
  variant,
}: {
  className?: string;
  lang: "en" | "ru";
  lat: number;
  lng: number;
  variant: "thin" | "wide";
}) {
  const { theme } = useTheme();
  return (
    <figure
      className={cn(
        className,
        variant === "thin" && "sm:w-80",
        theme === "dark" &&
          "hue-rotate-180 contrast-75 invert-100 grayscale-[25%]"
      )}
    >
      <iframe
        width="100%"
        height="100%"
        title="map"
        src={`https://maps.google.com/maps?q=${lat},${lng}&hl=${lang}&z=14&amp&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </figure>
  );
}
