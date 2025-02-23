import { Locale } from "@/i18n-config";
import { Authors, SocialLinks } from "./children";

export function Footer({ lang }: { lang: Locale }) {
  return (
    <footer
      className="relative shadow-up dark:shadow-night-up z-10 pt-5 bg-background mt-auto w-screen pr-[calc(100vw-100%)]"
      id="footer"
    >
      <div className="max-w-7xl mx-auto">
        <SocialLinks lang={lang} />
        <Authors />
      </div>
    </footer>
  );
}
