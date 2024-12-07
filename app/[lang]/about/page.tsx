import { MainInfo, Mentions } from "@/components/author";
import { Timeline } from "@/components/author/children";
import { Separator } from "@/components/ui";
import { Locale } from "@/i18n-config";
import { fetchAuthor } from "@/lib/utils/apiService";
import React from "react";

export default async function Page({ params }: { params: { lang: Locale } }) {
  const d = await fetchAuthor(params.lang);

  return (
    <div className="min-h-[calc(100vh-236px)] px-6 min-[576px]:px-4 max-w-3xl mx-auto mt-28 mb-14">
      {d.mainInfo && <MainInfo data={d.mainInfo} />}
      {d.timeline && (
        <>
          {d.mainInfo && <Separator className="my-12" />}
          <Timeline
            entries={d.timeline}
            lng={params.lang}
            className="max-w-[720px] mx-auto px-2"
          />
        </>
      )}
      {d.mentions && (
        <>
          {d.mainInfo && <Separator className="my-12" />}
          <Mentions data={d.mentions} />
        </>
      )}
    </div>
  );
}
