import { db } from '../src/lib/db';

async function verify() {
  console.log('🔍 Database Verification Test - Sayurikat Modul 1\n');

  // 1. Fetch Users
  const users = await db.user.findMany();
  console.log(`👤 Users Count: ${users.length}`);
  users.forEach((u) => {
    console.log(` - ID: ${u.id} | Nama: ${u.name} | WA: ${u.whatsapp} | Alamat: ${u.address.substring(0, 45)}...`);
  });

  // 2. Fetch Products
  const products = await db.product.findMany();
  console.log(`\n🥦 Products Count: ${products.length}`);
  products.forEach((p) => {
    console.log(` - [${p.category}] ${p.name} - Rp ${p.price.toLocaleString('id-ID')} (Stok: ${p.stock})`);
  });

  // 3. Fetch Orders with User & Items
  const orders = await db.order.findMany({
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  console.log(`\n📦 Orders Count: ${orders.length}`);
  orders.forEach((o, index) => {
    console.log(`\n  Order #${index + 1}:`);
    console.log(`   - Order ID: ${o.id}`);
    console.log(`   - Customer: ${o.user.name} (${o.user.whatsapp})`);
    console.log(`   - Status: ${o.status}`);
    console.log(`   - Total Amount: Rp ${o.totalAmount.toLocaleString('id-ID')}`);
    console.log(`   - Items:`);
    o.items.forEach((item) => {
      console.log(`     * ${item.quantity}x ${item.product.name} @ Rp ${item.unitPrice.toLocaleString('id-ID')}`);
    });
  });

  console.log('\n✨ Database Verification Completed Successfully!');
}

verify()
  .catch((e) => {
    console.error('❌ Verification failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
