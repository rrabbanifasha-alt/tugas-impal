import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const OUT = path.resolve('screenshots');

const pages = [
  { name: '01-beranda', path: '/', fullPage: true },
  { name: '02-feedback', path: '/feedback', fullPage: true },
  { name: '03-admin-overview', path: '/admin', fullPage: true },
  { name: '04-admin-orders', path: '/admin/orders', fullPage: true },
  { name: '05-admin-products', path: '/admin/products', fullPage: true },
  { name: '06-admin-feedback', path: '/admin/feedback', fullPage: true },
];

async function waitReady(page) {
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(800);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  for (const item of pages) {
    const url = `${BASE}${item.path}`;
    console.log(`Capturing ${item.name} -> ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await waitReady(page);
    const file = path.join(OUT, `${item.name}.png`);
    await page.screenshot({ path: file, fullPage: item.fullPage });
    console.log(`Saved ${file}`);
  }

  // Extra: cart drawer on home (viewport shot with drawer open if possible)
  console.log('Capturing cart drawer state...');
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await waitReady(page);

  // Try open cart via Keranjang button
  const cartBtn = page.getByRole('button', { name: /Keranjang/i });
  if (await cartBtn.count()) {
    await cartBtn.first().click();
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(OUT, '07-keranjang-drawer.png'),
      fullPage: false,
    });
    console.log('Saved keranjang drawer');
  }

  // Mobile beranda
  await context.close();
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mpage = await mobile.newPage();
  await mpage.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await waitReady(mpage);
  await mpage.screenshot({
    path: path.join(OUT, '08-beranda-mobile.png'),
    fullPage: true,
  });
  console.log('Saved mobile beranda');

  await browser.close();
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
