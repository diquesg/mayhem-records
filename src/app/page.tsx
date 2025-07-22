import Link from "next/link";
import Carrossel from "../components/carrossel"
import { ProductType } from "@/lib/types/Product";
import ProductCard from "../components/productCard";

export default async function Home() {

  async function getProducts(){
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/catalogo?page=1&limit=12`);
    const productsData = await data.json();
    console.log(productsData);
    return productsData.products;
  }

  const products = await getProducts();

  return (
    <main className="pt-16 mb-23 pb-1">
      <Carrossel/>
      <div className="flex p-3 justify-between text-sm items-center mt-0 py-5 border-y border-neutral-800">
        <p className="text-neutral-300 text-lg font-normal">CATÁLOGO {">"} Destaques</p>
        <Link href="/catalogo" className="text-blue-500 font-bold">VER TUDO</Link>
      </div>
      <section className="m-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl:mx-24 lg:mt-6 gap-3 sm:gap-3 lg:gap-6 justify-items-center">
      {
        products.map((product: ProductType) => <ProductCard key={product._id} title={product.title} artist={product.artist} img={product.img} price={product.price} _id={product._id} edition={product.edition}/>)
      }
      </section>
    </main>
  )
}
