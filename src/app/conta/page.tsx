"use client"
import { Check, Disc3, Heart, HeartCrack, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useFavorites } from '@/lib/contexts/favoritesContext';
import ProductCard from "@/src/components/productCard";
import Footer from "@/src/components/footer";

export default function Conta(){
    const usuario = "Eduarda"
    const { favorites } = useFavorites();

    const orders = [
    {
      id: "VNL-25002",
      date: "03/05/2025",
      status: "Em transporte",
      items: [
        { title: "Thriller - Michael Jackson", price: 95.50 },
        { title: "Mayhem - Lady Gaga", price: 195.90 }
      ],
      total: 95.50
    },
  {
    id: "VNL-25001",
    date: "15/03/2025",
    status: "Entregue",
    items: [
      { title: "OK Computer - Radiohead", price: 89.90 }
    ],
    total: 209.90
  },
]

    return(
        <main className=" pt-1 bg-[#101010] h-dvh bg-no-repeat bg-contain bg-center">
            <div className="md:bg-[url(/account-banner.png)] pb-10 md:pb-0 border-b border-neutral-700 bg-cover h-fit mt-20 md:mt-35 w-full lg:py-15 md:px-20 xl:px-90 flex">
                <section className="md:bg-[#151515] md:p-3 md:py-6 my-auto md:border border-neutral-700 w-full rounded-lg md:px-6 flex gap-5 items-center m-2 text-md">
                    <Image src="/user.png" alt="foto de usuário" width={170} height={170} className="lg:h-fit"/>
                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-white text-2xl sm:text-3xl">{usuario}</p>
                        <p className="text-neutral-400 font-light">{usuario.toLowerCase()}@gmail.com</p>
                        <span className="flex gap-1 items-start my-1">
                            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.8 12.8L8 10.36L11.2 12.8L10 8.84L13.2 6.56H9.28L8 2.4L6.72 6.56H2.8L6 8.84L4.8 12.8ZM8 16C6.89333 16 5.85333 15.79 4.88 15.37C3.90667 14.95 3.06 14.38 2.34 13.66C1.62 12.94 1.05 12.0933 0.63 11.12C0.21 10.1467 0 9.10667 0 8C0 6.89333 0.21 5.85333 0.63 4.88C1.05 3.90667 1.62 3.06 2.34 2.34C3.06 1.62 3.90667 1.05 4.88 0.63C5.85333 0.21 6.89333 0 8 0C9.10667 0 10.1467 0.21 11.12 0.63C12.0933 1.05 12.94 1.62 13.66 2.34C14.38 3.06 14.95 3.90667 15.37 4.88C15.79 5.85333 16 6.89333 16 8C16 9.10667 15.79 10.1467 15.37 11.12C14.95 12.0933 14.38 12.94 13.66 13.66C12.94 14.38 12.0933 14.95 11.12 15.37C10.1467 15.79 9.10667 16 8 16Z" fill="#D49837"/>
                            </svg>
                            <p className="text-sm text-neutral-400 font-medium">Amante de música desde 2025</p>
                        </span>
                        <Link href=""><button className="p-2 my-1 border hover:scale-102 transition-all border-neutral-500 px-3 text-sm w-fit bg-neutral-800 rounded-md active:scale-90 active:bg-neutral-900 hover:bg-neutral-900 hover:cursor-pointer">Editar Perfil</button></Link>
                    </div>
                </section>
            </div>
                <section className="md:px-20 xl:px-60 pt-10 md:pt-15 mx-2 md:mx-0">
                    <h1 className="text-2xl font-medium text-white flex gap-2 items-center">
                        <span className="">
                            <Heart strokeWidth={2} className="size-7"/>
                        </span>
                        MEUS FAVORITOS</h1>
                        <div>
                            {favorites.length === 0 ? (
                                <div className="text-center mt-10 flex flex-col gap-1">
                                    <HeartCrack className='self-center' width={32} height={32}/>
                                    <h1 className="text-xl text-neutral-300 mb-1 font-bold">Nada encontrado!</h1>
                                    <p className="text-lg mb-2">Você ainda não tem favoritos.</p>
                                    <Link href="/catalogo" className="self-center border border-white text-white py-2 px-6 rounded-full hover:bg-neutral-700 active:bg-neutral-700 active:scale-95">Explorar Catálogo</Link>
                                    </div>
                            ) : (
                                <div className={`mt-8 pt-4 overflow-x-auto pb-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-3 lg:gap-4 justify-items-center`}>
                                {favorites.map((product) => (
                                    <ProductCard key={product._id} _id={product._id} title={product.title} artist={product.artist} price={product.price} img={product.img} edition={product.edition} />
                                ))}
                                </div>
                            )}
                        </div>
                </section>
                <section className="md:px-20 xl:px-60 pt-15 mx-2 md:mx-0">
                    <h1 className="text-2xl font-medium text-white flex gap-2 items-center">
                        <span className=""><Disc3 strokeWidth={2} className="size-7"/></span>
                        MEUS PEDIDOS</h1>
                        <div className="flex flex-col md:flex-row md:gap-4 pb-30 md:pb-20">
                            {orders.map(order => (
                            <div key={order.id} className="border hover:scale-103 transition-all border-neutral-700 rounded-lg p-4 md:w-120 mt-8 bg-neutral-900 shadow-lg shadow-black">
                                <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-white">Pedido #{order.id}</h3>
                                    <p className="text-sm text-neutral-500">{order.date}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                    order.status === "Entregue" 
                                    ? "bg-green-200 text-green-800" 
                                    : "bg-blue-200 text-blue-800"
                                }`}>
                                    {order.status === "Entregue" &&  (<div className='flex items-center gap-1'><Check width={16}/> {order.status}</div>)}
                                    {order.status === "Em transporte" &&  (<div className='flex items-center gap-1'><Truck width={16}/> {order.status}</div>)}
                                </span>
                                </div>

                                <div className="my-3 border-t pt-3">
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex justify-between text-sm mb-2 gap-4">
                                    <span className='flex items-baseline gap-1'><span className='text-neutral-500'>1</span> {item.title}</span>
                                    <span className='text-nowrap'>R$ {item.price.toFixed(2)}</span>
                                    </div>
                                ))}
                                </div>

                                <div className="flex justify-between font-semibold border-t pt-3">
                                <span>Total</span>
                                <span>R$ {order.total.toFixed(2)}</span>
                                </div>
                            </div>
                            ))}

                            {orders.length === 0 && (
                            <div className="text-center py-10">
                                <p className="text-neutral-500 mb-4">Nenhum pedido encontrado</p>
                                <Link 
                                href="/catalogo" 
                                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg"
                                >
                                Explorar Catálogo
                                </Link>
                            </div>
                            )}
                        </div>
                </section>
                <Footer/>
        </main>
    )
}