"use client"
import { useCart } from '@/lib/contexts/cartContext';
import { Disc3, Home, SearchIcon, ShoppingCartIcon, User2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import SearchOverlay from './searchOverlay';


export default function HeaderLogo(){

    const pathname = usePathname();
    const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);

    const shouldHide = pathname === "/carrinho" || pathname === "/carrinho/pagamento" || pathname === "/conta/meus-pedidos" || pathname === "/conta/meus-favoritos" || pathname === "/configuracoes"
    // Removendo a condição que oculta o header na página de busca
    const isSearchPage = false

    const cart = useCart();
    const cartCount = cart.cartItems.length
    const notification = cartCount > 0

    return(
        <>
            <header className={` bg-[#0D0D0D] flex items-center justify-center lg:justify-between gap-2 h-16 lg:h-36 lg:px-10 xl:px-60 border-b-1 border-b-neutral-700 fixed w-full top-0 z-10 ${isSearchPage? "hidden" : ""}`}>
              <div className='flex items-center gap-2 md:ml-5'>
                <Link href="/"><Image alt='logo' width={462} height={84} src="/logo2.svg" className={`${shouldHide ? "hidden md:inline" : ""} size-65 h-14 lg:size-full lg:min-w-60`}/></Link>
              </div>
                      <ul className="lg:text-md xl:text-lg hidden right-5 lg:flex gap-1 xl:gap-6">
                          <li><button className="hover:scale-90 active:scale-80 transition-all"><Link href="/"><span className={`flex gap-2 ${pathname === "/" ? 'bg-white text-black' : 'bg-transparent'} p-3 rounded-xl`}><Home/>Início</span></Link></button></li>
                          <li><button onClick={() => setSearchOverlayOpen(true)} className="hover:scale-90 active:scale-80 transition-all"><span className={`flex gap-2 ${pathname === "/busca" ? 'bg-white text-black' : 'bg-transparent'} p-3 rounded-xl`}><SearchIcon/>Buscar</span></button></li>
                          <li><button className="hover:scale-90 active:scale-80 transition-all"><Link href="/catalogo"><span className={`flex gap-2 ${pathname === "/catalogo" ? 'bg-white text-black' : 'bg-transparent'} p-3 rounded-xl`}><Disc3/>Catálogo</span></Link></button></li>
                          <li><button className="hover:scale-90 active:scale-80 transition-all"><Link href="/carrinho">
                          <span className={`flex relative gap-2 ${pathname === "/carrinho" ? 'bg-white text-black' : 'bg-transparent'} p-3 rounded-xl`}><ShoppingCartIcon/>
                          {notification && <span className="absolute right-23 bg-red-500 w-4 h-4 text-xs text-white rounded-full top-2 z-10">{cartCount}</span>}
                            Carrinho
                          </span></Link></button></li>
                          <li><button className="hover:scale-90 active:scale-80 transition-all"><Link href="/conta"><span className={`flex gap-2 ${pathname === "/conta" ? 'bg-white text-black' : 'bg-transparent'} p-3 rounded-xl`}><User2/>Conta</span></Link></button></li>
                      </ul>
            </header>
            {searchOverlayOpen && (
              <SearchOverlay isOpen={searchOverlayOpen} onClose={() => setSearchOverlayOpen(false)} />
            )}
        </>
    );
}