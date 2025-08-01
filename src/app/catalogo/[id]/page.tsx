"use client"

import Image from 'next/image';
import FavoriteButton from "@/src/components/favoriteButton"
import BackButton from "@/src/components/backButton"
import { useCart } from '@/lib/contexts/cartContext';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProductType } from '@/lib/types/Product';
import { Progress } from '@/components/ui/progress';
import { ShoppingCart } from 'lucide-react';
import Footer from '@/src/components/footer';
import ProductCard from '@/src/components/productCard';

export default function ProductPage() {
    const params = useParams();
    const id = params.id as string;
    const [product, setProduct] = useState<ProductType | null>(null);
    const router = useRouter();
    const { addToCart, clearCart } = useCart();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cartAlert, setCartAlert] = useState(false);
    const [progressValue, setProgressValue] = useState(0)
    const [artistProducts, setArtistProducts] = useState<ProductType[] | null>(null);

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
                    setError('Ocorreu um erro desconhecido.');
                }
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    useEffect(() => {
        async function fetchArtistProducts(){
            if (!product?.artist) return;
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/catalogo/artistas/${product?.artist.toLowerCase()}`)
    
                if(!res.ok){
                    throw new Error(`Erro HTTP: ${res.status}`);
                }

                const artistProductsData = await res.json();
                setArtistProducts(artistProductsData.products);
            } catch(error){
                if(error instanceof Error){
                    setError(error.message);
                } else{
                    setError('Ocorreu um erro desconhecido.');
                }
            }
        }
        fetchArtistProducts();
    }, [product?.artist]);

    const handleAddToCart = () => {
        if (!product) return;
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

    const handleBuyNow = () => {
        if (!product) return;
        clearCart();
        
        addToCart({
            _id: product._id,
            title: product.title,
            artist: product.artist,
            price: product.price,
            img: product.img,
            quantity: 1,
            edition: product.edition
        });
        
        router.push('/carrinho/pagamento');
    }

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

    console.log(product.img)

    return (
        <>
        <main className='pb-49 md:pb-27'>
            <div className="mt-20 lg:mt-36 xl:mt-36 px-2 md:px-12 lg:px-30 xl:px-70 bg-cover w-full relative md:flex md:gap-4 xl:p-6 backdrop-blur-sm border-b border-neutral-600 xl:min-h-150 items-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm -z-10 xl:min-h-150" style={{
                    backgroundImage: `url(${product.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(8px) brightness(0.17)'}}></div>
                <Image 
                    src={product.img} 
                    alt="album cover" 
                    className="w-full max-w-100 md:max-w-none mx-auto md:mx-0 rounded-[12px] border-2 border-neutral-500 aspect-square md:w-fit md:h-fit lg:w-100 lg:mr-5 my-3" 
                    width={300} 
                    height={300}
                    priority
                />
                <div className=' md:flex md:flex-col md:justify-between mb-8 md:min-h-93 mx-2 mt-7'>
                    <div className='flex gap-3'>
                        <div className=''>
                            <h1 className=' text-neutral-200 text-2xl max-w-100 md:w-fit md:text-xl xl:text-3xl font-bold'>{product.title}</h1>
                            <h2 className='font-light text-neutral-400 py-1 md:text-neutral-300 xl:text-lg'>{product.artist}</h2>
                            <p className='text-wrap text-sm text-nme text-[#CECECE]'><span className='text-neutral-300 text-lg text-bold'>{product.year}</span></p>
                        </div>
                        <FavoriteButton product={product} />
                    </div>
                        <div className='flex flex-col w-fit gap-2 font-extralight text-neutral-400 mb-auto'>
                            <div className='flex items-center gap-1'>
                                <Image 
                                    src="/rating.png" 
                                    alt="rating" 
                                    width={100} 
                                    height={24} 
                                    className='max-h-fit xl:w-24 pb-1'
                                />
                                <p className='text-wrap text-sm text-[#CECECE]'><span className='text-neutral-200 text-bold'>4.8 </span>- 231 avaliações</p>
                            </div>
                            <div className='flex mb-auto gap-1'>
                                {product.genre?.map(genre => 
                                    <p key={genre} className='text-sm font-extralight text-neutral-300 bg-[#191919] p-1 px-2 rounded-md border border-neutral-700'>{genre}</p>
                                )}
                            </div>
                        </div>
                    <div className='flex relative items-center justify-between md:justify-normal md:flex-col md:items-start'>
                        {product.edition === "Deluxe" && 
                        <div className='absolute bg-amber-400 top-1 -right-3 m-3 md:static md:w-fit md:h-fit md:mb-4 md:mx-0 md:border-2 md:py-2 md:border-yellow-50 md:px-2 text-black font-bold flex items-center gap-1 p-1 border-1 border-black px-2  rounded-md text-sm tracking-tight'>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="black"/>
                            </svg>DELUXE
                        </div>}
                        {product.edition === "Exclusive" && 
                        <div className='absolute bg-purple-700 top-1 -right-3 m-3 md:static md:w-fit md:h-fit md:mb-4 md:mx-0 md:border-2 md:py-2 md:border-purple-200 md:px-2 font-bold flex items-center gap-1 p-1 border border-black text-purple-100 text-sm rounded-md tracking-tight'>
                            <svg width="18" height="18" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z" fill="oklch(94.6% 0.033 307.174)"/>
                            </svg>EXCLUSIVO
                        </div>}
                        <p className='text-3xl font-extrabold text-white text-right md:text-left mt-3'>R$ {product.price.toFixed(2)}</p>
                    <div className='flex gap-2 md:flex-col lg:flex-row'>
                        <button className='bg-white border-2 transition-all hover:scale-95 border-neutral-500 p-3 hidden truncate rounded-full text-black text-lg font-extrabold md:flex md:mt-3 gap-3 px-4 md:rounded-md shadow-md shadow-neutral-950 active:scale-95 active:bg-blue-600 cursor-pointer hover:bg-neutral-400' onClick={handleAddToCart}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1.5H5L7.68 14.89C7.77144 15.3504 8.02191 15.764 8.38755 16.0583C8.75318 16.3526 9.2107 16.509 9.68 16.5H19.4C19.8693 16.509 20.3268 16.3526 20.6925 16.0583C21.0581 15.764 21.3086 15.3504 21.4 14.89L23 6.5H6M10 21.5C10 22.0523 9.55228 22.5 9 22.5C8.44772 22.5 8 22.0523 8 21.5C8 20.9477 8.44772 20.5 9 20.5C9.55228 20.5 10 20.9477 10 21.5ZM21 21.5C21 22.0523 20.5523 22.5 20 22.5C19.4477 22.5 19 22.0523 19 21.5C19 20.9477 19.4477 20.5 20 20.5C20.5523 20.5 21 20.9477 21 21.5Z" 
                                    stroke="black" 
                                    strokeWidth="3" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Adicionar ao Carrinho
                        </button>
                        <button 
                        className='bg-black border-2 transition-all hover:scale-95 border-white p-3 hidden truncate rounded-full text-white text-lg font-extrabold md:flex md:mt-3 gap-3 px-4 md:rounded-md shadow-md shadow-neutral-950 active:scale-95 active:bg-blue-600 cursor-pointer hover:bg-neutral-700' 
                        onClick={handleBuyNow}
                    >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1.5H5L7.68 14.89C7.77144 15.3504 8.02191 15.764 8.38755 16.0583C8.75318 16.3526 9.2107 16.509 9.68 16.5H19.4C19.8693 16.509 20.3268 16.3526 20.6925 16.0583C21.0581 15.764 21.3086 15.3504 21.4 14.89L23 6.5H6M10 21.5C10 22.0523 9.55228 22.5 9 22.5C8.44772 22.5 8 22.0523 8 21.5C8 20.9477 8.44772 20.5 9 20.5C9.55228 20.5 10 20.9477 10 21.5ZM21 21.5C21 22.0523 20.5523 22.5 20 22.5C19.4477 22.5 19 22.0523 19 21.5C19 20.9477 19.4477 20.5 20 20.5C20.5523 20.5 21 20.9477 21 21.5Z" 
                                    stroke="white" 
                                    strokeWidth="3" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Comprar Agora
                        </button>
                    </div>
                    </div>
                </div>
            </div>

                <section className='mt-10 md:px-12 border-neutral-700 xl:border-none pt-5 mx-4 md:mt-15 xl:mx-70 flex flex-col md:flex-row gap-20'>
                    <div className='md:border-r border-neutral-700 md:pr-20'>
                        <h3 className='font-bold text-white text-2xl flex gap-2 items-center'>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.0059 10H2.00586M18.0059 18H2.00586M6.00586 2H2.00586" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            DESCRIÇÃO</h3>

                        <p className='text-xl font-light text-[#CECECE] leading-[30px] whitespace-pre-line mt-12 md:max-w-[50vw]'>{product.description.info}</p>
                    </div>
                    <div className='w-[50vw]'>
                        <h3 className='font-bold text-white text-2xl flex gap-1 items-center'>
                            <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.2559 22.75C10.0184 22.75 8.95899 22.3257 8.07774 21.4771C7.19648 20.6285 6.75586 19.6083 6.75586 18.4167C6.75586 17.225 7.19648 16.2049 8.07774 15.3562C8.95899 14.5076 10.0184 14.0833 11.2559 14.0833C11.6871 14.0833 12.0809 14.1375 12.4371 14.2458C12.8121 14.3361 13.1684 14.4806 13.5059 14.6792V3.25H20.2559V7.58333H15.7559V18.4167C15.7559 19.6083 15.3152 20.6285 14.434 21.4771C13.5527 22.3257 12.4934 22.75 11.2559 22.75Z" fill="white"/>
                            </svg>
                            TRACKLIST
                            </h3>

                        <p className='text-neutral-400 leading-5 whitespace-pre-line mt-12'>{}</p>
                        {product.description.tracklist.map((side, sideIndex) => (
                            <div key={sideIndex} className='text-xl font-light text-[#CECECE] leading-[30px] whitespace-pre-line mt-12'>
                                <h4 className='font-bold text-xl text-[#CECECE]'>{side.title}</h4>
                                <ol>
                                    {side.tracks.map((track, trackIndex) => (
                                        <li key={trackIndex} className="flex gap-2">
                                            <span className="">{trackIndex + 1}.</span>
                                            <span className="">{track}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        ))}
                    </div>
                </section>
                
                {(artistProducts && artistProducts.length > 1 && artistProducts.length < 7) && 
                    <section className='mt-10 border-t border-neutral-700 xl:border-none pt-5 mx-4 md:mt-15 xl:mx-20 xl:ml-70 2xl:mx-70'>
                        <h3 className='font-bold text-white text-2xl flex gap-1 items-center pb-8 pt-3'>MAIS DE {product.artist.toUpperCase()}</h3>
                        <section className={`md:mt-5 pb-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-3 lg:gap-4 justify-items-center`}>
                            {artistProducts && artistProducts.map((artistProduct: ProductType) => {
                            if(artistProduct._id !== product._id){
                                return(<ProductCard _id={artistProduct._id} key={artistProduct._id} artist={artistProduct.artist} title={artistProduct.title} price={artistProduct.price} img={artistProduct.img} edition={artistProduct.edition}/>)
                            }
                            }
                            )}
                        </section>
                    </section>
                }
            
            <div className='fixed bottom-21 bg-[#131313] border-t border-t-neutral-600 rounded-t-2xl items-center h-21 w-full z-20 p-5 flex justify-between md:hidden'>
                <p className='text-3xl font-bold text-white'>R$ {product.price.toFixed(2)}</p>
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
                <div className='fixed bottom-40 md:bottom-20 right-0 h-fit rounded-md z-40 bg-neutral-950 border m-3 w-fit shadow-lg shadow-[#050505]'>
                    <Progress value={progressValue} className=" rounded-none rounded-t-md border-b"/>
                    <div className='gap-3 p-3 flex justify-center items-center'>
                        <ShoppingCart/>
                        <p className='md:text-lg'>Produto adicionado ao carrinho.</p>
                    </div>
                </div>
            )}
        </main>
        <Footer/>
        </>
    )
}