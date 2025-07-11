"use client"

import { FormEvent, useEffect, useState } from 'react';
import { ProductType } from '@/lib/types/Product';
import ProductCard from '@/src/components/productCard';
import { Search } from 'lucide-react';


type SortType = 'price' | 'relevance' | 'sales';
type SortDirection = 'normal' | 'asc' | 'desc';

export default function Busca() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [warning, setWarning] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [activeSort, setActiveSort] = useState<SortType | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('normal');

    const fetchProducts = async () => {
      if (!query.trim()) return;
      
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          query: query.trim(),
          ...(activeSort && { sort: `${activeSort}_${sortDirection}` }),
        });

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/busca?${params}`);
        if (!res.ok) throw new Error('Erro na busca');
        
        const data = await res.json();
        setProducts(data.products);
        setWarning(false);
      } catch (error) {
        console.error('Erro:', error);
        setWarning(true);
      } finally {
        setIsLoading(false);
      }
    };

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    fetchProducts();
  }

  useEffect(() => {
    if (query.trim()) {
      fetchProducts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, activeSort, sortDirection]);


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

  return (
    <main className='pt-19 pb-23'>
      <form onSubmit={handleSearch} className="z-20 fixed top-0 border-b w-full h-16 flex items-center p-3 gap-2 bg-[#0D0D0D] border-neutral-700">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="O que você quer ouvir hoje?"
          className={`border bg-black rounded-full w-full max-h-full p-5 text-neutral-300 border-neutral-700 ${warning === true ? "border-red-500" : ""}`}
        />
        <button type="submit" className='bg-blue-600 rounded-full h-fit p-2 active:bg-blue-400'><Search size={20} /></button>
      </form>
      
      <div className="flex gap-3 ml-3">
      
      
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
      
      <section className={`m-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-3 lg:gap-4 justify-items-center ${isLoading ? "opacity-50" : ""}`}>
        {
        products.map((product: ProductType) => <ProductCard key={product._id} title={product.title} artist={product.artist} img={product.img} price={product.price} _id={product._id}/>)
      }
      </section>
      {isLoading && (
        <div className="text-center py-10">
          <p>Carregando...</p>
        </div>
      )}
    </main>
  );
}
