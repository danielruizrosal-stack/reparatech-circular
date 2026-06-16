'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import AdminHeader from '@/components/admin/AdminHeader';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterActive, setFilterActive] = useState<boolean | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  };

  const toggleActive = async (id: string, current: boolean) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, active: !current } : p));
    await fetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !current })
    });
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('¿Eliminar producto definitivamente?')) return;
    setProducts(prev => prev.filter(p => p.id !== id));
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
  };

  const filtered = products.filter(p => filterActive === null ? true : p.active === filterActive);

  return (
    <>
      <AdminHeader title="Catálogo de Productos" />
      <main className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex gap-2">
            <button onClick={() => setFilterActive(null)} className={`px-4 py-2 rounded-full text-sm font-medium ${filterActive === null ? 'bg-[rgba(0,255,148,0.1)] text-[#00FF94] border border-[rgba(0,255,148,0.3)]' : 'bg-[rgba(255,255,255,0.05)] text-[#94A3B8] border border-transparent'}`}>Todos</button>
            <button onClick={() => setFilterActive(true)} className={`px-4 py-2 rounded-full text-sm font-medium ${filterActive === true ? 'bg-[rgba(0,255,148,0.1)] text-[#00FF94] border border-[rgba(0,255,148,0.3)]' : 'bg-[rgba(255,255,255,0.05)] text-[#94A3B8] border border-transparent'}`}>Activos</button>
            <button onClick={() => setFilterActive(false)} className={`px-4 py-2 rounded-full text-sm font-medium ${filterActive === false ? 'bg-[rgba(0,255,148,0.1)] text-[#00FF94] border border-[rgba(0,255,148,0.3)]' : 'bg-[rgba(255,255,255,0.05)] text-[#94A3B8] border border-transparent'}`}>Inactivos</button>
          </div>
          <Link href="/admin/productos/nuevo" className="px-5 py-2.5 bg-[rgba(0,255,148,0.1)] text-[#00FF94] border border-[rgba(0,255,148,0.3)] rounded-lg hover:bg-[rgba(0,255,148,0.2)] transition-colors font-bold">
            ➕ Nuevo producto
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#64748B]">Cargando productos...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(p => (
              <div key={p.id} className="bg-[rgba(13,17,23,0.8)] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden hover:border-[rgba(0,255,148,0.3)] transition-colors flex flex-col">
                <div className="h-48 bg-black/40 flex items-center justify-center relative">
                  {p.image_url ? (
                     <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                     <span className="text-4xl">📦</span>
                  )}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                    <span className="px-2 py-1 rounded bg-black/60 backdrop-blur text-[10px] font-bold uppercase text-[#0EA5E9] border border-[rgba(14,165,233,0.3)]">{p.category}</span>
                    <span className="px-2 py-1 rounded bg-black/60 backdrop-blur text-[10px] font-bold uppercase text-[#F8FAFC] border border-[rgba(255,255,255,0.1)]">Grado {p.grade}</span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-[#F8FAFC] mb-2 line-clamp-2">{p.name}</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-orbitron text-xl font-bold text-[#00FF94]">{p.price}€</span>
                    {p.original_price && <span className="text-sm text-[#64748B] line-through">{p.original_price}€</span>}
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)] space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#94A3B8]">Stock:</span>
                      <span className={`font-bold ${p.stock > 5 ? 'text-[#00FF94]' : p.stock > 0 ? 'text-[#F59E0B]' : 'text-[#EF4444]'}`}>
                        {p.stock} uds.
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#94A3B8]">Estado:</span>
                      <button 
                        onClick={() => toggleActive(p.id, p.active)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${p.active ? 'bg-[#00FF94]' : 'bg-[#64748B]'}`}
                      >
                        <span className={`inline-block h-3 w-3 transform rounded-full bg-[#020817] transition-transform ${p.active ? 'translate-x-5' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 border-t border-[rgba(255,255,255,0.05)] divide-x divide-[rgba(255,255,255,0.05)]">
                  <Link href={`/admin/productos/${p.id}`} className="py-3 text-center text-sm text-[#0EA5E9] hover:bg-[rgba(255,255,255,0.05)] font-medium transition-colors">✏️ Editar</Link>
                  <button onClick={() => deleteProduct(p.id)} className="py-3 text-center text-sm text-[#EF4444] hover:bg-[rgba(255,255,255,0.05)] font-medium transition-colors">🗑️ Eliminar</button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && !loading && (
              <div className="col-span-full py-12 text-center text-[#64748B]">No se encontraron productos.</div>
            )}
          </div>
        )}
      </main>
    </>
  );
}
