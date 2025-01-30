import { useEffect, useState } from "react";

export function useFullScreen() {
  const [fs, setFs] = useState(false);
  useEffect(() => {
    const handleFsChange = () => {
      if (document.fullscreenElement) {
        setFs(true);
      } else {
        setFs(false);
      }
    };
    handleFsChange();
    window.addEventListener("fullscreenchange", handleFsChange);
    return () => {
      window.removeEventListener("fullscreenchange", handleFsChange);
    };
  }, []);
  return fs;
}
