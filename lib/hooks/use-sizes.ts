import { Img } from "@/lib/types/sanity-data";
import { useEffect, useState } from "react";

export default function useSizes(img: Img) {
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  useEffect(() => {
    const footer = document.getElementById("footer");
    if (footer) footer.style.display = "none";
    if (window) {
      setW(
        Math.min(
          window?.innerWidth,
          (img.width * ((window?.innerHeight ?? 0) - 1)) / img.height,
        ),
      );
      setH(
        Math.min(
          window?.innerHeight - 1,
          (window.innerWidth * window?.innerHeight) /
            ((img.width * (window?.innerHeight ?? 0)) / img.height),
        ),
      );
    }
    return () => {
      if (footer) footer.style.display = "block";
    };
  }, [img.width, img.height]);
  return [w, h];
}
