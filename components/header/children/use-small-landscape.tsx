import { useEffect, useState } from "react";

export default function useSmallLandscape(height: number) {
  const [isSmallLandscaped, setSmallLandscaped] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setSmallLandscaped(
        window.innerHeight <= height && window.innerWidth > height
      );
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [height]);
  return isSmallLandscaped;
}
