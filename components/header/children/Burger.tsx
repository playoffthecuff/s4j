"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../../ui/button";
import { Sidebar } from "./Sidebar";
import clsx from "clsx";

export function Burger({
  className,
  isClose = true,
}: {
  className?: string;
  isClose?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [folded, setFolded] = useState(true);
  useEffect(() => {
    if (isClose) {
      fold();
      setOpen(false);
    }
  }, [isClose]);

  function fold() {
    setTimeout(() => setFolded(true), 600);
  }

  function handleClick() {
    if (!open) {
      setFolded(false);
    } else {
      fold();
    }
    setOpen(!open);
  }

  function close() {
    if (open) {
      setOpen(false);
      setTimeout(() => setFolded(true), 600);
    }
  }
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={clsx("text-end relative", className)}
      ref={ref}
    >
      <Button
        className={clsx(
          "w-10 z-20 px-0 relative ease-in-out",
        )}
        variant="outline"
        onClick={handleClick}
        aria-label="burger menu"
      >
        <div className="relative w-5 h-5">
          <div
            className={clsx(
              open ? "scale-x-0 delay-0" : "delay-250",
              "absolute top-[9px] ease-out right-0 w-5 h-0.5 transform-gpu bg-foreground rounded transition-transform duration-250 before:absolute before:w-5 before:top-[-6px] before:right-0 before:h-0.5 before:bg-foreground before:rounded before:content-[''] before:transition-transform before:duration-250 after:absolute after:w-5 after:h-0.5 after:bg-foreground after:rounded after:content-[''] after:top-[6px] after:right-0 after:transition-transform after:duration-250",
            )}
          />
          <div
            className={clsx(
              open ? "scale-x-100 delay-250" : "scale-x-0 delay-0",
              "absolute ease-out top-[0px] right-0 w-5 transform-gpu h-0 bg-foreground rounded transition-transform duration-250 origin-[center] before:absolute before:w-5 before:h-0.5 before:bg-foreground before:rounded before:content-[''] before:transition-transform before:duration-250 before:top-[9px] before:right-0 before:rotate-45 before:scale-x-[1.2] before:translate-x-[0px] before:translate-y-[0px] after:absolute after:w-5 after:h-0.5 after:bg-foreground after:rounded after:content-[''] after:transition-transform after:duration-250 after:top-[9px] after:right-0 after:-rotate-45 after:scale-x-[1.2] after:translate-x-[0px] after:translate-y-[0px]",
            )}
          />
        </div>
      </Button>
      <Sidebar
        onTabClick={handleClick}
        tabbed={open}
        cb={close}
        cbRef={ref}
        className="absolute top-10 -right-4"
        values={["blog", "gallery", "events", "about"]}
      />
    </div>
  );
}
