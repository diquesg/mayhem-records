import Link from "next/link";
import Carrossel from "../components/ui/carrossel"
import { ProductType } from "@/src/types/Product";
import ProductCard from "../components/ui/productCard";
import Image from "next/image";
import { Libre_Caslon_Text } from "next/font/google";
import Footer from "../components/layout/footer";

  const LibreFont = Libre_Caslon_Text({
    weight: ["400", "700"],
    subsets: ["latin"]
  })

  export const dynamic = 'force-dynamic';

export default async function Home() {

  async function getProducts() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) throw new Error("API URL não configurada");
    
    const res = await fetch(`${apiUrl}/api/catalogo?page=1&limit=6`, {
      cache: 'no-store'
    });
    
    if (!res.ok) throw new Error("Falha ao buscar produtos");
    return await res.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    return { products: [] };
  }
}


  const {products} = await getProducts();

  return (
    <>
    <main className="pt-16 lg:pt-36">
      <Carrossel/>
      <section className="lg:mx-4 xl:mx-30 2xl:mx-60 mx-2">
        <div className="flex mt-10 lg:mt-17 mb-5 lg:mb-9 justify-between text-sm items-center border-neutral-800">
          <span className="flex gap-2 items-center">
            <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.9725 24L7.085 15.1263L0 9.15789L9.36 8.36842L13 0L16.64 8.36842L26 9.15789L18.915 15.1263L21.0275 24L13 19.2947L4.9725 24Z" fill="white"/>
            </svg>
            <h1 className="text-white letter-space tracking-wide text-xl lg:text-2xl font-medium">DISCOS EM DESTAQUE</h1>
          </span>
          <Link href="/catalogo" className="text-white text-md lg:text-lg underline font-normal">VER TUDO</Link>
        </div>
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-3 lg:gap-4 justify-items-center">
        {
          products.map((product: ProductType) => <ProductCard key={product._id} title={product.title} artist={product.artist} img={product.img} price={product.price} _id={product._id} edition={product.edition}/>)
        }
        </section>
      </section>

      <section className="px-2 md:px-12 xl:px-60 py-24 mt-20 bg-[url(/backgrounds/home-bg1.png)] bg-cover border-y border-neutral-700">
        <div className="flex justify-between text-sm items-center border-neutral-800">
          <span className="flex gap-2 items-center">
            <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.9725 24L7.085 15.1263L0 9.15789L9.36 8.36842L13 0L16.64 8.36842L26 9.15789L18.915 15.1263L21.0275 24L13 19.2947L4.9725 24Z" fill="white"/>
            </svg>
            <h1 className="text-white letter-space tracking-wide text-2xl font-medium">CURADORIA DA SEMANA</h1>
          </span>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-10 pt-12">
          <article className="">
            <Link href="/catalogo/6879db9d562724063199f1ea" className="flex flex-col md:flex-row gap-6 lg:gap-12 items-center hover:scale-103 active:scale-90 transition-all">
              <Image src="/images/curadoria1.png" alt="album cover" width={256} height={256} className="md:w-40 2xl:w-fit rounded-lg border border-neutral-500"/>
              <span className="max-w-90 flex flex-col gap-3 lg:gap-6">
                <h1 className={`text-2xl lg:text-3xl leading-11 ${LibreFont.className} text-white`}>“Um futuro pop eletrônico direto de 2009, ainda pulsante e imprevisível.”</h1>
                <p className="text-lg lg:text-xl text-neutral-400">— Curadoria Mayhem Records</p>
              </span>
            </Link>
          </article>
          <article className="flex flex-col md:flex-row gap-6 lg:gap-12 items-center">
            <Link href="/catalogo/6879d7cf51e7e99e4dab6017" className="flex flex-col md:flex-row gap-6 lg:gap-12 items-center hover:scale-103 active:scale-90 transition-all">
              <Image src="/images/curadoria2.png" alt="album cover" width={256} height={256} className="md:w-40 2xl:w-fit rounded-lg border border-neutral-500"/>
              <span className="max-w-90 flex flex-col gap-3 lg:gap-6">
                <h1 className={`text-2xl lg:text-3xl leading-11 ${LibreFont.className} text-white`}>“O álbum mais vendido da história. Um marco que moldou o som e a estética do pop para sempre.”</h1>
                <p className="text-lg lg:text-xl text-neutral-400">— Curadoria Mayhem Records</p>
              </span>
            </Link>
          </article>
        </div>
      </section>

      <section className="px-4 md:px-12 xl:px-60 py-24 lg:py-36 bg-[url(/backgrounds/home-bg2.png)] bg-cover">
        <div className="flex justify-between text-sm items-center border-neutral-800">
          <span className="flex gap-2 items-center">
            <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.9725 24L7.085 15.1263L0 9.15789L9.36 8.36842L13 0L16.64 8.36842L26 9.15789L18.915 15.1263L21.0275 24L13 19.2947L4.9725 24Z" fill="white"/>
            </svg>
            <h1 className="text-white letter-space tracking-wide text-2xl font-medium">NOSSOS PRODUTOS</h1>
          </span>
        </div>
        <div className="mt-16">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <Image src={"/images/home-img1.png"} alt="garota segurando disco" width={369} height={246} className="min-w-80"/>
            <span>
              <h1 className={`text-4xl ${LibreFont.className} text-white font-bold lg:max-w-120 leading-11`}>Mais do que produtos. Um propósito.</h1>
              <p className="max-w-174 text-xl text-[#C7C7C7] mt-6">Acreditamos que toda forma de expressão é válida, e que vestir, ouvir, decorar e consumir o que amamos é uma forma poderosa de contar ao mundo quem somos.</p>
            </span>
          </div>
          <div className="flex flex-col-reverse pb-12 lg:flex-row gap-6 items-center justify-between mt-16">
            <span>
              <h1 className={`text-4xl ${LibreFont.className} text-white font-bold max-w-120 leading-11`}>Embalagem personalizada.</h1>
              <p className="max-w-174 text-xl text-[#C7C7C7] mt-6">Cada pedido é embalado com todo o carinho e cuidado, em um pacote personalizado que carrega a estética da nossa loja.</p>
              <p className="max-w-174 text-xl text-[#C7C7C7] mt-6">Utilizamos materiais de qualidade que protegem o disco e ainda proporcionam uma experiência única ao receber seu pedido,  porque abrir um vinil deve ser tão especial quanto ouvi-lo. Junto do seu pedido, você também recebe um pequeno guia com dicas de conservação.</p>
            </span>
            <Image src={"/images/home-img2.png"} alt="garota segurando disco" width={376} height={376}/>
          </div>
        </div>
      </section>
    </main>
    <Footer/>
    </>
  )
}
