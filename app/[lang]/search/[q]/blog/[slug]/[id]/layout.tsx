import { ShadowViewPort } from "@/components/shadow-viewport";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full min-h-screen transition-opacity duration-250">
      <ShadowViewPort />
      {children}
    </main>
  );
}
