import { cn } from "@/lib/utils";
import { LangToggler } from "./LangToggler";
import { ThemeToggler } from "./ThemeToggler";

export function SettingsBar({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-5 items-center", className)}>
      <ThemeToggler />
      <LangToggler />
    </div>
  );
}
