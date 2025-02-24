import { Footer } from "@/components/footer";
import { ShadowViewPort } from "@/components/shadow-viewport";
import { Locale } from "@/i18n-config";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const lang = (await params).lang;
  return (
    <>
      <main className="max-w-7xl mx-auto w-full min-h-screen">
        <ShadowViewPort />
        {children}
      </main>
      <Footer lang={lang} />
    </>
  );
}
