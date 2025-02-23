"use client";

import { useI18n } from "@/lib/utils/i18context";

export function Authors() {
  const t = useI18n();
  return (
    <div className="flex justify-between mx-auto pt-4 px-4 text-[10px] text-tertiary tracking-wide">
      <p className="font-semibold h-4 hover:text-muted-foreground">
        ©{" " + t.juliaRibetki + ", "}
        <span>2015</span>
      </p>
      <p className="h-4 hover:text-muted-foreground">
        {t.designedBy + " "}
        <a
          target="_blank"
          href="https://github.com/playoffthecuff"
          className="font-semibold hover:underline"
          rel="noopener"
        >
          playoffthecuff
        </a>
      </p>
    </div>
  );
}
