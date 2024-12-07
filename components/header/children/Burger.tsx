"use client";

import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Navbar } from "./Navbar";

export function Burger({
  className,
  isClose = true,
}: {
  className?: string;
  isClose?: boolean;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (isClose) setOpen(false);
  }, [isClose]);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <div className={className}>
      <Button
        className="w-10 z-20 px-0 relative right-[60px] ease-in-out"
        variant="outline"
        onClick={handleClick}
      >
        <div className="relative w-5 h-5">
          <div
            className={`${open ? "scale-x-0 delay-0" : "delay-300"} absolute top-[9px] ease-out right-0 w-5 h-0.5 transform-gpu bg-foreground rounded transition-transform duration-300 before:absolute before:w-5 before:top-[-6px] before:right-0 before:h-0.5 before:bg-foreground before:rounded before:content-[''] before:transition-transform before:duration-300 after:absolute after:w-5 after:h-0.5 after:bg-foreground after:rounded after:content-[''] after:top-[6px] after:right-0 after:transition-transform after:duration-300`}
          />
          <div
            className={`${open ? "scale-x-100 delay-300" : "scale-x-0 delay-0"} absolute ease-out top-[0px] right-0 w-5 transform-gpu h-0 bg-foreground rounded transition-transform duration-300 origin-[center] before:absolute before:w-5 before:h-0.5 before:bg-foreground before:rounded before:content-[''] before:transition-transform before:duration-300 before:top-[9px] before:right-0 before:rotate-45 before:scale-x-[1.2] before:translate-x-[0px] before:translate-y-[0px] after:absolute after:w-5 after:h-0.5 after:bg-foreground after:rounded after:content-[''] after:transition-transform after:duration-300 after:top-[9px] after:right-0 after:-rotate-45 after:scale-x-[1.2] after:translate-x-[0px] after:translate-y-[0px]`}
          />
        </div>
      </Button>
      <aside
        className={`relative rounded-bl-xl origin-right shadow transition-transform transform-gpu bg-background duration-600 p-4 z-20 flex top-2 right-[122px] flex-col items-center justify-center ${open ? "scale-x-100" : "scale-x-0"}`}
      >
        <div
          className="h-4 w-4 absolute left-0 top-0 -translate-x-3 -translate-y-1"
          style={{
            background:
              "radial-gradient(circle at 0% 100%, transparent 12px, hsl(var(--background)) 0)",
          }}
        />
        <Navbar orientation="vertical" onChange={handleClick} tabbed={open} />
      </aside>
    </div>
  );
}
