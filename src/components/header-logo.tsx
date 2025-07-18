"use client"
import Image from 'next/image';
import { Libre_Caslon_Text } from "next/font/google";
import { usePathname } from 'next/navigation';

const libreFont = Libre_Caslon_Text({
  weight: "400"
})

export default function HeaderLogo(){

    const pathname = usePathname();

    const shouldHide = pathname === "/carrinho" || pathname === "/carrinho/pagamento" || pathname === "/conta/meus-pedidos" || pathname === "/conta/meus-favoritos" || pathname === "/configuracoes"
    const isSearchPage = pathname === "/busca"

    return(
        <header className={`${libreFont.className} bg-[#0D0D0D] flex items-center justify-center gap-2 h-16 border-b-1 border-b-neutral-700 fixed w-full top-0 z-10 ${isSearchPage? "hidden" : ""}`}>
          <Image src="logo.svg" alt="Logo Disco de Vinil" width={34} height={34} className={`${shouldHide ? "hidden" : ""}`}/>
          <h1 className={`text-white text-lg ${shouldHide ? "hidden" : ""}`}>MAYHEM RECORDS</h1>
        </header>
    )
}