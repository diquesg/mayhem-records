"use client"
import { ProductType } from '@/lib/types/Product';
import { useEffect, useState } from 'react';
import ProductCard from '@/src/components/productCard';
import Image from 'next/image';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"

export default function Catalogo() {
  const [triggerLabel, setTriggerLabel] = useState('CATÁLOGO');
  const [products, setProducts] = useState<ProductType[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [artistsList, setArtistsList] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState('');
  const [genresList, setGenresList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/catalogo`);
      const products = await data.json();
      setProducts(products);
      setTotalProducts(products.length);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setIsLoading(false);
      setTriggerLabel('CATÁLOGO');
      setArtistsList([]);
      setSelectedArtist('');
      setGenresList([]);
      setSelectedGenre('');
    }
  }

  const getArtists = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/catalogo/artistas`);
      const artistsList = await data.json();
      setArtistsList(artistsList);
      setTriggerLabel('ARTISTAS');
      if (selectedArtist !== '') {
        const productsData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/catalogo/artistas/${selectedArtist}`);
        const products = await productsData.json();
        setProducts(products);
      }
      setGenresList([]);
      setSelectedGenre('');
    } catch (error) {
      console.error('Erro ao buscar artistas:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const getGenres = async () => {
    const listData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/catalogo/generos`);
    const genresList = await listData.json();
    setTriggerLabel('GÊNEROS');
    setGenresList(genresList);
    if(selectedGenre !== ''){
      const productsData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/catalogo/generos/${selectedGenre}`);
      const products = await productsData.json();
      setProducts(products);
    }
    setArtistsList([]);
    setSelectedArtist('');
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (selectedArtist !== '') {
      const fetchData = async () => {
        const productsData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/catalogo/artistas/${selectedArtist}`);
        const products = await productsData.json();
        setProducts(products);
      };
      fetchData();
    }
  }, [selectedArtist]);

  useEffect(() => {
    if (selectedGenre !== '') {
      const fetchData = async () => {
        const productsData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/catalogo/generos/${selectedGenre}`);
        const products = await productsData.json();
        setProducts(products);
      };
      fetchData();
    }
  }, [selectedGenre]);

  return (
    <main className="mb-23">
      <div className="pt-16 border-b">
        <Image src="/catalog-banner.png" alt="banner do catálogo" width={1920} height={752} className='border-b border-neutral-800'/>
        <section className='m-3'>
          <div className='flex items-baseline gap-3 py-1 justify-between'>
            <DropdownMenu>
              <DropdownMenuTrigger className='flex gap-2 text-lg'>{triggerLabel} 
                <svg width="10" viewBox="0 0 34 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.1213 19.3787C17.9497 20.5503 16.0503 20.5503 14.8787 19.3787L1.12132 5.62132C-0.768574 3.73143 0.569926 0.5 3.24264 0.5H30.7574C33.4301 0.5 34.7686 3.73143 32.8787 5.62132L19.1213 19.3787Z" fill="#C2C2C2"/>
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={getProducts}>Catálogo</DropdownMenuItem>
                <DropdownMenuItem onClick={getArtists}>Artistas</DropdownMenuItem>
                <DropdownMenuItem onClick={getGenres}>Gêneros</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <p className='text-sm text-neutral-500 font-light'>Exibindo {products.length} de {totalProducts} álbuns.</p>
        </div>
 
          {
            artistsList.length > 0 && 
            <div className='pt-3 pb-1'>
              <Select onValueChange={setSelectedArtist} value={selectedArtist}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecionar artista"/>
                </SelectTrigger>
                <SelectContent className='max-h-60 overflow-y-auto'>
                  {artistsList.length > 0 ? (artistsList.map((artist: string) => (
                      <SelectItem key={artist} value={artist}>{artist}</SelectItem>
                    ))) : (
                    <SelectItem value="none" disabled>Nenhum artista encontrado</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          }
          {
            genresList.length > 0 && 
            <div className='pt-3 pb-1'>
              <Select onValueChange={setSelectedGenre} value={selectedGenre}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecionar gênero"/>
                </SelectTrigger>
                <SelectContent className='max-h-60 overflow-y-auto'>
                  {genresList.length > 0 ? (genresList.map((genre: string) => (
                      <SelectItem key={genre} value={genre}>{genre.slice(0, 1).toUpperCase() + genre.slice(1)}</SelectItem>
                    ))) : (
                    <SelectItem value="none" disabled>Nenhum gênero encontrado</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          }
        </section>
      </div>
    <section className={`m-3 pb-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-3 lg:gap-4 justify-items-center ${isLoading ? 'opacity-50' : ''}`}>
      {products.map((product: ProductType) => (
        <ProductCard key={product._id} title={product.title} _id={product._id} img={product.img} artist={product.artist} price={product.price}/>
      ))}
    </section>
    </main>
  )
}