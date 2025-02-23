import { useEffect, useState } from "react";

export default function useMediaQueries(queries: string[]) {
  const [matches, setMatches] = useState<boolean[]>([]);
  useEffect(() => {
    const mediaQueryLists = queries.map((mql) => window.matchMedia(mql));
    setMatches(mediaQueryLists.map((mql) => mql.matches));
    const handleChange = () => {
      setMatches(mediaQueryLists.map((mql) => mql.matches));
    };
    mediaQueryLists.forEach((mql) =>
      mql.addEventListener("change", handleChange)
    );
    return () =>
      mediaQueryLists.forEach((mql) =>
        mql.removeEventListener("change", handleChange)
      );
  }, [queries]);
  return matches;
}
