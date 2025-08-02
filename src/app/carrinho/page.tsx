"use client";

import { useCart } from '@/lib/contexts/cartContext';
import { CreditCard, Disc3, FileText, Package, ShoppingBag, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import BackButton from '@/src/components/backButton';
import Link from 'next/link';
import Footer from '@/src/components/footer';

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
          <>
            <div className="mx-auto mt-79 mb-21 text-center h-full">
              <h1 className='flex gap-2 text-xl items-center justify-center font-bold p-3 mb-1 fixed top-0 z-20 mt-1 w-full md:hidden'><ShoppingCart strokeWidth={2} width={28} height={28}/>Carrinho</h1>
              <BackButton/>
              <Disc3 className='mx-auto my-2 animate-spin' width={40} height={40}/>
              <h1 className="text-2xl font-bold mb-1 mt-5">Ops! Seu carrinho está vazio.</h1>
              <p className='text-neutral-400 max-w-80 mx-auto mb-6'>Adicione seus discos favoritos ao carrinho e volte aqui!</p>
              <Link href="/catalogo" className='p-3 rounded-full border border-neutral-400 active:bg-neutral-600 active:scale-90'>Voltar ao catálogo</Link>
            </div>
          </>
    );
}

  return (
    <>
    <div className="mt-16 md:mt-20 lg:mt-50 md:m-3 pb-60 md:pb-20 2xl:mx-60">
      <h1 className='flex gap-2 text-xl items-center justify-center font-bold p-3 mb-1 fixed top-0 z-20 mt-1 w-full md:hidden'><ShoppingCart strokeWidth={2} width={28} height={28}/>Carrinho</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-3 mt-3 bg-[#101010] md:border rounded-lg p-2 md:p-8">
            <h1 className='hidden md:flex gap-2 text-xl items-center justify-start font-medium text-white mb-5 w-full'><ShoppingCart strokeWidth={2} width={28} height={28}/>CARRINHO</h1>
            {cartItems.map((item) => (
                <div key={item._id} className="border-b p-5 relative bg-[#171717] border border-neutral-700 shadow-lg shadow-black rounded-md">
                <div className='flex'>
                    <div className="max-w-30 md:max-w-34 flex-shrink-0">
                    <Link href={`/catalogo/${item._id}`} className='hover:opacity-50 transition-all'><Image src={item.img} alt={item.title} className="w-full rounded-sm border border-neutral-700" width={300} height={300}/></Link>
                    </div>
                    
                    <div className="ml-3 flex-grow flex flex-col">
                        <div className='flex items-baseline justify-start gap-3'>
                            <Link href={`/catalogo/${item._id}`} className="font-medium my-auto max-w-47 md:max-w-fit md:text-lg hover:underline active:underline underline-offset-2"><h3>{item.title}</h3></Link>
                            {item.edition === "Deluxe" && <div className='absolute bg-amber-400 rounded p-1 top-6 left-6 md:static md:w-fit'>
                              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="black"/>
                              </svg>
                            </div>}
                            {item.edition === "Exclusive" && <div className='absolute bg-purple-500 rounded p-1 top-6 left-6 border-black md:static md:w-fit'>
                              <svg width="14" height="14" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z" fill="white"/>
                              </svg>
                            </div>}
                            <button onClick={() => removeFromCart(item._id)} className="hover:text-red-400 ml-auto hover:scale-105 transition-all active:scale-90"><Trash2 width={22} className='active:text-red-400'/></button>
                        </div>
                        <p className="text-neutral-400 text-sm">{item.artist}</p>
                        <div className='flex items-center gap-1'>
                          <Image 
                              src="/rating.png" 
                              alt="rating" 
                              width={100} 
                              height={24} 
                              className='max-h-fit xl:w-20 pb-1'
                          />
                          <p className='text-wrap text-xs text-neutral-400'><span className='text-neutral-300'>4.8 </span>- 231 avaliações</p>
                      </div>
                        <div className='flex items-baseline justify-between mt-auto'>
                            <p className="mt-1 text-lg text-white font-bold md:text-xl">R$ {item.price.toFixed(2)}</p>
                            <div className="flex items-center border border-neutral-600 rounded-sm">
                                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-3 py-1 hover:bg-neutral-700 active:scale-90 transition-all"> - </button>
                                <span className="px-3">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-3 py-1 hover:bg-neutral-700 active:scale-90 transition-all"> + </button>
                            </div>
                        </div>
                    </div>
                </div>
                
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="bg-[#131313] md:bg-[#101010] rounded-lg p-5 border-t md:p-8 md:border md:border-neutral-800 md:mt-3  border-neutral-600 fixed z-10 w-full left-0 bottom-20 rounded-b-none md:static lg:rounded-md">
            <h1 className='md:flex gap-2 text-xl items-center justify-start font-medium text-white hidden mb-0 md:mb-5 w-full'><FileText strokeWidth={2} width={28} height={28}/>RESUMO</h1>
            <div className='flex items-center justify-between md:flex-col md:items-start md:gap-4'>
              <div className='flex flex-col mt-0'>
                <h2 className='text-md'>Subtotal <span className='text-neutral-400 ml-0.5 text-sm'>({itemCount} itens)</span></h2>
                <p className="text-3xl text-white font-bold">R$ {total.toFixed(2)}</p>
              </div>
              <Link href="/carrinho/pagamento" className='md:w-full'><button className='bg-white active:scale-90 hover:bg-neutral-400 hover:scale-104 transition-all md:max-h-12 md:border-2 md:border-[#A5A1A1] active:bg-neutral-400 px-6 md text-black p-3 md:p-2 rounded-full md:rounded-md w-fit md:w-full flex justify-center gap-1 items-center font-bold text-lg'><CreditCard/>Pagamento</button></Link>
            </div>
            <div className='mt-12 hidden md:block'>
              <span className='flex items-center gap-2 text-white'>
                <ShoppingBag/>
                <h2 className=' font-bold'>Pagamentos Seguros</h2>
              </span>
              <p className='text-sm mt-4 text-neutral-400 leading-6.5 font-light'>
                Conte com a segurança dos seus dados, garantida por nossos parceiros de pagamento.
              </p>
            </div>
            <div className='mt-12 hidden md:block'>
              <span className='flex items-center gap-2 text-white'>
                <Package/>
                <h2 className=' font-bold'>Entrega rápida</h2>
              </span>
              <p className='text-sm mt-4 text-neutral-400 leading-6.5 font-light'>
                Cupom de R$5,00 por entrega atrasada · Reembolso se itens chegarem com dano · Reembolso se o pacote for perdido · Reembolso se não for entregue em 50 dias.
              </p>
            </div>
          </div>
        </div>
      </div>
      <BackButton/>
    </div>
    <Footer/>
    </>
  );
}