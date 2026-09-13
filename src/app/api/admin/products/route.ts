import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET all products
export async function GET() {
  try {
    const products = await db.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST create new product
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, category, stock, imageUrl } = body;

    if (!name || price === undefined || !category) {
      return NextResponse.json(
        { success: false, error: 'Name, price, and category are required' },
        { status: 400 }
      );
    }

    const newProduct = await db.product.create({
      data: {
        name,
        description: description || 'Produk sayur segar organik dari petani lokal.',
        price: parseFloat(price),
        category,
        stock: parseInt(stock) || 0,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      },
    });

    return NextResponse.json({
      success: true,
      product: newProduct,
      message: `Produk "${name}" berhasil ditambahkan`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// PUT update existing product
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, description, price, category, stock, imageUrl } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(category && { category }),
        ...(stock !== undefined && { stock: parseInt(stock) }),
        ...(imageUrl && { imageUrl }),
      },
    });

    return NextResponse.json({
      success: true,
      product: updatedProduct,
      message: `Produk "${updatedProduct.name}" berhasil diperbarui`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Check if product is tied to order items
    const tiedOrderItems = await db.orderItem.count({
      where: { productId: id },
    });

    if (tiedOrderItems > 0) {
      // Deactivate by setting stock to 0 instead of deleting to maintain DB referential integrity
      const deactivatedProduct = await db.product.update({
        where: { id },
        data: { stock: 0 },
      });
      return NextResponse.json({
        success: true,
        product: deactivatedProduct,
        message: `Produk dinonaktifkan (stok 0) karena memiliki riwayat pesanan`,
      });
    }

    await db.product.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Produk berhasil dihapus dari sistem',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
