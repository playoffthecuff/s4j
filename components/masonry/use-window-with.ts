import { useEffect, useState } from "react";

export default function useWindowWidth(initValue = 1280) {
  const [width, setWidth] = useState(initValue);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
