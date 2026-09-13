import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, subtotal, deliveryFee = 10000, totalAmount, paymentMethod = 'COD' } = body;

    // 1. Validation
    if (!customer || !customer.name?.trim() || !customer.whatsapp?.trim() || !customer.address?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Data nama, nomor WhatsApp, dan alamat pengiriman wajib diisi' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Keranjang belanja tidak boleh kosong' },
        { status: 400 }
      );
    }

    const cleanWhatsapp = customer.whatsapp.trim();
    const cleanName = customer.name.trim();
    const cleanAddress = customer.address.trim();
    const cleanNotes = customer.notes?.trim() || null;

    // 2. Find or create user
    let user = await db.user.findFirst({
      where: { whatsapp: cleanWhatsapp },
    });

    if (!user) {
      user = await db.user.create({
        data: {
          name: cleanName,
          whatsapp: cleanWhatsapp,
          address: cleanAddress,
        },
      });
    } else {
      // Update name and address if changed
      user = await db.user.update({
        where: { id: user.id },
        data: {
          name: cleanName,
          address: cleanAddress,
        },
      });
    }

    // 3. Compute totals safely
    const computedDeliveryFee = Number(deliveryFee) >= 0 ? Number(deliveryFee) : 10000;
    const computedTotal = Number(totalAmount) || (Number(subtotal) + computedDeliveryFee);

    // 4. Create Order with OrderItems
    const order = await db.order.create({
      data: {
        userId: user.id,
        status: 'PENDING',
        totalAmount: computedTotal,
        deliveryFee: computedDeliveryFee,
        paymentMethod: paymentMethod || 'COD',
        notes: cleanNotes,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId || item.product?.id,
            quantity: Number(item.quantity) || 1,
            unitPrice: Number(item.unitPrice || item.product?.price || 0),
          })),
        },
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
      orderId: order.id,
      order,
      message: `Pesanan #${order.id.slice(-6).toUpperCase()} berhasil disimpan ke sistem`,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
