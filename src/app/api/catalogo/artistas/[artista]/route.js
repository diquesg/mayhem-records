import { NextResponse } from 'next/server';
import connect from '@/src/utils/mongo';
import Product from '@/src/types/ProductModel';

export async function GET(request, { params }) {
  try {
    await connect();

    const artista = decodeURIComponent(params.artista);
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    const query = { artist: { $regex: new RegExp(`^${artista}$`, 'i') } };

    const [products, total] = await Promise.all([
      Product.find(query).skip(skip).limit(limit),
      Product.countDocuments(query)
    ]);

    return NextResponse.json({ products, total }, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      error: "Erro ao buscar produtos do artista",
      message: error.message,
      artist: params.artista
    }, { status: 500 });
  }
}
