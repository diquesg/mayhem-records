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
            <div className='mt-20 m-4 pb-50'>
                <Image 
                    src={product.img} 
                    alt="album cover" 
                    className="w-full rounded-xl sm:rounded-md mb-5 border border-neutral-700 aspect-square" 
                    width={300} 
                    height={300}
                    priority
                />
                <div className='flex justify-between'>
                    <div className='flex-row'>
                        <h1 className='font-medium text-neutral-300 text-lg max-w-80'>{product.title}</h1>
                        <h2 className='font-light text-neutral-400 py-1'>{product.artist}</h2>
                    </div>
                    <FavoriteButton productId={product._id} />
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
                        <p><span className='text-neutral-300'>4.8</span> (231)</p>
                    </div>
                    <p className='text-3xl font-extrabold text-white'>R$ {product.price.toFixed(2)}</p>
                </div>

                <section className='mt-5 border-t border-neutral-700 pt-5'>
                    <h3 className='font-medium text-lg pb-3'>Descrição</h3>
                    <p className='text-neutral-400 leading-5'>{product.description}</p>
                </section>
            </div>
            
            <div className='fixed bottom-21 bg-[#131313] border-t border-t-neutral-600 rounded-t-2xl items-center h-21 w-full p-5 flex justify-between'>
                <p className='text-2xl font-bold'>R$ {product.price.toFixed(2)}</p>
                <button 
                    className='bg-blue-600 p-3 rounded-full text-white font-bold flex gap-3 px-4 shadow-md shadow-neutral-950 active:scale-90 active:bg-blue-800' 
                    onClick={handleAddToCart}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.5H5L7.68 14.89C7.77144 15.3504 8.02191 15.764 8.38755 16.0583C8.75318 16.3526 9.2107 16.509 9.68 16.5H19.4C19.8693 16.509 20.3268 16.3526 20.6925 16.0583C21.0581 15.764 21.3086 15.3504 21.4 14.89L23 6.5H6M10 21.5C10 22.0523 9.55228 22.5 9 22.5C8.44772 22.5 8 22.0523 8 21.5C8 20.9477 8.44772 20.5 9 20.5C9.55228 20.5 10 20.9477 10 21.5ZM21 21.5C21 22.0523 20.5523 22.5 20 22.5C19.4477 22.5 19 22.0523 19 21.5C19 20.9477 19.4477 20.5 20 20.5C20.5523 20.5 21 20.9477 21 21.5Z" 
                              stroke="white" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"/>
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