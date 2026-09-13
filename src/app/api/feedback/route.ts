import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST: Save customer feedback
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      freshnessRating,
      packagingRating,
      deliveryRating,
      experienceRating,
      criticismNotes,
      photoUrl,
      customerName,
      customerPhone,
      orderNumber,
    } = body;

    if (!freshnessRating || !packagingRating || !deliveryRating || !experienceRating || !criticismNotes) {
      return NextResponse.json(
        { success: false, error: 'Mohon lengkapi rating kategori dan kolom kritik/saran.' },
        { status: 400 }
      );
    }

    const feedback = await db.feedback.create({
      data: {
        freshnessRating,
        packagingRating,
        deliveryRating,
        experienceRating,
        criticismNotes,
        photoUrl: photoUrl || null,
        customerName: customerName || null,
        customerPhone: customerPhone || null,
        orderNumber: orderNumber || null,
      },
    });

    return NextResponse.json({
      success: true,
      feedback,
      message: 'Kritik & saran kamu berhasil kami terima. Terima kasih sudah membantu Sayur Ikat!',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// GET: Retrieve all feedback for Admin
export async function GET() {
  try {
    const feedbacks = await db.feedback.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      feedbacks,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
