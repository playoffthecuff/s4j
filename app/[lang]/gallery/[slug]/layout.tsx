import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full min-h-dvh transition-opacity duration-250">
      {children}
    </main>
  );
}
