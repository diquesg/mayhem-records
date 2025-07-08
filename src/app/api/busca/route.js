import {NextResponse} from "next/server";
import connect from "@/lib/mongo.js";
import Product from "@/lib/models/Product";



export const GET = async(request) => {
    
    await connect();

    const url = new URL(request.url);
    const search = url.searchParams.get('query');

    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 10;

    const offset = (page - 1) * limit;

    let query = {};
    if(search){
        query = { title: { $regex: search, $options: 'i' } };
    }

    const [products, total] = await Promise.all([
        Product.find(query)
        .skip(offset)
        .limit(limit),

        Product.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    try{
        if(products === null){
            return NextResponse.json({Error: "No results found."}, {status: 404});
        } else{
            return NextResponse.json({
                products,
                pagination: {
                    currentPage: page,
                    totalPages: totalPages,
                    totalItems: total,
                    itemsPerPage: limit
                }
            });
        }
    } catch (error) {
        return NextResponse.json({Error: error.message}, {status: 500})
    }
}