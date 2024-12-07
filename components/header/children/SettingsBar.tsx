import { cn } from "@/lib/utils";
import { ModeToggler } from "./ModeToggler";
import { LangToggler } from "./LangToggler";

export function SettingsBar({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-5 items-center", className)}>
      <ModeToggler />
      <LangToggler />
    </div>
  );
}
