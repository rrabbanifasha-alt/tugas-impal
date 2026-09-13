import { PrismaClient, OrderStatus } from '@prisma/client';
import { INITIAL_PRODUCTS } from '../src/lib/products';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database Sayurikat (Katalog Lengkap 31 Produk)...');

  // Reset database
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // 1. Seed Users (Area Gading Serpong / Tangerang)
  const user1 = await prisma.user.create({
    data: {
      name: 'Budi Santoso',
      whatsapp: '081234567890',
      address: 'Ruko Scientia Square No. 12, Gading Serpong, Kel. Curug Sangereng, Kec. Kelapa Dua, Kabupaten Tangerang, Banten 15810',
      latitude: -6.2415,
      longitude: 106.6289,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Siti Rahmawati',
      whatsapp: '089876543210',
      address: 'Cluster Edison No. 8, Summarecon Serpong, Gading Serpong, Tangerang, Banten 15810',
      latitude: -6.2388,
      longitude: 106.6241,
    },
  });

  console.log(`✅ Users created: ${user1.name}, ${user2.name}`);

  // 2. Seed All Products from INITIAL_PRODUCTS
  for (const item of INITIAL_PRODUCTS) {
    await prisma.product.create({
      data: {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        stock: item.stock,
        imageUrl: item.imageUrl,
      },
    });
  }

  console.log(`✅ ${INITIAL_PRODUCTS.length} Products seeded into SQLite database!`);

  // 3. Seed Sample Orders
  const sampleP1 = INITIAL_PRODUCTS[0];
  const sampleP2 = INITIAL_PRODUCTS[1];
  const sampleP3 = INITIAL_PRODUCTS[2];
  const sampleP4 = INITIAL_PRODUCTS[8]; // Sayur Satuan

  const order1 = await prisma.order.create({
    data: {
      userId: user1.id,
      status: OrderStatus.DIPROSES,
      totalAmount: sampleP1.price + (sampleP2.price * 2),
      items: {
        create: [
          {
            productId: sampleP1.id,
            quantity: 1,
            unitPrice: sampleP1.price,
          },
          {
            productId: sampleP2.id,
            quantity: 2,
            unitPrice: sampleP2.price,
          },
        ],
      },
    },
    include: { items: true },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: user2.id,
      status: OrderStatus.SELESAI,
      totalAmount: sampleP3.price + sampleP4.price,
      items: {
        create: [
          {
            productId: sampleP3.id,
            quantity: 1,
            unitPrice: sampleP3.price,
          },
          {
            productId: sampleP4.id,
            quantity: 1,
            unitPrice: sampleP4.price,
          },
        ],
      },
    },
    include: { items: true },
  });

  console.log(`✅ Sample Orders created: Order #1 Rp ${order1.totalAmount.toLocaleString('id-ID')}, Order #2 Rp ${order2.totalAmount.toLocaleString('id-ID')}`);
  console.log('🎉 Seeding database Sayurikat selesai!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
