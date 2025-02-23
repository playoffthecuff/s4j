import { RefObject, useEffect, useRef } from "react";

export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  cb: (e: MouseEvent) => void
) {
  const cbRef = useRef(cb);
  cbRef.current = cb;
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        cbRef.current?.(e);
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref]);
}
