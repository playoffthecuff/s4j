import { fetchEvents } from "@/app/[lang]/(with-footer)/events/fetchEvents";
import { EventCard, EventsDivider } from "@/components/event-card";
import { Locale } from "@/i18n-config";
import { isRubicon } from "@/lib/utils/isRubicon";
import { toHTML } from "@portabletext/to-html";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const params = await props.params;
  const description =
    params.lang === "ru"
      ? "Юлия Рибетки. Блог. Статьи."
      : "Julia Ribetki. Blog. Articles.";
  const title =
    params.lang === "ru" ? "События | Юлия Рибетки" : "Events | Julia Ribetki";
  return {
    alternates: {
      canonical: params.lang === "en" ? "/en/events" : "/ru/events",
      languages: {
        en: "/en/events",
        ru: "/ru/events",
        "x-default": "/events",
      },
    },
    title,
    description,
  };
}

export default async function Page(props: {
  params: Promise<{ lang: "en" | "ru" }>;
}) {
  const params = await props.params;
  const d = (await fetchEvents(params.lang)).map((e) => ({
    ...e,
    description: toHTML(e.content, {
      components: {
        marks: {
          marked: ({ children }) => `<mark>${children}</mark>`,
        },
      },
    }),
  }));

  return (
    <div className="mx-auto mt-[7.5rem] mb-16 px-4 w-full max-w-3xl">
      {d.map((e, i) => (
        <div key={i}>
          {isRubicon(e, d[i - 1]) && <EventsDivider />}
          <EventCard className="my-7" lang={params.lang} event={e} />
        </div>
      ))}
    </div>
  );
}
