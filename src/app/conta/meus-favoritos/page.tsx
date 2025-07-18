"use client";

import { useFavorites } from '@/lib/contexts/favoritesContext';
import ProductCard from '@/src/components/productCard';
import Link from 'next/link';
import BackButton from '@/src/components/backButton';
import { Heart, HeartCrack } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="container mt-19">
        <BackButton/>
        <div className='flex gap-2 fixed top-0 w-full justify-center my-4 z-20 text-xl text-white font-bold items-center'>
            <Heart strokeWidth={3}/>
            <h1>Meus Favoritos</h1>
        </div>
      {favorites.length === 0 ? (
        <div className="text-center mt-80 flex flex-col gap-1">
            <HeartCrack className='self-center' width={32} height={32}/>
            <h1 className="text-xl text-neutral-300 mb-1 font-bold">Nada encontrado!</h1>
            <p className="text-lg mb-2">Você ainda não tem favoritos.</p>
            <Link href="/catalogo" className="self-center border border-white text-white py-2 px-6 rounded-full hover:bg-neutral-700 active:bg-neutral-700 active:scale-95">Explorar Catálogo</Link>
            </div>
      ) : (
        <div className={`m-3 pb-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-3 lg:gap-4 justify-items-center`}>
          {favorites.map((product) => (
            <ProductCard key={product._id} _id={product._id} title={product.title} artist={product.artist} price={product.price} img={product.img} edition={product.edition} />
          ))}
        </div>
      )}
    </div>
  );
}