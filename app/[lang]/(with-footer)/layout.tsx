import { Footer } from "@/components/footer";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="max-w-7xl mx-auto w-full min-h-[calc(100vh-79px)]">
        {children}
      </main>
      <Footer />
    </>
  );
}
