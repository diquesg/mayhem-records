"use client"

import Link from "next/link";
import { Disc3, Home, SearchIcon, ShoppingCartIcon, User2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";

export default function Navbar(){

    const pathname = usePathname();
    const {id} = useParams();

    const noTopBorder = pathname === `/catalogo/${id}` || pathname === "/carrinho"

    return(
    <nav className={`fixed z-10 bottom-0 bg-[#131313] w-full h-23 ${noTopBorder ? "border-t-none" : "border-t"} border-neutral-700`}>
        <ul className="bg-[#141414] shadow-lg shadow-neutral-950 grid grid-cols-5 items-center m-2 border min-h-19 rounded-xl text-[12px]">
            <li className="m-auto">
                <button className="justify-items-center">
                    <Link href="/" className="flex flex-col items-center gap-1 active:scale-110">
                        <Home className={pathname == "/" ? "bg-white text-black w-12 rounded-full" : "text-neutral-400"}/>
                        <p className={pathname == "/" ? "text-white" : "text-neutral-400"}>Início</p>
                    </Link>
                </button>
            </li>
            <li className="m-auto">
                <button className="justify-items-center">
                    <Link href="/busca" className="flex flex-col items-center gap-1 active:scale-110">
                        <SearchIcon className={pathname == "/busca" ? "bg-white text-black w-12 rounded-full" : "text-neutral-400"}/>
                        <p className={pathname == "/busca" ? "text-white" : "text-neutral-400"}>Busca</p>
                    </Link>
                </button>
            </li>
            <li className="m-auto">
                <button className="justify-items-center">
                    <Link href="/catalogo" className="flex flex-col items-center gap-1 active:scale-110">
                        <Disc3 className={pathname == "/catalogo" ? "bg-white text-black w-12 rounded-full" : "text-neutral-400 active:animate-spin"}/>
                        <p className={pathname == "/catalogo" ? "text-white" : "text-neutral-400"}>Catálogo</p>
                    </Link>
                </button>
            </li>
            <li className="m-auto">
                <button className="justify-items-center">
                    <Link href="/carrinho" className="flex flex-col items-center gap-1  active:scale-110">
                        <ShoppingCartIcon className={pathname == "/carrinho" ? "bg-white text-black w-12 rounded-full" : "text-neutral-400"}/>
                        <p className={pathname == "/carrinho" ? "text-white" : "text-neutral-400"}>Carrinho</p>
                    </Link>
                </button>
            </li>
            <li className="m-auto">
                <button className="justify-items-center">
                    <Link href="/conta" className="flex flex-col items-center gap-1  active:scale-110">
                        <User2 className={pathname == "/conta" ? "bg-white text-black w-12 rounded-full" : "text-neutral-400"}/>
                        <p className={pathname == "/conta" ? "text-white" : "text-neutral-400"}>Conta</p>
                    </Link>
                </button>
            </li>
        </ul>
    </nav>
    )
}
