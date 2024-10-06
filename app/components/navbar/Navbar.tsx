import Link from "next/link";
import React from "react";
import { ModeToggler } from "../mode-toggler/ModeToggler";
import { LangToggler } from "../lang-toggler/LangToggler";

export default function Navbar() {
  return (
    <nav className="w-full relative flex items-center justify-between max-w-7xl mx-auto px-2 py-2">
      <Link href="/">JR Site</Link>
      <ModeToggler />
      <LangToggler />
    </nav>
  );
}
