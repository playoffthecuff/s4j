import MainInfo from "@/components/author/MainInfo";
import Mentions from "@/components/author/Mentions";
import Timeline from "@/components/author/timeline/Timeline";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n-config";
import { fetchAuthor } from "@/utils/apiService";
import React from "react";

export default async function Page({ params }: { params: { lang: Locale } }) {
  const d = await fetchAuthor(params.lang);

  return (
    <article className="min-h-[calc(100vh-126px)] px-6 min-[576px]:px-4 max-w-[720px] mx-auto my-16">
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
    </article>
  );
}
