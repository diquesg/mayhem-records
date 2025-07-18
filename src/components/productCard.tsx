"use client"
import { ProductType } from "@/lib/types/Product"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface ProductCardProps extends Pick<ProductType, 'title' | 'artist' | 'price' | 'img' | 'edition'> {
    _id: string; 
}


export default function ProductCard(props: ProductCardProps){

    const [showTooltip, setShowTooltip] = useState(false);

    return(
        <article className="border min-h-79 relative border-neutral-700 p-2 rounded-2xl sm:rounded-lg h-full flex flex-col shadow-md shadow-black w-full">
            {props.edition === "Deluxe" && <div onClick={() => setShowTooltip(prev => !prev)} className="absolute -top-2 right-7 z-5 shadow-lg rounded-xl shadow-black group">
                {showTooltip && <span className="absolute lg:hidden -top-10 -right-10 bg-black text-white p-1 px-2 text-nowrap rounded-md border border-amber-400">Edição Deluxe</span>}
                <span className="absolute -top-10 -right-10 hidden lg:block bg-black text-white p-1 px-2 text-nowrap rounded-md border border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Edição Deluxe
                </span>
                <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_319_1215)">
                    <rect width="32" height="40" rx="8" fill="#D9B937"/>
                    <path d="M12 26L16 22.95L20 26L18.5 21.05L22.5 18.2H17.6L16 13L14.4 18.2H9.5L13.5 21.05L12 26ZM16 30C14.6167 30 13.3167 29.7375 12.1 29.2125C10.8833 28.6875 9.825 27.975 8.925 27.075C8.025 26.175 7.3125 25.1167 6.7875 23.9C6.2625 22.6833 6 21.3833 6 20C6 18.6167 6.2625 17.3167 6.7875 16.1C7.3125 14.8833 8.025 13.825 8.925 12.925C9.825 12.025 10.8833 11.3125 12.1 10.7875C13.3167 10.2625 14.6167 10 16 10C17.3833 10 18.6833 10.2625 19.9 10.7875C21.1167 11.3125 22.175 12.025 23.075 12.925C23.975 13.825 24.6875 14.8833 25.2125 16.1C25.7375 17.3167 26 18.6167 26 20C26 21.3833 25.7375 22.6833 25.2125 23.9C24.6875 25.1167 23.975 26.175 23.075 27.075C22.175 27.975 21.1167 28.6875 19.9 29.2125C18.6833 29.7375 17.3833 30 16 30Z" fill="black"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_319_1215">
                    <rect width="32" height="40" rx="8" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
            </div>}
            {props.edition === "Exclusive" && <div onClick={() => setShowTooltip(prev => !prev)} className="absolute -top-2 right-7 z-5 shadow-lg rounded-xl shadow-black group">
                {showTooltip && <span className="absolute lg:hidden -top-10 -right-10 bg-black text-white p-1 px-2 text-nowrap rounded-md border border-purple-500">Edição Exclusive</span>}
                <span className="absolute -top-10 -right-10 hidden lg:block bg-black text-white p-1 px-2 text-nowrap rounded-md border border-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Edição Exclusive
                </span>
                <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_326_1463)">
                    <rect width="32" height="40" rx="8" fill="#9200E6"/>
                    <path d="M9.825 30L11.45 22.975L6 18.25L13.2 17.625L16 11L18.8 17.625L26 18.25L20.55 22.975L22.175 30L16 26.275L9.825 30Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_326_1463">
                    <rect width="32" height="40" rx="8" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
            </div>}
            <div>
                <div className="flex shrink">
                    <Image src={props.img} alt="album cover" className="w-full rounded-xl sm:rounded-md mb-2 border border-neutral-700 aspect-square" width={300} height={300}/>
                </div>
                <div className="flex flex-col grow">
                    <Link href={`/catalogo/${props._id}`} className="active:underline hover:underline"><h1 className="text-md leading-5 font-light line-clamp-2">{props.title}</h1></Link>
                    <p className="font-extralight text-sm pt-1">{props.artist}</p>
                </div>
            </div>
            <div className="flex justify-between items-center mt-auto mb-1">
                <p className="font-medium text-xl text-neutral-200">R$ {props.price.toFixed(2)}</p>
                <Link className="mt-1" href={`/catalogo/${props._id}`}><button className="bg-blue-600 px-5 rounded-xl h-8 cursor-pointer hover:bg-blue-700 hover:shadow-md shadow-black active:bg-blue-800 active:scale-90"><Image width={7} height={10} src="/next-icon.svg" alt="go to button"/></button></Link>
            </div>
        </article>
    )
}