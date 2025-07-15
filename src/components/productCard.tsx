
import { ProductType } from "@/lib/types/Product"
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps extends Pick<ProductType, 'title' | 'artist' | 'price' | 'img'> {
    _id: string; 
}

export default function ProductCard(props: ProductCardProps){
    return(
        <article className="border min-h-79 border-neutral-700 p-2 rounded-2xl sm:rounded-lg h-full flex flex-col shadow-md shadow-black w-full">
            <div>
                <div className="flex shrink">
                    <Image src={props.img} alt="album cover" className="w-full rounded-xl sm:rounded-md mb-2 border border-neutral-700 aspect-square" width={300} height={300}/>
                </div>
                <div className="flex flex-col grow">
                    <h1 className="text-md leading-5 font-light line-clamp-2">{props.title}</h1>
                    <p className="font-extralight text-sm pt-1">{props.artist}</p>
                </div>
            </div>
            <div className="flex justify-between items-center mt-auto mb-1">
                <p className="font-medium text-xl text-neutral-200">R$ {props.price}</p>
                <Link className="mt-1" href={`/catalogo/${props._id}`}><button className="bg-blue-600 px-5 rounded-xl h-8 cursor-pointer hover:bg-blue-700 hover:shadow-md shadow-black active:bg-blue-800 active:scale-90"><Image width={7} height={10} src="next-icon.svg" alt="go to button"/></button></Link>
            </div>
        </article>
    )
}