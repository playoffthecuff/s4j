'use client'
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname } from "next/navigation";

export default function Navbar(
  props: {
    orientation: "horizontal" | "vertical";
    className?: string;
    menu: any;
    onChange?: () => void;
  },
) {
  console.log(props.menu)
  const pathName = usePathname();

  function handleClick() {
    if (props.onChange) props.onChange();
  }

  return (
    <nav
      className={`relative flex items-center justify-between max-w-7xl mx-auto ${props.className}`}
    >
      <Tabs orientation={props.orientation} value={pathName.slice(1)}>
        <TabsList
          className={`${props.orientation === "vertical" && "flex-col"} h-fit select-none`}
          onClick={handleClick}
        >
          <TabsTrigger
            className={`${props.orientation === "vertical" && "w-full"}`}
            value="blog"
          >
            <Link href="/blog">{props.menu?.blog}</Link>
          </TabsTrigger>
          <TabsTrigger
            className={`${props.orientation === "vertical" && "w-full"}`}
            value="gallery"
          >
            <Link href="/gallery">{props.menu?.gallery}</Link>
          </TabsTrigger>
          <TabsTrigger
            className={`${props.orientation === "vertical" && "w-full"}`}
            value="events"
          >
            <Link href="/events">{props.menu?.events}</Link>
          </TabsTrigger>
          <TabsTrigger
            className={`${props.orientation === "vertical" && "w-full"}`}
            value="about"
          >
            <Link href="/about">{props.menu?.about}</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </nav>
  );
}
