"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import Navbar from "../navbar/Navbar";

export default function Burger(props: { className?: string, menu: any }) {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <div className={props.className}>
      <aside
        className={`absolute rounded-bl-lg origin-right shadow transition-transform bg-background duration-400 pt-8 pb-6 z-10 pr-4 pl-7 transform-gpu flex top-14 right-0 flex-col items-center justify-center ${open ? "scale-x-100" : "scale-x-0"}`}
      >
        <Navbar orientation="vertical" onChange={handleClick} menu={props.menu} />
      </aside>
      <Button
        className="w-10 fixed top-2 right-4 cursor-pointer z-20 px-0"
        variant="outline"
        onClick={handleClick}
      >
        <div className="relative w-5 h-5 transition-transform duration-400 transform-gpu">
          <div
            className={`${open ? "scale-x-0 delay-0" : "delay-400"} absolute top-[9px] right-0 w-5 h-0.5 bg-foreground rounded transition-transform  transform-gpu duration-400 before:absolute before:w-5 before:top-[-6px] before:right-0 before:h-0.5 before:bg-foreground before:rounded before:content-[''] before:transition-transform before:duration-400 after:absolute after:w-5 after:h-0.5 after:bg-foreground after:rounded after:content-[''] after:top-[6px] after:right-0 after:transition-transform after:duration-400`}
          />
          <div
            className={`${open ? "scale-x-100 delay-400" : "scale-x-0 delay-0"} absolute top-[0px] right-0 w-5 h-0 bg-foreground rounded transition-transform duration-400 transform-gpu origin-[center] before:absolute before:w-5 before:h-0.5 before:bg-foreground before:rounded before:content-[''] before:transition-transform before:duration-400 before:top-[9px] before:right-0 before:rotate-45 before:scale-x-[1.2] before:translate-x-[0px] before:translate-y-[0px] after:absolute after:w-5 after:h-0.5 after:bg-foreground after:rounded after:content-[''] after:transition-transform after:duration-400 after:top-[9px] after:right-0 after:-rotate-45 after:scale-x-[1.2] after:translate-x-[0px] after:translate-y-[0px]`}
          />
        </div>
      </Button>
    </div>
  );
}
