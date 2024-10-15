"use client";

import * as React from "react";
import { Moon, Sun, MonitorCog } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ModeToggler() {
  const { setTheme } = useTheme();
  function setLight() {
    setTheme("light");
  }
  function setDark() {
    setTheme("dark");
  }
  function setSystem() {
    setTheme("system");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 transition-transform transform-gpu dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-transform transform-gpu scale-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={setLight}>
          <div className="flex justify-between w-full">
            <p>Light</p>
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={setDark}>
          <div className="flex justify-between w-full">
            <p>Dark</p>
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={setSystem}>
        <div className="flex justify-between w-full">
            <p>System</p>
            <MonitorCog className="h-[1.2rem] w-[1.2rem]" />
          </div>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
