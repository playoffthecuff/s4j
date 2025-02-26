"use client";
import { useI18n } from "@/lib/utils/i18context";

export default function NotFound() {
  const t = useI18n();
  return (
    <div className="flex items-center justify-center min-h-svh tracking-wide">
      <h1 className="next-error-h1 inline-block mr-5 pr-5 text-3xl font-medium border-e-2">
        404
      </h1>
      <div className="inline-block text-lg">
        <h2 className="m0">{t.notFoundPage}</h2>
      </div>
    </div>
  );
}
