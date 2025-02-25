import { fetchGreetings } from "@/app/[lang]/fetchGreeting";
import { SmokyText } from "@/components/smoky-text";
import { Locale } from "@/i18n-config";

export default async function Page(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;
  const greetings = await fetchGreetings(params.lang);
  return (
    <div className="relative w-full h-dvh overflow-hidden">
      <SmokyText
        className="absolute z-10 bottom-1/2 right-1/2 translate-x-1/2 text-4xl translate-y-1/2 w-fit"
        text={greetings}
      />
    </div>
  );
}
