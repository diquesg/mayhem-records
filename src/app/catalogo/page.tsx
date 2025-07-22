"use client"
import { ProductType } from '@/lib/types/Product';
import { useEffect, useState } from 'react';
import ProductCard from '@/src/components/productCard';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function Catalogo() {
  const [triggerLabel, setTriggerLabel] = useState('CATÁLOGO');
  const [products, setProducts] = useState<ProductType[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [artistsList, setArtistsList] = useState<string[]>([]);
  const [selectedArtist, setSelectedArtist] = useState('');
  const [genresList, setGenresList] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(18);
  const [activeFilter, setActiveFilter] = useState<{ type: 'all' | 'artist' | 'genre', value: string }>({ type: 'all', value: '' });

  const getProducts = async (page = 1, filter = activeFilter) => {
    setIsLoading(true);
    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/api/catalogo?page=${page}&limit=${limit}`;

      if (filter.type === 'artist') {
        url = `${process.env.NEXT_PUBLIC_API_URL}/api/catalogo/artistas/${filter.value}?page=${page}&limit=${limit}`;
      } else if (filter.type === 'genre') {
        url = `${process.env.NEXT_PUBLIC_API_URL}/api/catalogo/generos/${filter.value}?page=${page}&limit=${limit}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.products);
      setTotalProducts(data.total);
      setCurrentPage(page);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getArtists = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/catalogo/artistas`);
      const list = await res.json();
      setArtistsList(list);
      setTriggerLabel('ARTISTAS');
      setGenresList([]);
      setSelectedGenre('');
    } catch (err) {
      console.error('Erro ao buscar artistas:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getGenres = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/catalogo/generos`);
      const list = await res.json();
      setGenresList(list);
      setTriggerLabel('GÊNEROS');
      setArtistsList([]);
      setSelectedArtist('');
    } catch (err) {
      console.error('Erro ao buscar gêneros:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts(1, { type: 'all', value: '' });
    setActiveFilter({ type: 'all', value: '' });
  }, []);

  useEffect(() => {
    if (selectedArtist !== '') {
      const filter = { type: 'artist' as const, value: selectedArtist };
      setActiveFilter(filter);
      getProducts(1, filter);
    }
  }, [selectedArtist]);

  useEffect(() => {
    if (selectedGenre !== '') {
      const filter = { type: 'genre' as const, value: selectedGenre };
      setActiveFilter(filter);
      getProducts(1, filter);
    }
  }, [selectedGenre]);

  return (
    <main className="mb-23 lg:mx-30 xl:mx-70">
      <div className="pt-16 border-b lg:border-none">
        <Image src="/catalog-banner.png" alt="banner do catálogo" width={1920} height={752} className='border-b border-neutral-800 lg:border-none' />
        <section className='m-3 lg:flex lg:justify-between lg:items-baseline lg:gap-3'>
          <div className='flex items-baseline gap-3 py-1 justify-between'>
            <DropdownMenu>
              <DropdownMenuTrigger className='flex gap-2 text-lg'>{triggerLabel}
                <svg width="10" viewBox="0 0 34 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.1213 19.3787C17.9497 20.5503 16.0503 20.5503 14.8787 19.3787L1.12132 5.62132C-0.768574 3.73143 0.569926 0.5 3.24264 0.5H30.7574C33.4301 0.5 34.7686 3.73143 32.8787 5.62132L19.1213 19.3787Z" fill="#C2C2C2" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=''>
                <DropdownMenuItem onClick={() => {
                  setSelectedArtist('');
                  setSelectedGenre('');
                  setActiveFilter({ type: 'all', value: '' });
                  getProducts(1, { type: 'all', value: '' });
                  setTriggerLabel('CATÁLOGO');
                  setArtistsList([]);
                  setGenresList([]);
                }}>Catálogo</DropdownMenuItem>
                <DropdownMenuItem onClick={getArtists}>Artistas</DropdownMenuItem>
                <DropdownMenuItem onClick={getGenres}>Gêneros</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <p className='text-sm text-neutral-500 font-light lg:hidden'>Exibindo {products.length} de {totalProducts} álbuns.</p>
          </div>

          {artistsList.length > 0 &&
            <div className='pt-3 pb-1 md:w-70 lg:mr-auto'>
              <Select onValueChange={setSelectedArtist} value={selectedArtist}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecionar artista" />
                </SelectTrigger>
                <SelectContent className='max-h-60 overflow-y-auto'>
                  {artistsList.map((artist) => (
                    <SelectItem key={artist} value={artist}>{artist}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          }

          {genresList.length > 0 &&
            <div className='pt-3 pb-1 md:w-70 lg:mr-auto'>
              <Select onValueChange={setSelectedGenre} value={selectedGenre}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecionar gênero" />
                </SelectTrigger>
                <SelectContent className='max-h-60 overflow-y-auto'>
                  {genresList.map((genre) => (
                    <SelectItem key={genre} value={genre}>{genre.slice(0, 1).toUpperCase() + genre.slice(1)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          }
          <p className='text-sm text-neutral-500 font-light hidden lg:block'>Exibindo {products.length} de {totalProducts} álbuns.</p>
        </section>
      </div>

      <section className={`m-3 md:mt-5 pb-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3 lg:gap-4 justify-items-center ${isLoading ? 'opacity-50' : ''}`}>
        {products.map((product: ProductType) => (
          <ProductCard key={product._id} title={product.title} _id={product._id} img={product.img} artist={product.artist} price={product.price} edition={product.edition} />
        ))}
      </section>

      {totalProducts > limit && (
        <div className="flex justify-between m-3 items-center gap-3 pb-4">
          <button
            className="px-3 py-1 border border-neutral-500 rounded-full active:bg-neutral-800 hover:bg-neutral-800 disabled:opacity-40"
            disabled={currentPage === 1}
            onClick={() => getProducts(currentPage - 1, activeFilter)}
          >
            Anterior
          </button>
          <span className="text-sm text-neutral-400">Página {currentPage} de {Math.ceil(totalProducts / limit)}</span>
          <button
            className="px-3 py-1 border border-neutral-500 rounded-full active:bg-neutral-800 hover:bg-neutral-800 disabled:opacity-40"
            disabled={currentPage === Math.ceil(totalProducts / limit)}
            onClick={() => getProducts(currentPage + 1, activeFilter)}
          >
            Próxima
          </button>
        </div>
      )}
    </main>
  );
}
