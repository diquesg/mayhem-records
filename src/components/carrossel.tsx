"use client"

import Image from "next/image";
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
        <Carousel className="overflow-hidden" opts={{loop: true, slidesToScroll: "auto", align: "center"}} plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}>
        <CarouselContent>
          <CarouselItem><Link href={"/destaques"}><Image src="/home-banner.png" width={411} height={227} alt="banner"/></Link></CarouselItem>
          <CarouselItem><Image src="/home-banner-2.png" width={429} height={234} alt="banner"/></CarouselItem>
          <CarouselItem><Image className="h-[227]" src="/home-banner-3.png" width={411} height={227} alt="banner"/></CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="-ml-50"/>
      </Carousel>
      
    )
}