"use client"
import { ProductType } from '@/lib/types/Product';
import { FormEvent, useEffect, useState } from 'react';
import ProductCard from '@/src/components/productCard';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from 'lucide-react';
import Footer from '@/src/components/footer';



type SortType = 'price' | 'relevance' | 'sales';
type SortDirection = 'normal' | 'asc' | 'desc';



export default function Catalogo() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [artistProducts, setArtistProducts] = useState([]);
  const [genreProducts, setGenreProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [artistsList, setArtistsList] = useState<string[]>([]);
  const [selectedArtist, setSelectedArtist] = useState('Arctic Monkeys');
  const [genresList, setGenresList] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSort, setActiveSort] = useState<SortType | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('normal');

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(12);

  const fetchProducts = async (page: number) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
      ...(query.trim() && { query: query.trim() }),
      ...(activeSort && { sort: `${activeSort}_${sortDirection}` }),
      page: page.toString(),
      limit: limit.toString()
    });
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/busca?${params}`);

      if (!res.ok) {
        throw new Error('Erro na busca');
      }
              
      const data = await res.json();
      setProducts(data.products);
      setTotalProducts(data.pagination.totalItems);
      setCurrentPage(page);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setIsLoading(false);
    }
  }
          
      async function handleSearch(e: FormEvent) {
        e.preventDefault();
        fetchProducts(1);
      }
  
    useEffect(() => {
        fetchProducts(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, activeSort, sortDirection, currentPage]);
  
    
    const toggleSort = (type: SortType) => {
      if(activeSort !== type){
        setActiveSort(type);
        setSortDirection('desc');
      } else{
        setSortDirection(prevState => {
          if(prevState === 'normal') return 'desc';
          if(prevState === 'desc') return 'asc';
          return 'normal';
        });
      }
    }


  const getArtistProducts = async (page = 1) => {
    setIsLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/catalogo/artistas/${selectedArtist}?page=${page}&limit=${limit}`;
      const res = await fetch(url);
      const data = await res.json();
      setArtistProducts(data.products);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getGenreProducts = async (page = 1) => {
    setIsLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/catalogo/generos/${selectedGenre}?page=${page}&limit=${limit}`;
      const res = await fetch(url);
      const data = await res.json();
      setGenreProducts(data.products);
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
      setSelectedArtist(list[0])
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
      setSelectedGenre(list[0]);
      setSelectedArtist('');
    } catch (err) {
      console.error('Erro ao buscar gêneros:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
    getArtists();
    getGenres();
  }, []);

  useEffect(() => {
    if (selectedArtist !== '') {
      getArtistProducts(1);
    }
  }, [selectedArtist]);

  useEffect(() => {
    if (selectedGenre !== '') {
      getGenreProducts(1);
    }
  }, [selectedGenre]);
  

  return (
    <>
    <main className="mb-23">
      <div className="pt-16 lg:pt-36 border-b lg:border-none">

        <Image src="/catalog-banner.png" alt="banner do catálogo" width={1920} height={752} style={{ objectFit: 'cover', objectPosition: '30% 50%' }} className='border-b border-neutral-700 h-40 md:h-fit' />

        <section className='lg:mx-4 xl:px-30 2xl:px-60 m-3 lg:justify-between lg:items-baseline lg:gap-3'>
          <div className='flex flex-col md:flex-row md:items-center gap-3 pt-8 pb-0 items-start md:justify-between'>
            <span className='flex gap-2 items-center justify-between'>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 31C24.2843 31 31 24.2843 31 16C31 7.71573 24.2843 1 16 1C7.71573 1 1 7.71573 1 16C1 24.2843 7.71573 31 16 31Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 20.5C18.4853 20.5 20.5 18.4853 20.5 16C20.5 13.5147 18.4853 11.5 16 11.5C13.5147 11.5 11.5 13.5147 11.5 16C11.5 18.4853 13.5147 20.5 16 20.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h1 className='text-3xl font-normal text-white'>CATÁLOGO</h1>
            </span>
            <form onSubmit={e => {
                handleSearch(e);
              }}
              className="w-full md:max-w-120 h-18 flex items-center py-3 gap-2">
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="O que você quer ouvir?"
                className={`border bg-black rounded-full xl:rounded-lg w-full max-h-full p-5 text-neutral-300 border-neutral-700`}
              />
              <button type="submit" className='relative bg-blue-600 rounded-full h-fit p-2 active:bg-blue-400 cursor-pointer'><Search size={16} /></button>
            </form>
          </div>

          <span className='flex flex-row-reverse justify-end lg:justify-between items-center mt-5 mb-6'>
            <p className='text-sm text-neutral-500 font-light hidden lg:block'>Exibindo {products.length} de {totalProducts} álbuns.</p>
            <div className="flex gap-3 bg-[#131313] h-fit border-neutral-800">
            
            
              <button onClick={() => toggleSort('relevance')} className={`rounded-full flex items-center gap-2 cursor-pointer ${products.length < 2 ? "opacity-50 cursor-not-allowed" : ""}`} disabled={products.length < 2}>

                <span>
                  {sortDirection === 'normal' || activeSort !== 'relevance' ? <svg width={10} viewBox="0 0 34 21" fill="none" xmlns="http://www.w3.org/2000/svg" className=''> <path d="M19.1213 19.3787C17.9497 20.5503 16.0503 20.5503 14.8787 19.3787L1.12132 5.62132C-0.768574 3.73143 0.569926 0.5 3.24264 0.5H30.7574C33.4301 0.5 34.7686 3.73143 32.8787 5.62132L19.1213 19.3787Z" fill="#C2C2C2"/></svg> : ''}


                  {(sortDirection === 'desc' && activeSort === 'relevance') && <svg width={10} viewBox="0 0 34 21" fill="none" xmlns="http://www.w3.org/2000/svg" className=''>
                      <path className='fill-blue-500' d="M19.1213 19.3787C17.9497 20.5503 16.0503 20.5503 14.8787 19.3787L1.12132 5.62132C-0.768574 3.73143 0.569926 0.5 3.24264 0.5H30.7574C33.4301 0.5 34.7686 3.73143 32.8787 5.62132L19.1213 19.3787Z" fill="#C2C2C2"/>
                    </svg>}

                  {(sortDirection === 'asc' && activeSort === 'relevance') && <svg width={10} viewBox="0 0 34 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path className='fill-blue-500' d="M19.1213 1.62132C17.9497 0.449749 16.0503 0.449748 14.8787 1.62132L1.12132 15.3787C-0.768574 17.2686 0.569926 20.5 3.24264 20.5H30.7574C33.4301 20.5 34.7686 17.2686 32.8787 15.3787L19.1213 1.62132Z" fill="#C2C2C2"/>
                    </svg>}

                </span>

                <span className={`${sortDirection !== 'normal' && activeSort === 'relevance' ? "text-blue-500" : ""}`}>Relevância</span>

              </button>


              <button onClick={() => toggleSort('price')} className={`p-1 rounded-full flex items-center gap-2 cursor-pointer ${products.length < 2 ? "opacity-50 cursor-not-allowed" : ""}`} disabled={products.length < 2}>

                <span className="text-sm">

                  {sortDirection === 'normal' || activeSort !== 'price' ? <svg width={10} viewBox="0 0 34 21" fill="none" xmlns="http://www.w3.org/2000/svg" className=''> <path d="M19.1213 19.3787C17.9497 20.5503 16.0503 20.5503 14.8787 19.3787L1.12132 5.62132C-0.768574 3.73143 0.569926 0.5 3.24264 0.5H30.7574C33.4301 0.5 34.7686 3.73143 32.8787 5.62132L19.1213 19.3787Z" fill="#C2C2C2"/></svg> : ''}

                  {(sortDirection === 'desc' && activeSort === 'price') && <svg width={10} viewBox="0 0 34 21" fill="none" xmlns="http://www.w3.org/2000/svg" className=''>
                      <path className='fill-blue-500' d="M19.1213 19.3787C17.9497 20.5503 16.0503 20.5503 14.8787 19.3787L1.12132 5.62132C-0.768574 3.73143 0.569926 0.5 3.24264 0.5H30.7574C33.4301 0.5 34.7686 3.73143 32.8787 5.62132L19.1213 19.3787Z" fill="#C2C2C2"/>
                    </svg>}

                  {(sortDirection === 'asc' && (activeSort === 'price')) && <svg width={10} viewBox="0 0 34 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path className='fill-blue-500' d="M19.1213 1.62132C17.9497 0.449749 16.0503 0.449748 14.8787 1.62132L1.12132 15.3787C-0.768574 17.2686 0.569926 20.5 3.24264 20.5H30.7574C33.4301 20.5 34.7686 17.2686 32.8787 15.3787L19.1213 1.62132Z" fill="#C2C2C2"/>
                    </svg>}

                </span>

                <span className={`${sortDirection !== 'normal' && activeSort === 'price' ? "text-blue-500" : ""}`}>Preço</span>

              </button>

              <button onClick={() => toggleSort('sales')} className={`p-1 rounded-full flex items-center gap-2 cursor-pointer ${products.length < 2 ? "opacity-50 cursor-not-allowed" : ""}`} disabled={products.length < 2}>

                <span className="text-sm">

                  {sortDirection === 'normal' || activeSort !== 'sales' ? <svg width={10} viewBox="0 0 34 21" fill="none" xmlns="http://www.w3.org/2000/svg" className=''> <path d="M19.1213 19.3787C17.9497 20.5503 16.0503 20.5503 14.8787 19.3787L1.12132 5.62132C-0.768574 3.73143 0.569926 0.5 3.24264 0.5H30.7574C33.4301 0.5 34.7686 3.73143 32.8787 5.62132L19.1213 19.3787Z" fill="#C2C2C2"/></svg> : ''}

                  {(sortDirection === 'desc' && activeSort === 'sales') && <svg width={10} viewBox="0 0 34 21" fill="none" xmlns="http://www.w3.org/2000/svg" className=''>
                      <path className='fill-blue-500' d="M19.1213 19.3787C17.9497 20.5503 16.0503 20.5503 14.8787 19.3787L1.12132 5.62132C-0.768574 3.73143 0.569926 0.5 3.24264 0.5H30.7574C33.4301 0.5 34.7686 3.73143 32.8787 5.62132L19.1213 19.3787Z" fill="#C2C2C2"/>
                    </svg>}

                  {(sortDirection === 'asc' && (activeSort === 'sales')) && <svg width={10} viewBox="0 0 34 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path className='fill-blue-500' d="M19.1213 1.62132C17.9497 0.449749 16.0503 0.449748 14.8787 1.62132L1.12132 15.3787C-0.768574 17.2686 0.569926 20.5 3.24264 20.5H30.7574C33.4301 20.5 34.7686 17.2686 32.8787 15.3787L19.1213 1.62132Z" fill="#C2C2C2"/>
                    </svg>}

                </span>

                <span className={`${sortDirection !== 'normal' && activeSort === 'sales' ? "text-blue-500" : ""}`}>Mais vendidos</span>

              </button>

            </div>
          </span>
          <section className={`md:mt-5 transition-all pb-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-3 lg:gap-4 justify-items-center ${isLoading ? 'opacity-50' : ''}`}>
            {products.map((product: ProductType) => (
              <ProductCard key={product._id} title={product.title} _id={product._id} img={product.img} artist={product.artist} price={product.price} edition={product.edition} />
            ))}
          </section>
        {totalProducts > limit && (
          <div className="flex justify-between mt-5 bg-neutral-900 items-center gap-3 px-6 py-4 rounded-lg border border-neutral-700">
            <button
              className="px-3 py-1 border border-neutral-500 rounded-full active:bg-neutral-800 hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              disabled={currentPage === 1}
              onClick={() => fetchProducts(currentPage - 1)}
            >
              Anterior
            </button>

            <button
              className="px-3 py-1 border border-neutral-500 rounded-full active:bg-neutral-800 hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              disabled={currentPage === Math.ceil(totalProducts / limit)}
              onClick={() => fetchProducts(currentPage + 1)}
            >
              Próxima
            </button>
          </div>
        )}
        </section>
      </div>


      
      <section className='px-3 lg:px-4 xl:px-30 2xl:px-60 lg:justify-between mt-10 lg:items-baseline lg:gap-3 pb-16 bg-[#090909]'>
          <div className='flex items-center gap-3 pt-16 pb-0 justify-between'>
            <span className='flex gap-2 items-center justify-between pb-4 pt-7'>

              <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.9725 24L7.085 15.1263L0 9.15789L9.36 8.36842L13 0L16.64 8.36842L26 9.15789L18.915 15.1263L21.0275 24L13 19.2947L4.9725 24Z" fill="white"/>
              </svg>

              <h1 className='text-xl md:text-2xl font-semibold text-white'>PARA FÃS DE</h1>

              <div className='md:w-fit mx-1'>
                <Select onValueChange={setSelectedArtist} value={selectedArtist}>
                  <SelectTrigger className="w-full text-sm md:text-md py-5">
                    <SelectValue placeholder="Selecionar artista" />
                  </SelectTrigger>
                  <SelectContent className='max-h-60 overflow-y-auto'>
                    {artistsList.map((artist) => (
                      <SelectItem key={artist} value={artist}>{artist}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
                    
            </span>
          </div>
          <section className={`md:mt-5 pb-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-3 lg:gap-4 justify-items-center ${isLoading ? 'opacity-50' : ''}`}>
            {artistProducts.map((product: ProductType) => (
              <ProductCard key={product._id} title={product.title} _id={product._id} img={product.img} artist={product.artist} price={product.price} edition={product.edition} />
            ))}
          </section>
      </section>


      <section className='px-3 lg:px-4 xl:px-30 2xl:px-60 lg:justify-between lg:items-baseline lg:gap-3'>
          <div className='flex items-center gap-3 pt-16 pb-0 justify-between'>
            <span className='flex gap-2 items-center justify-between pb-4 pt-7'>

              <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.9725 24L7.085 15.1263L0 9.15789L9.36 8.36842L13 0L16.64 8.36842L26 9.15789L18.915 15.1263L21.0275 24L13 19.2947L4.9725 24Z" fill="white"/>
              </svg>

              <h1 className='text-lg sm:text-2xl font-semibold text-white'>PARA OUVINTES DE</h1>

              <div className='md:w-fit mx-1'>
                <Select onValueChange={setSelectedGenre} value={selectedGenre}>
                  <SelectTrigger className="w-full text-sm sm:text-md py-5">
                    <SelectValue placeholder="Selecionar gênero" />
                  </SelectTrigger>
                  <SelectContent className='max-h-60 overflow-y-auto'>
                    {genresList.map((genre) => (
                      <SelectItem key={genre} value={genre}>{genre.slice(0, 1).toUpperCase() + genre.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
                    
            </span>
          </div>
          <section className={`md:mt-5 pb-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-3 lg:gap-4 justify-items-center ${isLoading ? 'opacity-50' : ''}`}>
            {genreProducts.map((product: ProductType) => (
              <ProductCard key={product._id} title={product.title} _id={product._id} img={product.img} artist={product.artist} price={product.price} edition={product.edition} />
            ))}
          </section>
      </section>
    </main>
    <Footer/>
    </>
  );
}
