import { NextResponse } from 'next/server';
import connect from '@/src/utils/mongo';
import Product from '@/src/types/ProductModel';

export async function GET() {
  try {
    await connect();
    
    const generos = await Product.distinct('genre');
    
    return NextResponse.json(generos);
    
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar gêneros", message: error.message },
      { status: 500 }
    );
  }
}