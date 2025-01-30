"use client";

import { useI18n } from "@/lib/utils/i18context";

export function Authors() {
  const t = useI18n();
  return (
    <div className="flex justify-between mx-auto pt-4 px-4 text-[10px] text-tertiary">
      <p className="font-semibold h-4">
        ©{" " + t.juliaRibetki + ", "}
        <span>2024</span>
      </p>
      <p className="h-4">
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
