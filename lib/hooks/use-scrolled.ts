import { useEffect, useState } from "react";

export default function useScrolled(height: number) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScrolled = () => {
      setScrolled(window.scrollY >= height);
    };

    window.addEventListener("scroll", updateScrolled);

    return () => window.removeEventListener("scroll", updateScrolled);
  }, [height]);

  return scrolled;
}
