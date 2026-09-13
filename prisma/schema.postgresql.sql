-- ======================================================================
-- SAYUR IKAT - POSTGRESQL PRODUCTION DDL & SEEDING QUERIES (FASE 1 PDF)
-- ======================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUM DEFINITIONS
DO $$ BEGIN
    CREATE TYPE order_status_enum AS ENUM ('PENDING', 'DIPROSES', 'DIKIRIM', 'SELESAI');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE product_category_enum AS ENUM ('Paket', 'Satuan');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. TABEL USERS
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(30) NOT NULL,
    address TEXT NOT NULL, -- Fokus area Tangerang / Gading Serpong
    latitude DOUBLE PRECISION NULL, -- Titik Koordinat (opsional)
    longitude DOUBLE PRECISION NULL, -- Titik Koordinat (opsional)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABEL PRODUCTS
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name VARCHAR(255) NOT NULL, -- contoh: Paket Hijau Tumis
    description TEXT NOT NULL,
    price DOUBLE PRECISION NOT NULL, -- Harga dalam IDR (Integer/Double)
    category VARCHAR(50) NOT NULL, -- 'Paket' atau 'Satuan'
    stock INT NOT NULL DEFAULT 0,
    image_url TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. TABEL ORDERS
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    user_id VARCHAR(36) NOT NULL,
    order_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    total_amount DOUBLE PRECISION NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. TABEL ORDER_ITEMS
CREATE TABLE IF NOT EXISTS order_items (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    order_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DOUBLE PRECISION NOT NULL,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- 6. INDEXES UNTUK OPTIMASI QUERY
CREATE INDEX IF NOT EXISTS idx_users_whatsapp ON users(whatsapp);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- ======================================================================
-- SEED DATA POSTGRESQL (3 PAKET + 3 SATUAN SESUAI PDF HALAMAN 9-10 & 18)
-- ======================================================================

INSERT INTO products (id, name, description, price, category, stock, image_url, is_active) VALUES
('pkt-01', 'Paket Hijau Tumis', 'Cocok untuk 2-3 kali masak. Berisi 1 Ikat Bayam Hijau Premium, 1 Ikat Kangkung Segar, dan 1 Ikat Sawi Hijau/Caisim.', 35000, 'Paket', 50, 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80', true),
('pkt-02', 'Paket Sop Hangat', 'Lengkap tinggal cemplung. Wortel manis (250g), kentang kuning (250g), buncis segar (150g), serta 1 ikat daun bawang & seledri.', 45000, 'Paket', 40, 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80', true),
('pkt-03', 'Paket Bumbu Dapur Dasar', 'Esensial untuk mingguan. Bawang merah (150g), bawang putih (150g), cabai rawit merah (100g), serta 1 ikat serai & daun salam.', 40000, 'Paket', 35, 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?auto=format&fit=crop&w=800&q=80', true),
('stn-01', 'Tomat Merah Segar (500g)', 'Tomat merah segar pilihan kualitas super dengan rasa manis-asam alami, kaya lycopene.', 18000, 'Satuan', 75, 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80', true),
('stn-02', 'Brokoli Kualitas Super (Per Bonggol)', 'Brokoli hijau padat tanpa ulat dan pestisida sintetis.', 22000, 'Satuan', 50, 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=800&q=80', true),
('stn-03', 'Jeruk Nipis (250g)', 'Jeruk nipis segar kaya air dan vitamin C alami.', 12000, 'Satuan', 60, 'https://images.unsplash.com/photo-1534531141161-e41d133c4b50?auto=format&fit=crop&w=800&q=80', true)
ON CONFLICT (id) DO NOTHING;
