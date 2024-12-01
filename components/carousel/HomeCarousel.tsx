"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Img } from "@/app/[lang]/gallery/page";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { useRef } from "react";

export default function HomeCarousel({
  images,
  delay,
}: {
  images: Img[];
  delay: number;
}) {
  const pluginAutoplay = useRef(Autoplay({ delay }));
  const pluginFade = useRef(Fade());

  return (
    <Carousel
      opts={{ loop: true, containScroll: false, duration: 40 }}
      plugins={[pluginAutoplay.current, pluginFade.current]}
      className="w-full group mx-auto"
    >
      <CarouselContent>
        {images.map((i) => (
          <CarouselItem key={i.lqip}>
            <Card className="border-none rounded-none">
              <CardContent className="flex items-center justify-center p-0 w-full">
                <Image
                  priority
                  fill
                  src={urlFor(i.image).url()}
                  alt={i.description}
                  quality={100}
                  className="object-cover opacity-50"
                ></Image>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
