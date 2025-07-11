import Link from "next/link";
import Carrossel from "../components/carrossel"
import { ProductType } from "@/lib/types/Product";
import ProductCard from "../components/productCard";

export default async function Home() {

  async function getProducts(){
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/catalogo`);
    return data.json();
  }

  const products = await getProducts();

  return (
    <main className="pt-16 mb-23 pb-1">
      <Carrossel/>
      <div className="flex py-4 px-6 justify-between text-sm">
        <p className="text-neutral-200 text-md font-normal">CATÁLOGO {">"} Destaques</p>
        <Link href="" className="text-blue-500 font-bold">VER TUDO</Link>
      </div>
      <section className="m-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-3 lg:gap-4 justify-items-center">
      {
        products.map((product: ProductType) => <ProductCard key={product._id} title={product.title} artist={product.artist} img={product.img} price={product.price} _id={product._id}/>)
      }
      </section>
    </main>
  )
}
