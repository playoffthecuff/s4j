"use client";

import { useI18n } from "@/utils/i18context";

export default function Authors() {
  const t = useI18n();
  return (
    <div className="flex justify-between mx-auto py-2 px-4 text-[10px] text-tertiary">
      <p className="font-semibold">
        ©{' ' + t.juliaRibetki + ", "}
        <span>2024</span>
      </p>
      <p>
        {t.designedBy + " "}
        <a
          target="_blank"
          href="https://github.com/playoffthecuff"
          className="font-semibold hover:underline"
        >
          playoffthecuff
        </a>
      </p>
    </div>
  );
}
