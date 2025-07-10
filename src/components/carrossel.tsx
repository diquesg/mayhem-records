"use client"

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Link from "next/link";

export default function Carrossel(){
    return(
        <Carousel className="overflow-hidden border-b border-neutral-700 bg-neutral-950" opts={{loop: true, slidesToScroll: "auto", align: "center"}} plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}>
        <CarouselContent>
          <CarouselItem><Link href={"/destaques"}><img className="aspect-<16/9>" src="/home-banner.png" alt="banner"/></Link></CarouselItem>
          <CarouselItem><img className="aspect-<16/9>" src="/home-banner-2.png" alt="banner"/></CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="-ml-50"/>
      </Carousel>
      
    )
}