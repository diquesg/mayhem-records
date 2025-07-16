"use client";

import { useCart } from '@/lib/contexts/cartContext';
import { ArrowRight, Disc3, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import BackButton from '@/src/components/backButton';
import Link from 'next/link';

export default function CartPage() {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        total,
        itemCount,
    } = useCart();
    
    if (itemCount === 0) {
        return (
        <div className="mx-auto mt-79 text-center h-full">
          <h1 className='flex gap-2 text-xl items-center justify-center font-bold p-3 mb-1 fixed top-0 z-20 mt-1 w-full'><ShoppingCart strokeWidth={2} width={28} height={28}/>Carrinho</h1>
          <BackButton/>
          <Disc3 className='mx-auto my-2 animate-spin' width={40} height={40}/>
          <h1 className="text-2xl font-bold mb-1 mt-5">Ops! Seu carrinho está vazio.</h1>
          <p className='text-neutral-400 max-w-80 mx-auto mb-6'>Adicione seus discos favoritos ao carrinho e volte aqui!</p>
          <Link href="/catalogo" className='p-3 rounded-full border border-neutral-400 active:bg-neutral-600 active:scale-90'>Voltar ao catálogo</Link>
        </div>
    );
}

  return (
    <div className="mt-16 m-3 pb-60">
      <h1 className='flex gap-2 text-xl items-center justify-center font-bold p-3 mb-1 fixed top-0 z-20 mt-1 w-full'><ShoppingCart strokeWidth={2} width={28} height={28}/>Carrinho</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-3 mt-3">
            {cartItems.map((item) => (
                <div key={item._id} className="border-b p-3 relative bg-[#171717] border border-neutral-700 shadow-lg shadow-black rounded-md">
                  {item.edition === "Deluxe" && <div className='absolute bg-amber-400 rounded-sm p-1 top-0 left-0 m-5'>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="black"/>
                    </svg>
                  </div>}
                  {item.edition === "Exclusive" && <div className='absolute bg-purple-500 rounded-sm  p-1 top-0 left-0 m-5 border-black'>
                    <svg width="16" height="16" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z" fill="white"/>
                    </svg>
                  </div>}
                <div className='flex'>
                    <div className="max-w-30 flex-shrink-0">
                    <Image src={item.img} alt={item.title} className="w-full rounded-sm border border-neutral-700" width={300} height={300}/>
                    </div>
                    
                    <div className="ml-3 flex-grow flex flex-col">
                        <div className='flex items-baseline justify-between'>
                            <h3 className="font-medium my-auto max-w-47">{item.title}</h3>
                            <button onClick={() => removeFromCart(item._id)} className="hover:text-red-400"><Trash2 width={22} className='active:text-red-400'/></button>
                        </div>
                        <p className="text-neutral-400 text-sm">{item.artist}</p>
                        <div className='flex items-baseline justify-between mt-auto'>
                            <p className="mt-1 text-lg text-white font-bold">R$ {item.price.toFixed(2)}</p>
                            <div className="flex items-center border border-neutral-600 rounded-sm">
                                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-3 py-1 hover:bg-neutral-700"> - </button>
                                <span className="px-3">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-3 py-1 hover:bg-neutral-700"> + </button>
                            </div>
                        </div>
                    </div>
                </div>
                
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="bg-[#131313] rounded-lg p-5 border-t border-neutral-600 fixed z-10 w-full left-0 bottom-23 rounded-b-none lg:static lg:rounded-md">
            <div className='flex items-center justify-between'>
              <div className='flex flex-col'>
                <h2>Subtotal</h2>
                <p className="text-xl font-bold">R$ {total.toFixed(2)}</p>
              </div>
              <Link href="/carrinho/pagamento"><button className='bg-blue-600 active:scale-90 active:bg-blue-800 px-6 text-white p-3 rounded-full w-fit flex justify-center gap-1 items-center font-bold text-lg'><ArrowRight/>Prosseguir</button></Link>
            </div>
            
          </div>
        </div>
      </div>
      <BackButton/>
    </div>
  );
}