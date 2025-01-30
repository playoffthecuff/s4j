"use client";

import { Moon, Sun, MonitorCog } from "lucide-react";
import { useTheme } from "next-themes";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { useI18n } from "@/lib/utils/i18context";

export function ThemeToggler() {
  const { setTheme } = useTheme();
  const t = useI18n();
  function setLight() {
    setTheme("light");
  }
  function setDark() {
    setTheme("dark");
  }
  function setSystem() {
    setTheme("system");
  }
  const p = (e: Event) => e.preventDefault();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 transition-transform transform-gpu dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-transform transform-gpu scale-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onCloseAutoFocus={p}>
        <DropdownMenuItem onClick={setLight}>
          <div className="flex justify-between w-full">
            <p>{t.light}</p>
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={setDark}>
          <div className="flex justify-between w-full">
            <p>{t.dark}</p>
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={setSystem}>
          <div className="flex justify-between w-full">
            <p>{t.system}</p>
            <MonitorCog className="h-[1.2rem] w-[1.2rem]" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
