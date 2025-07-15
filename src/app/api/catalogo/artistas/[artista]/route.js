import { NextResponse } from 'next/server';
import connect from '@/lib/mongo';
import Product from '@/lib/models/Product';

export async function GET(request, { params }) {
  try {
    await connect();

    const artista = decodeURIComponent(params.artista);
    
    const artistProducts = await Product.find( {artist: {$regex: new RegExp(`^${artista}$`, 'i')} } );

    if (artistProducts.length === 0) {
      return NextResponse.json(
        { error: `Nenhum produto encontrado para o artista: ${artista}` },
        { status: 404 }
      );
    }

    return NextResponse.json(artistProducts, { status: 200 });
    
  } catch (error) {
    return NextResponse.json(
      { 
        error: "Erro ao buscar produtos do artista", 
        message: error.message,
        artist: params.artista
      },
      { status: 500 }
    );
  }
}