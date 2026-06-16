'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import DataTable, { Column } from '@/components/admin/DataTable';
import AdminHeader from '@/components/admin/AdminHeader';

const STATUS_COLORS: any = {
  pending: { bg: 'rgba(239,68,68,0.2)', text: '#EF4444', label: 'Pendiente' },
  review: { bg: 'rgba(14,165,233,0.2)', text: '#0EA5E9', label: 'En revisión' },
  quoted: { bg: 'rgba(245,158,11,0.2)', text: '#F59E0B', label: 'Presupuestado' },
  accepted: { bg: 'rgba(34,197,94,0.2)', text: '#22C55E', label: 'Aceptado' },
  rejected: { bg: 'rgba(100,116,139,0.2)', text: '#94A3B8', label: 'Rechazado' }
};

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<any[]>([]);
  const [filter, setFilter] = useState('Todos');
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [finalPrice, setFinalPrice] = useState<string>('');
  const supabase = createClient();

  useEffect(() => {
    const fetchBudgets = async () => {
      const { data } = await supabase.from('budget_requests').select('*').order('created_at', { ascending: false });
      if (data) setBudgets(data);
      setLoading(false);
    };
    fetchBudgets();
  }, [supabase]);

  const updateBudget = async (id: string, updates: any) => {
    await fetch('/api/admin/budgets', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updates })
    });
    setBudgets(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    if (selected && selected.id === id) setSelected({ ...selected, ...updates });
  };

  const filtered = budgets.filter(b => {
    if (filter === 'Todos') return true;
    if (filter === 'Pendiente') return b.status === 'pending';
    if (filter === 'En revisión') return b.status === 'review';
    if (filter === 'Presupuestado') return b.status === 'quoted';
    if (filter === 'Aceptado') return b.status === 'accepted';
    if (filter === 'Rechazado') return b.status === 'rejected';
    return true;
  });

  const columns: Column<any>[] = [
    { key: 'name', label: 'Cliente', sortable: true },
    { 
      key: 'device_type', 
      label: 'Dispositivo', 
      render: (row) => (
        <div>
          <div className="font-bold text-[#F8FAFC] capitalize">{row.device_type}</div>
          <div className="text-[12px] truncate max-w-[150px]">{row.problems?.join(', ') || ''}</div>
        </div>
      )
    },
    { 
      key: 'estimated_total', 
      label: 'Estimado', 
      sortable: true,
      render: (row) => <span className="font-orbitron font-bold text-[#00FF94]">{row.estimated_total}€</span>
    },
    { 
      key: 'created_at', 
      label: 'Fecha', 
      sortable: true,
      render: (row) => new Date(row.created_at).toLocaleDateString('es-ES')
    },
    {
      key: 'home_pickup',
      label: 'Recogida',
      render: (row) => <span className="text-lg">{row.home_pickup ? '✅' : '❌'}</span>
    },
    {
      key: 'urgent',
      label: 'Urgente',
      render: (row) => row.urgent ? <span className="bg-[#F97316] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase">Urgente</span> : null
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row) => {
        const s = STATUS_COLORS[row.status] || STATUS_COLORS.pending;
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: s.bg, color: s.text }}>{s.label.toUpperCase()}</span>;
      }
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (row) => (
        <button 
          onClick={() => { setSelected(row); setFinalPrice(row.estimated_total?.toString() || ''); }}
          className="px-4 py-1.5 rounded bg-[rgba(14,165,233,0.1)] text-[#0EA5E9] border border-[rgba(14,165,233,0.3)] hover:bg-[rgba(14,165,233,0.2)] text-sm font-medium transition-colors"
        >
          Ver Detalle
        </button>
      )
    }
  ];

  const pendingCount = budgets.filter(b => b.status === 'pending').length;

  return (
    <>
      <AdminHeader title="Gestión de Presupuestos" />
      <main className="p-6 md:p-8">
        
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['Todos', 'Pendiente', 'En revisión', 'Presupuestado', 'Aceptado', 'Rechazado'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${filter === f ? 'bg-[rgba(14,165,233,0.1)] text-[#0EA5E9] border border-[rgba(14,165,233,0.3)]' : 'bg-[rgba(255,255,255,0.03)] text-[#94A3B8] border border-transparent hover:bg-[rgba(255,255,255,0.08)]'}`}
            >
              {f}
              {f === 'Pendiente' && pendingCount > 0 && <span className="bg-[#F59E0B] text-white text-[10px] px-1.5 py-0.5 rounded-full">{pendingCount}</span>}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center text-[#64748B]">Cargando presupuestos...</div>
        ) : (
          <DataTable columns={columns} data={filtered} />
        )}

      </main>

      {/* Modal Lateral */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-[500px] bg-[#0D1117] h-full shadow-2xl flex flex-col animate-slide-left" style={{ borderLeft: '1px solid rgba(14,165,233,0.2)' }}>
            <div className="p-6 border-b border-[rgba(255,255,255,0.06)] flex justify-between items-center">
              <h3 className="font-orbitron font-bold text-lg text-[#F8FAFC]">Detalle de Presupuesto</h3>
              <button onClick={() => setSelected(null)} className="text-[#64748B] hover:text-white text-2xl leading-none">&times;</button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto space-y-6 text-sm">
              <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-5">
                <div className="text-xl font-orbitron font-bold text-[#F8FAFC] capitalize mb-1">
                  {selected.device_type} {selected.brand ? `• ${selected.brand}` : ''}
                </div>
                <div className="text-[#94A3B8] mb-4">Modelo: {selected.model || 'No especificado'} | Antigüedad: {selected.age}</div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {selected.problems?.map((p: string, i: number) => (
                    <span key={i} className="px-2 py-1 bg-[rgba(0,255,148,0.1)] text-[#00FF94] text-xs rounded-full">{p}</span>
                  ))}
                  {selected.home_pickup && <span className="px-2 py-1 bg-[rgba(14,165,233,0.1)] text-[#0EA5E9] text-xs rounded-full border border-[rgba(14,165,233,0.3)]">Recogida domicilio</span>}
                  {selected.urgent && <span className="px-2 py-1 bg-[rgba(249,115,22,0.1)] text-[#F97316] text-xs rounded-full border border-[rgba(249,115,22,0.3)]">Urgente 24h</span>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[#64748B] uppercase text-[10px] tracking-widest font-bold mb-1">Cliente</div>
                  <div className="text-[#F8FAFC] font-medium">{selected.name}</div>
                </div>
                <div>
                  <div className="text-[#64748B] uppercase text-[10px] tracking-widest font-bold mb-1">Email</div>
                  <div className="text-[#0EA5E9]">{selected.email}</div>
                </div>
                <div>
                  <div className="text-[#64748B] uppercase text-[10px] tracking-widest font-bold mb-1">Teléfono</div>
                  <div className="text-[#F8FAFC]">{selected.phone}</div>
                </div>
                <div>
                  <div className="text-[#64748B] uppercase text-[10px] tracking-widest font-bold mb-1">Cita preferida</div>
                  <div className="text-[#F8FAFC]">{selected.preferred_date ? new Date(selected.preferred_date).toLocaleDateString('es-ES') : 'Cualquiera'}</div>
                </div>
              </div>

              {selected.notes && (
                <div>
                  <div className="text-[#64748B] uppercase text-[10px] tracking-widest font-bold mb-1">Notas del Cliente</div>
                  <div className="text-[#94A3B8] p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                    {selected.notes}
                  </div>
                </div>
              )}

              <div className="h-px bg-[rgba(255,255,255,0.06)] my-6"></div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[#64748B] uppercase text-[10px] tracking-widest font-bold mb-1">Estado de la solicitud</div>
                  <select 
                    value={selected.status}
                    onChange={e => updateBudget(selected.id, { status: e.target.value })}
                    className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded px-3 py-2 text-[#F8FAFC] outline-none focus:border-[#0EA5E9] cursor-pointer"
                  >
                    <option value="pending" className="bg-[#0D1117]">Pendiente</option>
                    <option value="review" className="bg-[#0D1117]">En revisión</option>
                    <option value="quoted" className="bg-[#0D1117]">Presupuestado</option>
                    <option value="accepted" className="bg-[#0D1117]">Aceptado</option>
                    <option value="rejected" className="bg-[#0D1117]">Rechazado</option>
                  </select>
                </div>
                <div>
                  <div className="text-[#00FF94] uppercase text-[10px] tracking-widest font-bold mb-1">Precio final real (€)</div>
                  <div className="flex gap-2">
                    <input 
                      type="number"
                      value={finalPrice}
                      onChange={e => setFinalPrice(e.target.value)}
                      className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(0,255,148,0.3)] rounded px-3 py-2 text-[#00FF94] font-orbitron font-bold outline-none focus:border-[#00FF94]"
                    />
                    <button 
                      onClick={() => updateBudget(selected.id, { estimated_total: parseFloat(finalPrice) })}
                      className="px-3 rounded bg-[rgba(0,255,148,0.1)] text-[#00FF94] border border-[#00FF94]/30 hover:bg-[#00FF94] hover:text-[#020817] transition-colors"
                    >
                      ✓
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[rgba(255,255,255,0.06)]">
              <a 
                href={`mailto:${selected.email}?subject=Tu presupuesto para ${selected.device_type} en ReparaTech Circular&body=Hola ${selected.name},%0D%0A%0D%0AAdjuntamos el presupuesto final para tu equipo tras revisarlo:%0D%0A%0D%0ATotal: ${selected.estimated_total}€%0D%0A%0D%0A¿Deseas seguir adelante con la reparación?`}
                onClick={() => { if (selected.status === 'pending') updateBudget(selected.id, { status: 'quoted' }); }}
                className="block w-full py-3 rounded-lg bg-[rgba(14,165,233,0.1)] text-[#0EA5E9] border border-[#0EA5E9] text-center font-bold hover:bg-[#0EA5E9] hover:text-[#020817] transition-all"
              >
                Enviar presupuesto por Email
              </a>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide-left {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-left { animation: slide-left 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </>
  );
}
