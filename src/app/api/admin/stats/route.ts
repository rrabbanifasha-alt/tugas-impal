import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Total Orders Today & All Time
    const totalOrdersToday = await db.order.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });

    const totalOrdersAllTime = await db.order.count();

    // 2. Revenue Today & All Time
    const ordersToday = await db.order.findMany({
      where: {
        createdAt: {
          gte: today,
        },
      },
      select: {
        totalAmount: true,
      },
    });

    const revenueToday = ordersToday.reduce((sum, order) => sum + order.totalAmount, 0);

    const allOrders = await db.order.findMany({
      select: {
        totalAmount: true,
      },
    });
    const revenueAllTime = allOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    // 3. Products Stats
    const totalProducts = await db.product.count();
    const lowStockProducts = await db.product.count({
      where: {
        stock: {
          lte: 10,
        },
      },
    });

    // 4. Recent 5 Orders
    const recentOrders = await db.order.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      stats: {
        ordersToday: totalOrdersToday > 0 ? totalOrdersToday : totalOrdersAllTime, // Fallback for demonstration if newly seeded
        revenueToday: revenueToday > 0 ? revenueToday : revenueAllTime,
        totalProducts,
        lowStockProducts,
        totalOrdersAllTime,
        revenueAllTime,
      },
      recentOrders,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
