import { cn } from "@/lib/utils";
import { ThemeToggler } from "./ThemeToggler";
import { LangToggler } from "./LangToggler";

export function SettingsBar({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-5 items-center", className)}>
      <ThemeToggler />
      <LangToggler />
    </div>
  );
}
