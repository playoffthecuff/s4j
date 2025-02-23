import debounce from "@/lib/utils/debounce";
import { useEffect, useState } from "react";

export default function useScrolling() {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    let id: NodeJS.Timeout;
    const update = () => {
      setScrolling(true);
      if (id) clearTimeout(id);
      id = setTimeout(() => setScrolling(false), 10);
    };
    const d = debounce(update, 10);
    window.addEventListener("scroll", d);

    return () => {
      window.removeEventListener("scroll", d);
      if (id) clearTimeout(id);
    };
  }, [scrolling]);

  return scrolling;
}
