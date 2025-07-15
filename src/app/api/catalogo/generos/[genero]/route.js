import { NextResponse } from 'next/server';
import connect from '@/lib/mongo';
import Product from '@/lib/models/Product';

export async function GET(request, { params }) {
  try {
    await connect();

    const {genero} = await params;
    const decodedGenero = decodeURIComponent(genero);
    console.log(decodedGenero);

    const genreProducts = await Product.find( {genre: {$regex: new RegExp(`^${decodedGenero}$`, 'i')} } );

    if (genreProducts.length === 0) {
      return NextResponse.json(
        { error: `Nenhum produto encontrado para o gênero: ${decodedGenero}` },
        { status: 404 }
      );
    }

    return NextResponse.json(genreProducts, { status: 200 });
    
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erro ao buscar produtos do gênero",
        message: error.message,
        genre: params.genre
      },
      { status: 500 }
    );
  }
}