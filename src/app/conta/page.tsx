"use client"
import { ArrowRight, Disc3, Heart, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Conta(){
    const usuario = "eduarda"

    return(
        <main className="mt-16 pt-1 bg-[#101010] h-dvh bg-[url(/account-background.png)] bg-no-repeat bg-contain bg-center">
            <section className="flex gap-5 items-center m-3 text-md pb-2">
                <Image src="/user.png" alt="foto de usuário" width={90} height={90} className="h-fit"/>
                <div className="flex flex-col">
                    <p className="font-medium text-white">{usuario}</p>
                    <p className="text-neutral-400">{usuario}@gmail.com</p>
                    <span className="flex gap-1 items-center my-1">
                        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.8 12.8L8 10.36L11.2 12.8L10 8.84L13.2 6.56H9.28L8 2.4L6.72 6.56H2.8L6 8.84L4.8 12.8ZM8 16C6.89333 16 5.85333 15.79 4.88 15.37C3.90667 14.95 3.06 14.38 2.34 13.66C1.62 12.94 1.05 12.0933 0.63 11.12C0.21 10.1467 0 9.10667 0 8C0 6.89333 0.21 5.85333 0.63 4.88C1.05 3.90667 1.62 3.06 2.34 2.34C3.06 1.62 3.90667 1.05 4.88 0.63C5.85333 0.21 6.89333 0 8 0C9.10667 0 10.1467 0.21 11.12 0.63C12.0933 1.05 12.94 1.62 13.66 2.34C14.38 3.06 14.95 3.90667 15.37 4.88C15.79 5.85333 16 6.89333 16 8C16 9.10667 15.79 10.1467 15.37 11.12C14.95 12.0933 14.38 12.94 13.66 13.66C12.94 14.38 12.0933 14.95 11.12 15.37C10.1467 15.79 9.10667 16 8 16Z" fill="#D49837"/>
                        </svg>
                        <p className="text-sm text-neutral-400">Amante de música desde 2025</p>
                    </span>
                    <Link href="/configuracoes"><button className="p-1 my-1 border border-neutral-500 px-3 text-sm w-fit bg-neutral-800 rounded-md active:scale-90 active:bg-neutral-900 hover:bg-neutral-900 hover:cursor-pointer">Editar Perfil</button></Link>
                </div>
            </section>
            <h1 className="text-lg border-y border-neutral-800 p-3">Pronto(a) para mais um disco hoje, {usuario}?</h1>
            <section className="">
                <ul className="w-full border-b">
                    <li className="hover:bg-neutral-800 active:bg-neutral-800"><Link href="conta/meus-pedidos" className="flex p-3 gap-2 w-full active:scale-95"><Disc3 width={18}/>Meus pedidos<ArrowRight width={18} className="ml-auto"/></Link></li>
                    <li className="hover:bg-neutral-800 active:bg-neutral-800"><Link href="conta/meus-favoritos" className="flex p-3 gap-2 w-full active:scale-95"><Heart width={18}/>Meus favoritos<ArrowRight width={18} className="ml-auto"/></Link></li>
                    <li className="hover:bg-neutral-800 active:bg-neutral-800"><Link href="/configuracoes" className="flex p-3 gap-2 w-full active:scale-95"><Settings width={18}/>Configurações<ArrowRight width={18} className="ml-auto"/></Link></li>
                    <li className="hover:bg-neutral-800 active:bg-neutral-800 text-red-400"><button disabled className="flex p-3 gap-2 w-full active:scale-95 cursor-pointer"><LogOut width={18}/>Sair</button></li>
                </ul>
            </section>
        </main>
    )
}