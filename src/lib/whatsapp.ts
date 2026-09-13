import { CartItem, OrderFormData } from '@/types';

// Admin WhatsApp number for Sayur Ikat orders (configurable via env)
const ADMIN_WHATSAPP = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || '6281111090906';

export function getPaymentMethodLabel(method?: string): string {
  switch (method) {
    case 'QRIS':
      return '📱 QRIS / E-Wallet (GoPay, OVO, ShopeePay, DANA)';
    case 'TRANSFER_BCA':
      return '🏦 Transfer Bank BCA (Virtual Account / Manual)';
    case 'TRANSFER_MANDIRI':
      return '🏦 Transfer Bank Mandiri (Virtual Account)';
    case 'COD':
    default:
      return '💵 Bayar di Tempat (COD)';
  }
}

export function formatWhatsAppOrderMessage(
  items: CartItem[],
  formData: OrderFormData,
  subtotal: number,
  deliveryFee: number,
  orderId?: string
): string {
  const grandTotal = subtotal + deliveryFee;

  const itemsList = items
    .map(
      (item) =>
        `• ${item.quantity}x ${item.product.name} (Rp ${(
          item.product.price * item.quantity
        ).toLocaleString('id-ID')})`
    )
    .join('\n');

  const orderHeader = orderId
    ? `Halo Admin Sayur Ikat! 🍃 Saya telah membuat pesanan #${orderId.slice(-6).toUpperCase()}:`
    : `Halo Admin Sayur Ikat! 🍃 Saya ingin memesan sayur organik bebas plastik:`;

  const paymentText = getPaymentMethodLabel(formData.paymentMethod);

  const message = `${orderHeader}

${orderId ? `🔖 NO. PESANAN: #${orderId.slice(-6).toUpperCase()}\n` : ''}🛒 DETAIL PESANAN:
${itemsList}

💳 METODE PEMBAYARAN:
${paymentText}

💰 RINCIAN BIAYA:
• Subtotal Sayur: Rp ${subtotal.toLocaleString('id-ID')}
• Biaya Kirim: ${deliveryFee === 0 ? 'GRATIS' : `Rp ${deliveryFee.toLocaleString('id-ID')}`}
• Total Bayar: Rp ${grandTotal.toLocaleString('id-ID')}

📍 DATA PENGIRIMAN:
Nama: ${formData.name}
No. WA: ${formData.whatsapp}
Alamat Lengkap: ${formData.address}${formData.notes ? `\nCatatan Khusus: ${formData.notes}` : ''}

Mohon diproses pesanannya ya. Terima kasih!`;

  return message;
}

export function generateWhatsAppLink(
  items: CartItem[],
  formData: OrderFormData,
  subtotal: number,
  deliveryFee: number,
  orderId?: string
): string {
  const message = formatWhatsAppOrderMessage(items, formData, subtotal, deliveryFee, orderId);
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${ADMIN_WHATSAPP}?text=${encodedText}`;
}
