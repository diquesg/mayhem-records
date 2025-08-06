"use client"

import { FormEvent, useEffect, useState } from 'react';
import { ProductType } from '@/lib/types/Product';
import ProductCard from '@/src/components/productCard';
import { Disc3, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSearchHistory } from '@/lib/contexts/searchHistoryContext';
import BackButton from '@/src/components/backButton';
import Footer from '@/src/components/footer';


type SortType = 'price' | 'relevance' | 'sales';
type SortDirection = 'normal' | 'asc' | 'desc';

export default function Busca() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToHistory } = useSearchHistory();
  
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<ProductType[]>([]);
  const [warning, setWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSort, setActiveSort] = useState<SortType | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('normal');
  const [totalProducts, setTotalProducts] = useState(0);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(12);


    const fetchProducts = async (page: number = 1) => {
      const searchQuery = debouncedQuery || query;
      
      if (!searchQuery.trim()){
        setWarning(true);
        return;
      }

      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          query: searchQuery.trim(),
          ...(activeSort && { sort: `${activeSort}_${sortDirection}` }),
          page: page.toString(),
          limit: limit.toString()
        });

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/busca?${params}`);
        if (!res.ok){
          throw new Error('Erro na busca');
        } 
          
        const data = await res.json();
        setProducts(data.products);
        setTotalProducts(data.pagination?.totalItems || data.products.length);
        setCurrentPage(page);
        
        addToHistory(searchQuery.trim());
      } catch (error) {
        console.error('Erro:', error);
        setWarning(true);
      } finally {
        setIsLoading(false);
      }
    };

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (!query.trim()) {
      setWarning(true);
      return;
    }
    
    const params = new URLSearchParams(searchParams);
    params.set('q', query);
    params.set('page', '1');
    router.push(`/busca?${params.toString()}`);
    fetchProducts(1);
  }
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        setDebouncedQuery(query);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const urlQuery = searchParams.get('q');
    const urlPage = searchParams.get('page');
    
    if (urlQuery && urlQuery !== query) {
      setQuery(urlQuery);
      setDebouncedQuery(urlQuery);
    }
    
    if (urlPage) {
      setCurrentPage(parseInt(urlPage));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      fetchProducts(currentPage);
      const params = new URLSearchParams(searchParams);
      params.set('q', debouncedQuery);
      if (!params.has('page')) {
        params.set('page', currentPage.toString());
      }
      router.push(`/busca?${params.toString()}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, activeSort, sortDirection, currentPage]);


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

    setCurrentPage(1);
    
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (debouncedQuery) {
      params.set('q', debouncedQuery);
    }
    router.push(`/busca?${params.toString()}`);
  }

  return (
    <>
    <main className='pt-16 lg:pt-36 pb-23'>
      <BackButton />
      
      <div className="border-b border-neutral-700 mb-6">
        <div className="px-4 md:px-12 xl:px-30 2xl:px-60 py-6 flex flex-col gap-4">
          
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 w-full md:max-w-120"
          >
            <input
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setWarning(false);
              }}
              placeholder="O que você quer ouvir hoje?"
              className={`border bg-black rounded-full w-full p-3 text-neutral-300 border-neutral-700 ${warning ? "border-red-500" : ""}`}
              autoFocus
            />
            <button type="submit" className='bg-blue-600 rounded-full h-fit p-3 active:bg-blue-400'>
              <Search size={20} />
            </button>
          </form>
        </div>
      </div>
      
      <div className="flex justify-between items-center px-4 md:px-12 xl:px-30 2xl:px-60 mb-4">
        {products.length > 0 && (
          <p className="text-lg text-neutral-400 font-light">
            Exibindo {products.length} de {totalProducts} resultados para &quot;{query}&quot;
          </p>
        )}
      </div>
      
      <div className="flex gap-3 px-4 md:px-12 xl:px-30 2xl:px-60 mb-6 bg-[#131313] h-fit">
      
      
        <button onClick={() => toggleSort('relevance')} className={`rounded-full flex items-center gap-2 ${products.length < 2 ? "opacity-50 cursor-not-allowed" : ""}`} disabled={products.length < 2}>

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


        <button onClick={() => toggleSort('price')} className={`p-1 rounded-full flex items-center gap-2 ${products.length < 2 ? "opacity-50 cursor-not-allowed" : ""}`} disabled={products.length < 2}>

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

        <button onClick={() => toggleSort('sales')} className={`p-1 rounded-full flex items-center gap-2 ${products.length < 2 ? "opacity-50 cursor-not-allowed" : ""}`} disabled={products.length < 2}>

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
      
      {products.length === 0 && !isLoading && (
        <div className='flex flex-col text-center items-center text-neutral-600 gap-4 w-full mt-20 mb-20'>
          <Disc3 width={60} height={60}/> 
          <p className='text-xl font-semibold'>Nenhum resultado encontrado</p>
          {query && <p className='text-neutral-400'>Não encontramos resultados para &quot;{query}&quot;</p>}
          {!query && <p className='text-lg font-semibold'>Pesquise seu álbum favorito!</p>}
        </div>
      )}
      
      <section className={`px-4 md:px-12 xl:px-30 2xl:px-60 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-3 lg:gap-4 justify-items-center ${isLoading ? "opacity-50" : ""}`}>
        {products.map((product: ProductType) => (
          <ProductCard 
            key={product._id} 
            title={product.title} 
            artist={product.artist} 
            img={product.img} 
            price={product.price} 
            _id={product._id} 
            edition={product.edition}
          />
        ))}
      </section>

      {totalProducts > limit && products.length > 0 && (
        <div className="flex justify-between mt-5 px-4 md:px-12 xl:px-30 2xl:px-60 bg-neutral-900 items-center gap-3 py-4 rounded-lg border border-neutral-700">
          <button
            className="px-3 py-1 border border-neutral-500 rounded-full active:bg-neutral-800 hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            disabled={currentPage === 1}
            onClick={() => {
              const newPage = currentPage - 1;
              fetchProducts(newPage);
              const params = new URLSearchParams(searchParams);
              params.set('page', newPage.toString());
              router.push(`/busca?${params.toString()}`);
            }}
          >
            Anterior
          </button>
          
          <span className="text-sm text-neutral-400">
            Página {currentPage} de {Math.ceil(totalProducts / limit)}
          </span>

          <button
            className="px-3 py-1 border border-neutral-500 rounded-full active:bg-neutral-800 hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            disabled={currentPage === Math.ceil(totalProducts / limit)}
            onClick={() => {
              const newPage = currentPage + 1;
              fetchProducts(newPage);
              const params = new URLSearchParams(searchParams);
              params.set('page', newPage.toString());
              router.push(`/busca?${params.toString()}`);
            }}
          >
            Próxima
          </button>
        </div>
      )}
      
      {isLoading && (
        <div className="text-center py-10 mb-10">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p>Carregando resultados...</p>
          </div>
        </div>
      )}
    </main>
    <Footer/>
    </>
  );
}
