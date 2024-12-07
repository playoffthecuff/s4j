import { SocialLinks, Authors } from "./children";

export function Footer() {
  return (
    <footer
      className="relative w-full shadow-up dark:shadow-night-up z-10 pt-5 bg-background mt-auto"
      id="footer"
    >
      <div className="max-w-7xl mx-auto">
        <SocialLinks />
        <Authors />
      </div>
    </footer>
  );
}
