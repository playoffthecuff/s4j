import Authors from "./authors/Authors";
import SocialLinks from "./social-links/SocialLinks";

export default function Footer() {
  return (
    <footer
      className="relative w-full shadow-up z-10 pt-5 bg-background mt-auto"
      id="footer"
    >
      <div className="max-w-7xl mx-auto">
        <SocialLinks />
        <Authors/>
      </div>
    </footer>
  );
}
