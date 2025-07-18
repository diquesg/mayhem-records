import { NextResponse } from 'next/server';
import connect from '@/lib/mongo';
import Product from '@/lib/models/Product';

export async function GET(request, { params }) {
  try {
    await connect();

    const genero = decodeURIComponent(params.genero);
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    const query = { genre: { $regex: new RegExp(`^${genero}$`, 'i') } };

    const [products, total] = await Promise.all([
      Product.find(query).skip(skip).limit(limit),
      Product.countDocuments(query)
    ]);

    return NextResponse.json({ products, total }, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      error: "Erro ao buscar produtos do gênero",
      message: error.message,
      genre: params.genero
    }, { status: 500 });
  }
}
