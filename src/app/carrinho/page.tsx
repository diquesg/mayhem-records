"use client";

import { useCart } from '@/lib/contexts/cartContext';
import { Check, Disc3, ShoppingCart, Trash2 } from 'lucide-react';
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
          <Disc3 className='mx-auto my-2' width={40} height={40}/>
          <h1 className="text-2xl font-bold mb-1 mt-5">Ops! Seu carrinho está vazio.</h1>
          <p className='text-neutral-400 max-w-80 mx-auto mb-6'>Adicione seus discos favoritos ao carrinho e volte aqui!</p>
          <Link href="/catalogo" className='p-3 rounded-full border border-neutral-400 active:bg-neutral-600 active:scale-90'>Voltar ao catálogo</Link>
        </div>
    );
}

  return (
    <div className="mt-16 m-3 pb-60">
        <h1 className='flex gap-2 text-xl items-center justify-center font-bold p-3 mb-1'><ShoppingCart/>CARRINHO</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-3">
            {cartItems.map((item) => (
                <div key={item._id} className="border-b p-3 bg-[#171717] border border-neutral-700 shadow-lg shadow-black rounded-md">
                <div className='flex'>
                    <div className="max-w-30 flex-shrink-0">
                    <Image src={item.img} alt={item.title} className="w-full rounded-sm" width={300} height={300}/>
                    </div>
                    
                    <div className="ml-3 flex-grow flex flex-col">
                        <div className='flex items-baseline justify-between'>
                            <h3 className="font-medium my-auto max-w-47">{item.title}</h3>
                            <button onClick={() => removeFromCart(item._id)} className="hover:text-red-400"><Trash2 width={22}/></button>
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
          <div className="bg-[#171717] rounded-lg p-6 border-t border-neutral-600 fixed z-40 w-full left-0 bottom-0 rounded-b-none lg:static lg:rounded-md">
            <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal ({itemCount} itens)</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Frete</span>
                <span>Grátis</span>
              </div>
              
              <div className="flex border-t items-baseline border-neutral-700 justify-between pt-2">
                    <div className='flex flex-col items-center mt-3'>
                        <span className='mr-auto'>Total</span>
                        <span className='truncate font-bold  text-xl'>R$ {total.toFixed(2)}</span>
                    </div>
                    <button className="mt-auto w-full ml-10 bg-blue-600 font-bold text-lg hover:bg-blue-700 text-white p-3 rounded-full flex gap-3 justify-center items-center"><Check /> Finalizar Compra</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackButton/>
    </div>
  );
}