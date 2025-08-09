import { NextResponse } from 'next/server';
import connect from '@/src/utils/mongo';
import Product from '@/src/types/ProductModel';

export async function GET() {
  try {
    await connect();
    
    const artists = await Product.distinct('artist');
    
    return NextResponse.json(artists);
    
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar artistas", message: error.message },
      { status: 500 }
    );
  }
}