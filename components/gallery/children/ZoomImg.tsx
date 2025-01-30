import {
  useState,
  useEffect,
  MouseEventHandler,
  useRef,
  LegacyRef,
} from "react";
import Image from "next/image";
import throttle from "@/lib/utils/throttle";
import { getSizes } from "./helpers";

export default function ZoomImg({
  src,
  alt = "Image",
  originalWidth,
  originalHeight,
  className,
  initX,
  initY,
}: {
  src: string;
  alt?: string;
  originalWidth: number;
  originalHeight: number;
  className?: string;
  initX: number;
  initY: number;
}) {
  const zoomContainerRef = useRef<HTMLDivElement>(null);
  const zoomImageRef = useRef<HTMLImageElement>(null);
  const [bounds, setBounds] = useState({ minX: 0, maxX: 0, minY: 0, maxY: 0 });
  const [kx, setKx] = useState(1);
  const [ky, setKy] = useState(1);
  const lastPosition = useRef({ x: 0, y: 0 });
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const updateSize = () => {
      const { width, height } = getSizes(
        windowWidth,
        windowHeight,
        originalWidth,
        originalHeight,
      );
      const container = zoomContainerRef.current;
      let dx = 0;
      let dy = 0;
      if (container) {
        setKx(((container.offsetWidth - windowWidth) * 1.25) / windowWidth);
        setKy(((container.offsetHeight - windowHeight) * 1.25) / windowHeight);
        dx = (windowWidth - container.offsetWidth) / 2;
        dy = (windowHeight - container.offsetHeight) / 2;
        container.style.width = `${width}px`;
        container.style.height = `${height}px`;
        container.style.left = `${dx}px`;
        container.style.top = `${dy}px`;
      }

      setBounds({
        minX: Math.min(0 - dx, windowWidth - width - dx),
        maxX: -dx,
        minY: Math.min(0 - dy, windowHeight - height - dy),
        maxY: -dy,
      });
      lastMousePosition.current.x = -dx;
      lastMousePosition.current.y = -dy;
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [originalWidth, originalHeight]);

  const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value));

  const setTranslate = (x: number, y: number) => {
    if (zoomImageRef.current) {
      zoomImageRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  useEffect(() => {
    console.log(initX, initY);
    setTranslate(initX, initY);
  }, [initX, initY]);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const deltaX = e.clientX - lastMousePosition.current.x;
    const deltaY = e.clientY - lastMousePosition.current.y;
    lastMousePosition.current = { x: e.clientX, y: e.clientY };
    lastPosition.current = {
      x: clamp(lastPosition.current.x - deltaX * kx, bounds.minX, bounds.maxX),
      y: clamp(lastPosition.current.y - deltaY * ky, bounds.minY, bounds.maxY),
    };
    if (animationFrameId.current === null) {
      animationFrameId.current = requestAnimationFrame(() => {
        setTranslate(lastPosition.current.x, lastPosition.current.y);
        animationFrameId.current = null;
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - lastMousePosition.current.x;
    const deltaY = touch.clientY - lastMousePosition.current.y;
    lastMousePosition.current = { x: touch.clientX, y: touch.clientY };

    lastPosition.current = {
      x: clamp(lastPosition.current.x - deltaX, bounds.minX, bounds.maxX),
      y: clamp(lastPosition.current.y - deltaY, bounds.minY, bounds.maxY),
    };
    setTranslate(lastPosition.current.x, lastPosition.current.y);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      lastMousePosition.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  return (
    <div
      ref={zoomContainerRef}
      style={{
        position: "fixed",
        zIndex: 50,
        overflow: "hidden",
        cursor: "move",
      }}
      onMouseMove={throttle(handleMouseMove, 5)}
      onTouchStart={handleTouchStart}
      onTouchMove={throttle(handleTouchMove, 1)}
      className={className}
    >
      <Image
        src={src}
        alt={alt}
        style={{
          position: "absolute",
          minHeight: "100%",
          minWidth: "100%",
          transform: "translate(0px, 0px)",
        }}
        width={originalWidth}
        height={originalHeight}
        className="transform-gpu bg-background"
        ref={zoomImageRef}
        priority
      />
    </div>
  );
}
