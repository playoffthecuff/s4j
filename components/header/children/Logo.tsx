import { LogoIcon } from "@/components/icons";
import { Locale } from "@/i18n-config";
import Link from "next/link";

export function Logo({ svg, locale }: { svg: string, locale: Locale | null }) {
  return (
    <Link href={`/${locale ?? ""}`} prefetch aria-label="home link">
      <LogoIcon width={40} height={40}/>
      {/* <Image src="/favicon/logo.svg" className="block w-10 h-10 text-foreground" width={120} height={120} alt="logo" quality={100} blurDataURL="eGR{#?%M~qxu?b%Mayj[ayRj_3RjD%j[M{ofj[ofj[of-;WBWBWBIU"/> */}
      {/* <div className="w-10 h-10" dangerouslySetInnerHTML={{ __html: svg }}></div> */}
    </Link>
  );
}
