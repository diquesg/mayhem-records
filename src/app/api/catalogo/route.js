import { NextResponse } from "next/server";
import connect from "@/src/utils/mongo.js";
import Product from "@/src/types/ProductModel";
import mongoose from "mongoose";


const ObjectId = mongoose.Types.ObjectId;


export const GET = async (req) => {
  try {
    await connect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find().skip(skip).limit(limit),
      Product.countDocuments()
    ]);

    return NextResponse.json({ products, total }, { status: 200 });

  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Error fetching products", details: error.message }), { status: 500 });
  }
}

export const POST = async (request) => {
    try{
        await connect();
        const body = await request.json();
        const newProduct = new Product(body);
        await newProduct.save();
        return NextResponse.json({message:"New product created.", product: newProduct}, {status: 201});
    } catch(error){
        return new NextResponse("Error in creating product. " + error.message, {status: 500});
    }
}

export const PATCH = async (request) => {
    try{
        await connect();
        const body = await request.json();
        const {id} = body;
        if(!id){
            return new NextResponse("Product ID is required.", {status: 400});
        }
        if(!body){
            return new NextResponse("Product body is required.", {status: 400});
        } else {
            if(ObjectId.isValid(id)){
                const newProduct = await Product.findByIdAndUpdate(id, body, {new: true});
                return NextResponse.json({message: "Product updated.", product: newProduct}, {status: 200});
            } else if(!ObjectId.isValid(id)){
                return NextResponse("Invalid product ID.", {status: 400});
            }
        }
    } catch(error){
        return new NextResponse("Error in updating product. " + error.message, {status: 500});
    }
}

export const DELETE = async (request) => {
    try{
        await connect();
        const body = await request.json();
        const {id} = body;
        if(!id){
            return new NextResponse("Product ID is required.", {status: 400});
        } else if(!body){
            return new NextResponse("Product body is required.", {status: 400});
        } else{
            if(ObjectId.isValid(id)){
                const deletedProduct = await Product.findByIdAndDelete(id);
                if(deletedProduct){
                    return NextResponse.json({message: "Product deleted.", product: deletedProduct}, {status: 200});
                } else{
                    return new NextResponse("Product ID not found or already deleted.", {status: 400});
                }
            } else{
                return new NextResponse("Product ID is invalid.", {status: 400}); 
            }
        }
    } catch(error){
        return new NextResponse("Error in deleting product. " + error.message, {status: 500});
    }
}