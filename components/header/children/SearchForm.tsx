"use client";
import { Button } from "@/components/ui";
import useLocale from "@/lib/hooks/use-locale";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/utils/i18context";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  KeyboardEventHandler,
  useRef,
  useState,
} from "react";
import "./SearchInput.css";

export function SearchForm({
  className,
  variant = "medium",
  onEnter,
}: {
  className?: string;
  variant?: "thin" | "medium" | "wide";
  onEnter?: () => void;
}) {
  const t = useI18n();
  const router = useRouter();
  const [v, setV] = useState("");
  const [f, setF] = useState(false);
  const [bf, setBf] = useState(false);
  const [m, setM] = useState("");
  const [rn, setRn] = useState("");
  const locale = useLocale();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rn = encodeURIComponent(e.target.value.toLowerCase());
    setRn(rn);
    setV(e.target.value);
  };
  const ref = useRef<HTMLInputElement>(null);
  const handleFocus = () => {
    setV(m);
    setF(true);
    setTimeout(() => {
      if (ref.current) {
        ref.current.setSelectionRange(m.length, m.length);
      }
    }, 0);
  };
  const handleBlur = () => {
    setM(v);
    setV("");
    setF(false);
  };
  const handleButtonFocus = () => {
    setBf(true);
    setV(m);
  };
  const handleButtonBlur = () => {
    setBf(false);
    setV("");
  };
  const goSearch = () => {
    router.push(`/${locale}/search/${rn}`);
    setM("");
    setV("");
    if (onEnter) onEnter();
  };
  const handleKeydown: KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === "Enter") goSearch();
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    goSearch();
  };

  return (
    <form
      className={cn(
        "flex border-muted-foreground/60 border-2 rounded-sm",
        "focus-within:border-muted-foreground focus-within:bg-background",
        className
      )}
      onSubmit={handleSubmit}
    >
      <input
        ref={ref}
        value={v}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={t.search}
        id="searchInput"
        type="search"
        className={cn(
          "h-8 py-2 pl-1 text-lg order-1 leading-loose",
          "transition-all duration-400 delay-75",
          "outline-0 bg-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "font-medium placeholder:text-muted-foreground",
          variant === "thin" && "w-24 focus:w-48",
          variant === "medium" && "w-[108px] focus:w-52",
          variant === "wide" && "w-40 focus:w-[280px]",
          bf && variant === "thin" && "w-48",
          bf && variant === "medium" && "w-52",
          bf && variant === "wide" && "w-[280px]",
          bf && "bf"
        )}
      />
      <Button
        asChild
        className={cn(
          "w-8 h-8",
          "text-muted-foreground hover:text-foreground text-base",
          "focus-visible:outline-2 focus-visible:outline-ring/60",
          "data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed",
          "transition-colors [&_svg]:size-4 [&_svg]:stroke-2.2",
          f && "data-[disabled=true]:opacity-50"
        )}
        onBlur={handleButtonBlur}
        onFocus={handleButtonFocus}
        variant="link"
        size="icon"
        aria-label="Search"
        data-disabled={!v}
        onClick={handleSubmit}
        onKeyDown={handleKeydown}
        tabIndex={0}
      >
        <div>
          <Search strokeWidth={2} aria-hidden="true" style={{width: 18, height: 18}}/>
        </div>
      </Button>
    </form>
  );
}
