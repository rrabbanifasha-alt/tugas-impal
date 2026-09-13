import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const usersCount = await db.user.count();
    const productsCount = await db.product.count();
    const ordersCount = await db.order.count();

    const sampleProducts = await db.product.findMany({ take: 5 });
    const sampleOrders = await db.order.findMany({
      take: 2,
      include: {
        user: true,
        items: {
          include: { product: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Modul 1 Database Sayurikat Status',
      summary: {
        usersCount,
        productsCount,
        ordersCount,
      },
      data: {
        products: sampleProducts,
        orders: sampleOrders,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
