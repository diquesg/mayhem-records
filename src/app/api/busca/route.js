import { NextResponse } from "next/server";
import connect from "@/src/utils/mongo.js";
import Product from "@/src/types/ProductModel";



export const GET = async(request) => {
    
    await connect();

    const url = new URL(request.url);

    const search = url.searchParams.get('query');
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 10;

    const genre = url.searchParams.get('genre');
    const sort = url.searchParams.get('sort');

    const offset = (page - 1) * limit;

    let query = {};
    if(genre) query.genre = genre;
    if(search) query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { artist: { $regex: search, $options: 'i' } }
    ];

    let sortOptions = {};
    if(sort === 'price_asc') sortOptions = {price: 1};
    if(sort === 'price_desc') sortOptions = {price: -1};
    if(sort === 'relevance_asc') sortOptions = {year: 1};
    if(sort === 'relevance_desc') sortOptions = {year: -1};
    if(sort === 'sales_asc') sortOptions = {sales: 1};
    if(sort === 'sales_desc') sortOptions = {sales: -1};

    const [products, total] = await Promise.all([
        Product.find(query)
        .sort(sortOptions)
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