"use client"
import { useI18n } from "@/lib/utils/i18context";

export default function NotFound() {
  const t = useI18n();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="next-error-h1 inline-block mr-5 pr-5 text-2xl font-medium border-e-2">
        404
      </h1>
      <div className="inline-block">
        <h2
          className="m0"
        >
          {t.notFoundPage}
        </h2>
      </div>
    </div>
  );
}
