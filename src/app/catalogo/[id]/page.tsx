"use client"

import Image from 'next/image';
import FavoriteButton from "@/src/components/favoriteButton"
import BackButton from "@/src/components/backButton"
import { useCart } from '@/lib/contexts/cartContext';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ProductType } from '@/lib/types/Product';
import { Progress } from '@/components/ui/progress';
import { ShoppingCart } from 'lucide-react';

export default function ProductPage() {
    const params = useParams();
    const id = params.id as string;
    const { addToCart } = useCart();
    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cartAlert, setCartAlert] = useState(false);
    const [progressValue, setProgressValue] = useState(0)

    useEffect(() => {
        async function fetchProduct() {
            try {
                setLoading(true);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/catalogo/${id}`);
                
                if (!res.ok) {
                    throw new Error(`Erro HTTP: ${res.status}`);
                }
                
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Ocorreu um erro desconhecido');
                }
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <main className="mt-20 text-center">
                <p>Carregando...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="mt-20 text-center">
                <p className="text-red-500">{error}</p>
                <BackButton />
            </main>
        );
    }

    if (!product) {
        return (
            <main className="mt-20 text-center">
                <p>Produto não encontrado</p>
                <BackButton />
            </main>
        );
    }

    const handleAddToCart = () => {
        addToCart({
            _id: product._id,
            title: product.title,
            artist: product.artist,
            price: product.price,
            img: product.img,
            quantity: 1,
            edition: product.edition
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

    return (
        <main>
            <div className='mt-20 m-4 pb-50 relative'>
                <Image 
                    src={product.img} 
                    alt="album cover" 
                    className="w-full rounded-xl sm:rounded-md mb-5 border border-neutral-700 aspect-square" 
                    width={300} 
                    height={300}
                    priority
                />
                {product.edition === "Deluxe" && 
                <div className='absolute bg-amber-400 top-81 right-0 m-3 text-black font-bold flex items-center gap-1 p-1 border-1 border-black px-2  rounded-md text-sm tracking-tight'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="black"/>
                    </svg>DELUXE
                </div>}
                {product.edition === "Exclusive" && 
                <div className='absolute bg-purple-700 top-81 right-0 m-3 font-bold flex items-center gap-1 p-1 border border-black text-purple-100 text-sm rounded-md tracking-tight'>
                    <svg width="18" height="18" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z" fill="oklch(94.6% 0.033 307.174)"/>
                    </svg>EXCLUSIVO
                </div>}
                <div className='flex justify-between'>
                    <div className='flex-row'>
                        <h1 className='font-medium text-neutral-300 text-lg max-w-80'>{product.title}</h1>
                        <h2 className='font-light text-neutral-400 py-1'>{product.artist}</h2>
                    </div>
                    <FavoriteButton product={product} />
                </div>
                <div className='flex items-center justify-between'>
                    <div className='flex gap-1 items-center font-extralight text-neutral-400'>
                        <Image 
                            src="/rating.png" 
                            alt="rating" 
                            width={100} 
                            height={24} 
                            className='max-h-fit'
                        />
                        <p className='text-wrap'><span className='text-neutral-300'>4.8</span> (231)</p>
                    </div>
                    <p className='text-3xl font-extrabold text-white text-right'>R$ {product.price.toFixed(2)}</p>
                </div>

                <section className='mt-5 border-t border-neutral-700 pt-5'>
                    <h3 className='font-medium text-lg pb-3'>Descrição</h3>
                    <p className='text-neutral-400 leading-5 whitespace-pre-line'>{product.description}</p>
                </section>
            </div>
            
            <div className='fixed bottom-21 bg-[#131313] border-t border-t-neutral-600 rounded-t-2xl items-center h-21 w-full p-5 flex justify-between'>
                <p className='text-2xl font-bold'>R$ {product.price.toFixed(2)}</p>
                <button className='bg-blue-600 p-3 truncate rounded-full text-white font-bold flex gap-3 px-4 shadow-md shadow-neutral-950 active:scale-95 active:bg-blue-800' onClick={handleAddToCart}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.5H5L7.68 14.89C7.77144 15.3504 8.02191 15.764 8.38755 16.0583C8.75318 16.3526 9.2107 16.509 9.68 16.5H19.4C19.8693 16.509 20.3268 16.3526 20.6925 16.0583C21.0581 15.764 21.3086 15.3504 21.4 14.89L23 6.5H6M10 21.5C10 22.0523 9.55228 22.5 9 22.5C8.44772 22.5 8 22.0523 8 21.5C8 20.9477 8.44772 20.5 9 20.5C9.55228 20.5 10 20.9477 10 21.5ZM21 21.5C21 22.0523 20.5523 22.5 20 22.5C19.4477 22.5 19 22.0523 19 21.5C19 20.9477 19.4477 20.5 20 20.5C20.5523 20.5 21 20.9477 21 21.5Z" 
                            stroke="white" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                    Adicionar ao Carrinho
                </button>
            </div>
            <BackButton />
            {cartAlert && (
                <div className='fixed bottom-40 right-0 h-fit rounded-md z-40 bg-neutral-950 border m-3 w-fit'>
                    <Progress value={progressValue} className=" rounded-none rounded-t-md border-b"/>
                    <div className='gap-3 p-3 flex justify-center items-center'>
                        <ShoppingCart/>
                        <p>Produto adicionado ao carrinho.</p>
                    </div>
                </div>
            )}
        </main>
    )
}