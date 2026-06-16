'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';

export default function ProductForm({ productId }: { productId?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(!!productId);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'ordenadores',
    grade: 'A',
    price: '',
    original_price: '',
    description: '',
    specs: [''],
    image_url: '',
    stock: '1',
    active: true
  });

  useEffect(() => {
    if (productId) {
      fetch(`/api/admin/products/${productId}`).then(res => res.json()).then(data => {
        if (data.product) {
          setFormData({
            ...data.product,
            price: data.product.price.toString(),
            original_price: data.product.original_price?.toString() || '',
            stock: data.product.stock.toString(),
            specs: data.product.specs || [''],
            description: data.product.description || '',
            image_url: data.product.image_url || ''
          });
        }
        setLoading(false);
      });
    }
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      original_price: formData.original_price ? parseFloat(formData.original_price) : null,
      stock: parseInt(formData.stock),
      specs: formData.specs.filter(s => s.trim() !== '')
    };

    const url = productId ? `/api/admin/products/${productId}` : '/api/admin/products';
    const method = productId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    router.push('/admin/productos');
  };

  if (loading) return <div className="p-8 text-[#94A3B8]">Cargando...</div>;

  return (
    <>
      <AdminHeader title={productId ? 'Editar Producto' : 'Nuevo Producto'} />
      <main className="p-6 md:p-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="bg-[rgba(13,17,23,0.8)] border border-[rgba(255,255,255,0.06)] rounded-xl p-8 space-y-8 animate-fade-up">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#64748B] uppercase mb-2">Nombre del producto *</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2.5 text-[#F8FAFC] outline-none focus:border-[#00FF94]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#64748B] uppercase mb-2">Categoría *</label>
              <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2.5 text-[#F8FAFC] outline-none focus:border-[#00FF94]">
                <option value="ordenadores" className="bg-[#0D1117]">Ordenador</option>
                <option value="moviles" className="bg-[#0D1117]">Móvil</option>
                <option value="monitores" className="bg-[#0D1117]">Monitor</option>
                <option value="perifericos" className="bg-[#0D1117]">Periférico</option>
                <option value="componentes" className="bg-[#0D1117]">Componente</option>
                <option value="tablets" className="bg-[#0D1117]">Tablet</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#64748B] uppercase mb-2">Precio actual (€) *</label>
              <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2.5 text-[#00FF94] font-orbitron outline-none focus:border-[#00FF94]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#64748B] uppercase mb-2">Precio original (€)</label>
              <input type="number" step="0.01" value={formData.original_price} onChange={e => setFormData({...formData, original_price: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2.5 text-[#94A3B8] outline-none focus:border-[#00FF94]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#64748B] uppercase mb-2">Grado *</label>
              <select required value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2.5 text-[#F8FAFC] outline-none focus:border-[#00FF94]">
                <option value="A+" className="bg-[#0D1117]">A+ (Como nuevo)</option>
                <option value="A" className="bg-[#0D1117]">A (Excelente)</option>
                <option value="B" className="bg-[#0D1117]">B (Buen estado)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#64748B] uppercase mb-2">Descripción</label>
            <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2.5 text-[#F8FAFC] outline-none focus:border-[#00FF94]" />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#64748B] uppercase mb-2">Especificaciones Técnicas</label>
            <div className="space-y-2 mb-3">
              {formData.specs.map((spec, idx) => (
                <div key={idx} className="flex gap-2">
                  <input type="text" value={spec} onChange={e => {
                    const newSpecs = [...formData.specs];
                    newSpecs[idx] = e.target.value;
                    setFormData({...formData, specs: newSpecs});
                  }} className="flex-1 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 text-[#F8FAFC] outline-none focus:border-[#00FF94]" placeholder="Ej: 16GB RAM DDR4" />
                  <button type="button" onClick={() => setFormData({...formData, specs: formData.specs.filter((_, i) => i !== idx)})} className="px-3 rounded-lg bg-[rgba(239,68,68,0.1)] text-[#EF4444] hover:bg-[rgba(239,68,68,0.2)]">✕</button>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => setFormData({...formData, specs: [...formData.specs, '']})} className="text-sm text-[#00FF94] hover:underline">+ Añadir especificación</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#64748B] uppercase mb-2">URL de Imagen</label>
              <input type="url" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2.5 text-[#F8FAFC] outline-none focus:border-[#00FF94]" placeholder="https://..." />
              {formData.image_url && <img src={formData.image_url} alt="Preview" className="mt-4 h-32 w-full object-contain rounded border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.5)] p-2" />}
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#64748B] uppercase mb-2">Stock disponible *</label>
                <input required type="number" min="0" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2.5 text-[#F8FAFC] outline-none focus:border-[#00FF94]" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="active" checked={formData.active} onChange={e => setFormData({...formData, active: e.target.checked})} className="w-5 h-5 accent-[#00FF94] cursor-pointer" />
                <label htmlFor="active" className="text-sm text-[#F8FAFC] font-medium cursor-pointer">Producto visible en la tienda</label>
              </div>
            </div>
          </div>

          <div className="border-t border-[rgba(255,255,255,0.06)] pt-6 flex justify-end gap-4">
            <button type="button" onClick={() => router.push('/admin/productos')} className="px-6 py-2.5 rounded-lg border border-[rgba(255,255,255,0.1)] text-[#94A3B8] hover:bg-[rgba(255,255,255,0.05)] transition-colors font-medium">Cancelar</button>
            <button type="submit" disabled={saving} className="px-8 py-2.5 rounded-lg bg-[rgba(0,255,148,0.1)] text-[#00FF94] border border-[#00FF94]/30 hover:bg-[#00FF94] hover:text-black transition-all font-bold disabled:opacity-50">
              {saving ? 'Guardando...' : 'Guardar producto'}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
