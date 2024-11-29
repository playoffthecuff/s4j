"use client";

import useScrollDirection from "@/utils/useScrollDirection";
import Logo from "./logo/Logo";
import Navbar from "./navbar/Navbar";
import SettingsBar from "./settings-bar/SettingsBar";
import Burger from "./burger/Burger";

export default function Header({ svg }: { svg: string }) {
  const scrollDirection = useScrollDirection();

  return (
    <header
      id="header"
      className={`w-full shadow fixed z-20 max-[720px]:pr-16 bg-background top-0 transform-gpu duration-400 ${scrollDirection === "down" ? "-translate-y-full" : "-translate-y-0"}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between">
        <Logo svg={svg} />
        <Navbar
          className="max-[720px]:hidden pl-[98px]"
          orientation="horizontal"
        />
        <SettingsBar />
        <Burger
          className="min720:hidden fixed -right-[122px] z-0"
          isClose={scrollDirection === "down"}
        />
      </div>
    </header>
  );
}
