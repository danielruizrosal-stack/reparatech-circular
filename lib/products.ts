export interface Product {
  id: string;
  name: string;
  category: 'ordenadores' | 'moviles' | 'monitores' | 'perifericos' | 'componentes' | 'tablets' | 'ordenador' | 'movil' | 'monitor' | 'periferico' | 'componente' | 'tablet';
  price: number;
  originalPrice?: number;
  grade: 'A+' | 'A' | 'B';
  specs: string;
  image: string;
  featured?: boolean;
}

export const categoryLabels: Record<string, { es: string; en: string; count: number }> = {
  ordenador:   { es: 'Ordenadores',  en: 'Computers',   count: 4 },
  movil:       { es: 'Móviles',      en: 'Phones',      count: 3 },
  monitor:     { es: 'Monitores',    en: 'Monitors',    count: 3 },
  periferico:  { es: 'Periféricos',  en: 'Peripherals', count: 4 },
  componente:  { es: 'Componentes',  en: 'Components',  count: 5 },
  tablet:      { es: 'Tablets',      en: 'Tablets',     count: 1 },
};

// Mantenemos un array vacío temporal por retrocompatibilidad sincrónica donde sea absolutamente necesario
export const products: Product[] = [];

export async function getProducts(): Promise<Product[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) return [];

    const res = await fetch(`${supabaseUrl}/rest/v1/products?active=eq.true&select=*`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      },
      next: { revalidate: 60 }
    });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.map((p: any) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      originalPrice: p.original_price,
      grade: p.grade,
      specs: p.specs?.join(', ') || '',
      image: p.image_url || '',
      featured: true 
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
