
import { ProductType } from "@/lib/types/Product"
import Image from "next/image";

interface ProductCardProps extends Pick<ProductType, 'title' | 'artist' | 'price' | 'img'> {
    _id: string; 
}

export default function ProductCard(props: ProductCardProps){
    return(
        <article className="border min-h-79 border-neutral-700 p-2 rounded-lg h-full flex flex-col shadow-lg shadow-neutral-950 w-full">
            <div>
                <div className="flex shrink">
                    <Image src={props.img} alt="album cover" className="w-full rounded-md mb-2 border border-neutral-700 aspect-square" width={300} height={300}/>
                </div>
                <div className="flex flex-col grow">
                    <h1 className="text-md leading-5 font-light line-clamp-2">{props.title}</h1>
                    <p className="font-extralight text-sm pt-1">{props.artist}</p>
                </div>
            </div>
            <div className="flex justify-between items-center mt-auto mb-1">
                <p className="font-medium text-xl text-neutral-200">R$ {props.price}</p>
                <button className="bg-blue-600 px-5 rounded-full h-8 cursor-pointer hover:bg-blue-700 hover:shadow-md shadow-black"><Image width={6} height={10} src="next-icon.svg" alt="go to button"/></button>
            </div>
        </article>
    )
}