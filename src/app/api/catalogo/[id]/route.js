import {NextResponse} from "next/server";
import connect from "@/lib/mongo.js";
import Product from "@/lib/models/Product";
import mongoose from "mongoose";


const ObjectId = mongoose.Types.ObjectId;

export const GET = async (request, {params}) => {
    try{
        await connect();

        const {id} = await params;
        console.log(id);

        if(ObjectId.isValid(id)){
            const productOfID = await Product.findById({_id: id});
            if(productOfID){
                return NextResponse.json(productOfID, {status: 200});
            } else{
                return new NextResponse("Product not found.", {status: 400});
            }
        } else{
            return new NextResponse("Product ID is invalid.", {status: 400});
        }

    } catch(error){
        return new NextResponse({message: "Error finding product. " + error.message}, {status: 500});
    }
}