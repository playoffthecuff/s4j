import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full min-h-[calc(100vh-79px)] transition-opacity duration-250">
      {children}
    </main>
  );
}
