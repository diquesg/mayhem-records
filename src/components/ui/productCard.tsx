"use client"
import { ProductType } from "@/src/types/Product"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/src/hooks/cartContext";
import { Progress } from "@/components/ui/progress";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps extends Pick<ProductType, 'title' | 'artist' | 'price' | 'img' | 'edition'> {
    _id: string; 
}



export default function ProductCard(props: ProductCardProps){
    const cart = useCart();
    const addToCart = cart.addToCart
    const [cartAlert, setCartAlert] = useState(false);
    const [progressValue, setProgressValue] = useState(0)

    const handleAddToCart = () => {
        addToCart({
            _id: props._id,
            title: props.title,
            artist: props.artist,
            price: props.price,
            img: props.img,
            quantity: 1,
            edition: props.edition
        })
        setCartAlert(true);
        setProgressValue(0)
        
        const start = Date.now()
        const duration = 3000
        const interval = setInterval(() => {
            const elapsed = Date.now() - start
            const percentage = Math.min((elapsed / duration) * 100, 100)
            setProgressValue(percentage)

            if (elapsed >= duration) {
                clearInterval(interval)
                setCartAlert(false)
            }
        }, 50)
    }

    const [showTooltip, setShowTooltip] = useState(false);

    return(
        <>
        <article className="border min-h-79 hover:scale-105 transition-all relative border-neutral-700 p-2 rounded-2xl sm:rounded-lg h-full flex flex-col shadow-md shadow-black w-full lg:w-fit lg:shadow-xl">
            {props.edition === "Deluxe" && <div onClick={() => setShowTooltip(prev => !prev)} className="absolute -top-2 right-7 z-5 shadow-lg rounded-xl shadow-black group">
                {showTooltip && <span className="absolute lg:hidden -top-10 -right-10 bg-black text-white p-1 px-2 text-nowrap rounded-md border border-amber-400">Edição Deluxe</span>}
                <span className="absolute -top-10 -right-10 hidden lg:gap-1 lg:items-center bg-black text-white p-1 px-2 text-nowrap rounded-md border border-amber-400 opacity-0 group-hover:opacity-100 group-hover:flex transition-opacity duration-200">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="#D9B937"/>
                    </svg>
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
                {showTooltip && <span className="absolute lg:hidden -top-10 -right-10 bg-black text-white p-1 px-2 text-nowrap rounded-md border border-purple-500">Edição Exclusiva</span>}
                <span className="absolute -top-10 -right-10 hidden lg:items-center lg:gap-1 bg-black text-white p-1 px-2 text-nowrap rounded-md border border-purple-500 opacity-0 group-hover:opacity-100 group-hover:flex transition-opacity duration-200">
                    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z" fill="white"/>
                    </svg>
                    Edição Exclusiva
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
                    <Link href={`/catalogo/${props._id}`} className="active:opacity-50"><Image src={props.img} alt="album cover" className="w-full lg:w-60 transition-all rounded-xl sm:rounded-md mb-2 border border-neutral-700 aspect-square hover:opacity-60" width={300} height={300}/></Link>
                </div>
                <div className="flex flex-col grow max-w-45">
                    <Link href={`/catalogo/${props._id}`} className="active:underline hover:underline"><h1 className="text-md lg:text-lg text-neutral-300 leading-6 font-light line-clamp-2">{props.title}</h1></Link>
                    <p className="font-extralight text-sm pt-1">{props.artist}</p>
                </div>
            </div>
            <div className="flex justify-between items-center mt-auto mb-1">
                <p className="font-medium text-lg sm:text-xl text-neutral-200">R$ {props.price.toFixed(2)}</p>
                <button className="bg-[#101010] px-3 border-[#CECECE] flex items-center rounded-full border h-[36px] cursor-pointer hover:bg-neutral-700 transition-all hover:shadow-md shadow-black active:bg-neutral-800 active:scale-90" onClick={handleAddToCart}>
                    <svg width="30" height="37" viewBox="0 0 30 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.55433 22.7675V15.2249H6.46129V22.7675H4.55433ZM1.73651 19.9497V18.0427H9.27912V19.9497H1.73651Z" fill="#CECECE"/>
                            <g clipPath="url(#clip0_471_1618)">
                                <path d="M8.5625 9.16663H12.0625L14.4075 21.4408C14.4875 21.8628 14.7067 22.2419 15.0266 22.5117C15.3465 22.7815 15.7469 22.9249 16.1575 22.9166H24.6625C25.0731 22.9249 25.4735 22.7815 25.7934 22.5117C26.1133 22.2419 26.3325 21.8628 26.4125 21.4408L27.8125 13.75H12.9375M16.4375 27.5C16.4375 28.0062 16.0457 28.4166 15.5625 28.4166C15.0793 28.4166 14.6875 28.0062 14.6875 27.5C14.6875 26.9937 15.0793 26.5833 15.5625 26.5833C16.0457 26.5833 16.4375 26.9937 16.4375 27.5ZM26.0625 27.5C26.0625 28.0062 25.6707 28.4166 25.1875 28.4166C24.7043 28.4166 24.3125 28.0062 24.3125 27.5C24.3125 26.9937 24.7043 26.5833 25.1875 26.5833C25.6707 26.5833 26.0625 26.9937 26.0625 27.5Z" stroke="#CECECE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                        <defs>
                            <clipPath id="clip0_471_1618">
                                <rect width="21" height="22" fill="white" transform="translate(7.6875 8.25)"/>
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>
        </article>
            {cartAlert && (
                <div className='fixed bottom-22 md:bottom-20 lg:bottom-10 lg:right-10 right-0 h-fit rounded-md z-40 bg-neutral-950 border m-3 w-fit shadow-lg shadow-[#050505]'>
                    <Progress value={progressValue} className=" rounded-none rounded-t-md border-b"/>
                    <div className='gap-3 p-3 flex justify-center items-center'>
                        <ShoppingCart/>
                        <p className='md:text-lg'>Produto adicionado ao carrinho.</p>
                    </div>
                </div>
            )}
            </>
    )
}