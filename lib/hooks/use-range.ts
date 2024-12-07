import { useState, useEffect } from "react";
import { Img } from "../types/sanity-data";
import { usePathname } from "next/navigation";

export default function useRange(images: Img[]) {
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const i = +pathArr[pathArr.length - 1];
  const [start, setStart] = useState(i === 0);
  const [end, setEnd] = useState(i === images.length - 1);
  useEffect(() => {
    setStart(i === 0);
    setEnd(i === images.length - 1);
  }, [i, images.length]);
  return { start, end, i, pathname };
}
