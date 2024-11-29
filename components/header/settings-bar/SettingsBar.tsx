import LangToggler from "../lang-toggler/LangToggler";
import ModeToggler from "../mode-toggler/ModeToggler";

export default function SettingsBar({ className }: { className?: string }) {
  return (
    <div className={`flex gap-5 items-center ${className}`}>
      <ModeToggler />
      <LangToggler />
    </div>
  );
}
