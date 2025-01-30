"use client";

import { TabsTrigger } from "@/components/ui";
import { useI18n } from "@/lib/utils/i18context";
import { MonitorCog, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSubbar({ onClick }: { onClick?: () => void }) {
  const t = useI18n();
  const { theme, setTheme } = useTheme();
  const [th, setTh] = useState("");
  useEffect(() => {
    if (theme) setTh(theme);
  }, [theme]);
  const setLight = () => {
    setTheme("light");
    if (onClick) onClick();
  };
  const setDark = () => {
    setTheme("dark");
    if (onClick) onClick();
  };
  const setSystem = () => {
    setTheme("system");
    if (onClick) onClick();
  };
  return (
    <div className="p-1 bg-background rounded-md">
      <TabsTrigger
        className="w-full flex justify-between text-base tracking-wide pl-2.5 pr-[9px] hover:bg-muted"
        value="light"
        onClick={setLight}
        disabled={th === "light"}
        tabIndex={0}
      >
        <p>{t.light}</p>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </TabsTrigger>
      <TabsTrigger
        className="w-full flex justify-between text-base tracking-wide pl-2.5 pr-[9px] hover:bg-muted"
        value="dark"
        onClick={setDark}
        disabled={th === "dark"}
        tabIndex={0}
      >
        <p>{t.dark}</p>
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </TabsTrigger>
      <TabsTrigger
        className="w-full flex justify-between text-base tracking-wide pl-2.5 pr-[9px] hover:bg-muted"
        value="system"
        onClick={setSystem}
        disabled={th === "system"}
        tabIndex={0}
      >
        <p>{t.system}</p>
        <MonitorCog className="h-[1.2rem] w-[1.2rem]" />
      </TabsTrigger>
    </div>
  );
}
