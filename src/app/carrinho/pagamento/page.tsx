"use client"

import { useCart } from '@/lib/contexts/cartContext';
import { Check, CreditCard, Disc3, MapPin, User2 } from 'lucide-react';
import BackButton from '@/src/components/backButton';
import Link from 'next/link';
import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import Image from 'next/image';


export default function Pagamento(){

    const {total, itemCount } = useCart();

    if(itemCount === 0){
        return(
                <div className="mx-auto mt-79 text-center h-full">
                <h1 className='flex gap-2 text-xl items-center justify-center font-bold p-3 mb-1 fixed top-0 z-20 mt-1 w-full'><CreditCard strokeWidth={2} width={28} height={28}/>Pagamento</h1>
                <BackButton/>
                <Disc3 className='mx-auto my-2 animate-spin' width={40} height={40}/>
                <h1 className="text-2xl font-bold mb-1 mt-5">Ops! Seu carrinho está vazio.</h1>
                <p className='text-neutral-400 max-w-80 mx-auto mb-6'>Adicione seus discos favoritos ao carrinho e volte aqui!</p>
                <Link href="/catalogo" className='p-3 rounded-full border border-neutral-400 active:bg-neutral-600 active:scale-90'>Voltar ao catálogo</Link>
            </div>
        )
    }

    return(
        <div>
            <h1 className='fixed top-0 z-20 justify-center w-full flex text-xl font-bold gap-2 items-center mt-4'><CreditCard width={28} height={28} strokeWidth={2}/> Pagamento</h1>

            <main className='mt-16'>
                <section className='border-b pb-5 pt-3'>
                    <div className='mx-3'>
                        <div className='flex gap-1 items-center text-white justify-between'>
                            <div className='flex gap-1 items-center'>
                                <MapPin width={20} height={20}/>
                                <h2>Endereço de Entrega</h2>
                            </div>
                            <p className='text-blue-500 opacity-70'>Alterar</p>
                        </div>
                        <div className='bg-[#1C1C1C] h-20 border border-neutral-700 rounded-lg mt-3 flex items-center p-2'>
                            <div className='bg-[#2F2F2F] min-h-16 min-w-16 rounded-md flex justify-center items-center'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C11.7667 22 11.5667 21.9333 11.4 21.8C11.2333 21.6667 11.1083 21.4917 11.025 21.275C10.7083 20.3417 10.3083 19.4667 9.825 18.65C9.35833 17.8333 8.7 16.875 7.85 15.775C7 14.675 6.30833 13.625 5.775 12.625C5.25833 11.625 5 10.4167 5 9C5 7.05 5.675 5.4 7.025 4.05C8.39167 2.68333 10.05 2 12 2C13.95 2 15.6 2.68333 16.95 4.05C18.3167 5.4 19 7.05 19 9C19 10.5167 18.7083 11.7833 18.125 12.8C17.5583 13.8 16.9 14.7917 16.15 15.775C15.25 16.975 14.5667 17.975 14.1 18.775C13.65 19.5583 13.275 20.3917 12.975 21.275C12.8917 21.5083 12.7583 21.6917 12.575 21.825C12.4083 21.9417 12.2167 22 12 22ZM12 11.5C12.7 11.5 13.2917 11.2583 13.775 10.775C14.2583 10.2917 14.5 9.7 14.5 9C14.5 8.3 14.2583 7.70833 13.775 7.225C13.2917 6.74167 12.7 6.5 12 6.5C11.3 6.5 10.7083 6.74167 10.225 7.225C9.74167 7.70833 9.5 8.3 9.5 9C9.5 9.7 9.74167 10.2917 10.225 10.775C10.7083 11.2583 11.3 11.5 12 11.5Z" fill="#C53D3D"/>
                                </svg>
                            </div>
                            <div className='flex-col flex m-2 text-sm text-neutral-300 truncate'>
                                <p>Rua Capitão Zuca Neves, 121</p>
                                <p>Jardim Paraíso</p>
                                <p>13425-020 São Paulo, SP</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='border-b pb-5 pt-3'>
                    <div className='mx-3'>
                        <div className='flex gap-1 items-center text-white justify-between'>
                            <div className='flex gap-1 items-center'>
                                <CreditCard width={20} height={20}/>
                                <h2>Método de Pagamento</h2>
                            </div>
                            <p className='text-blue-500 opacity-70'>Alterar</p>
                        </div>
                        <div className='rounded-lg mt-3 flex items-center w-full'>
                            <RadioGroup defaultValue="comfortable" className='w-full'>
                                <div className="flex items-center gap-3 border border-neutral-800 p-3 rounded-md focus:border-neutral-100">
                                    <RadioGroupItem value="card1" id="r1" />
                                    <Label htmlFor="r1">•••• •••• •••• 5225 (Crédito)</Label>
                                    <Image src="/mastercard.png" width={28} height={15} alt={"mastercard"}/>
                                </div>
                                <div className="flex items-center gap-3 border border-neutral-800 p-3 rounded-md">
                                    <RadioGroupItem value="card2" id="r2" />
                                    <Label htmlFor="r2">•••• •••• •••• 7223 (Débito)</Label>
                                    <Image src="/mastercard.png" width={28} height={15} alt={"mastercard"}/>
                                </div>
                                <div className="flex items-center gap-3 border border-neutral-800 p-3 rounded-md">
                                    <RadioGroupItem value="pix" id="r3" />
                                    <Label htmlFor="r3">Pix</Label>
                                    <Image src="/pix.png" width={20} height={20} alt={"mastercard"}/>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </section>
                <section className='border-b pb-5 pt-3'>
                    <div className='mx-3'>
                        <div className='flex gap-1 items-center text-white justify-between'>
                            <div className='flex gap-1'>
                                <User2 width={20} height={20}/>
                                <h2>Informações Gerais</h2>
                            </div>
                            <p className='text-blue-500 opacity-70'>Alterar</p>
                        </div>
                        <div className='text-sm font-normal mt-2 flex flex-col gap-2'>
                            <p>Eduarda da Silva</p>
                            <p>227.•••.•••.532-20</p>
                            <p>eduardasilva@gmail.com</p>
                            <p>(11) 95623 - 6233</p>
                        </div>
                    </div>
                </section>
            </main>
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
          <BackButton/>
        </div>
    )
}