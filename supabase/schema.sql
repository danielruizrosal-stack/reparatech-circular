-- Tabla de administradores autorizados
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'superadmin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- Tabla de mensajes de contacto (recibe datos del formulario público)
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de solicitudes de presupuesto (recibe datos del simulador)
CREATE TABLE budget_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  device_type TEXT NOT NULL,
  problems TEXT[] NOT NULL,
  brand TEXT,
  model TEXT,
  age TEXT,
  home_pickup BOOLEAN DEFAULT FALSE,
  urgent BOOLEAN DEFAULT FALSE,
  estimated_total DECIMAL(10,2),
  name TEXT,
  email TEXT,
  phone TEXT,
  preferred_date DATE,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'quoted', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de productos (gestión desde el admin)
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('ordenadores', 'moviles', 'monitores', 'perifericos', 'componentes')),
  grade TEXT CHECK (grade IN ('A+', 'A', 'B')),
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  description TEXT,
  specs TEXT[],
  image_url TEXT,
  stock INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Políticas de seguridad (Row Level Security)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Solo admins autenticados pueden ver/editar todo
CREATE POLICY "Admins only" ON admin_users FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins only" ON contact_messages FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins only" ON budget_requests FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins only" ON products FOR ALL USING (auth.uid() IS NOT NULL);

-- Cualquiera puede insertar mensajes de contacto y presupuestos (formularios públicos)
CREATE POLICY "Public insert contact" ON contact_messages FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public insert budget" ON budget_requests FOR INSERT WITH CHECK (TRUE);
-- Cualquiera puede leer productos activos
CREATE POLICY "Public read products" ON products FOR SELECT USING (active = TRUE);
