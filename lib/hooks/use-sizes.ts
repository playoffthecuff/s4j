import { Img } from "@/lib/types/sanity-data";
import { useEffect, useState } from "react";

export default function useSizes(img: Img) {
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  const [z, setZ] = useState(false);
  useEffect(() => {
    if (window) {
      const zoomedImg = document.getElementsByClassName(
        "iiz__zoom-img--visible",
      )[0];
      if (z && img.width < window.innerWidth && zoomedImg) {
        (zoomedImg as HTMLElement).style.left =
          `${(window.innerWidth - img.width) / 2}px`;
      }
      const setWidth = () => {
        setW(
          Math.min(
            window.innerWidth,
            (img.width * (window.innerHeight ?? 1 - 1)) / img.height,
          ),
        );
      };
      const setHeight = () => {
        setH(
          Math.min(
            window?.innerHeight - 1,
            (window.innerWidth * window?.innerHeight) /
              ((img.width * (window?.innerHeight ?? 0)) / img.height),
          ),
        );
      };
      const resize = () => {
        setWidth();
        setHeight();
      };
      resize();
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }
  }, [img.width, img.height, z]);
  return { w, h, z, setZ };
}
