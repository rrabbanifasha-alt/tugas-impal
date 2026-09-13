import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { OrderStatus } from '@prisma/client';

// GET all orders
export async function GET() {
  try {
    const orders = await db.order.findMany({
      orderBy: {
        orderDate: 'desc',
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
      orders,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// PATCH update order status
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json(
        { success: false, error: 'orderId and status are required' },
        { status: 400 }
      );
    }

    // Verify valid status enum
    if (!Object.values(OrderStatus).includes(status as OrderStatus)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${Object.values(OrderStatus).join(', ')}` },
        { status: 400 }
      );
    }

    const updatedOrder = await db.order.update({
      where: { id: orderId },
      data: { status: status as OrderStatus },
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
      order: updatedOrder,
      message: `Status pesanan #${orderId.slice(-6)} berhasil diubah menjadi ${status}`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
