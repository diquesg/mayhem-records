"use client"

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import _Autoplay from "embla-carousel-autoplay"
import Link from "next/link";
import Image from "next/image";

export default function Carrossel(){

  const autoplayPlugin = _Autoplay({ delay: 4000 });

    return(
        <Carousel className="overflow-hidden border-b border-neutral-700 bg-neutral-950" opts={{ loop: true, slidesToScroll: "auto", align: "center" }} plugins={[autoplayPlugin]}>
  <CarouselContent>
    
      <CarouselItem className="flex justify-center items-center">
          <div className="relative w-full max-h-[371px] aspect-[3/1]">
            <Link href="/catalogo">
              <Image src="/banners/home-banner-1.png" alt="banner" fill style={{ objectFit: 'cover', objectPosition: 'center' }}priority className="h-35 lg:h-fit"/>
            </Link>
          </div>
      </CarouselItem>
      <CarouselItem className="flex justify-center items-center">
          <div className="relative w-full max-h-[371px] aspect-[3/1]">
            <Link href="/catalogo">
              <Image src="/banners/home-banner-2.png" alt="banner" fill style={{ objectFit: 'cover', objectPosition: 'center' }}priority className="h-35 lg:h-fit"/>
            </Link>
          </div>
      </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext className="-ml-50" />
</Carousel>

      
    )
}