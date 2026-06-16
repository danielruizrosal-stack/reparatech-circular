'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import DataTable, { Column } from '@/components/admin/DataTable';
import AdminHeader from '@/components/admin/AdminHeader';

const STATUS_COLORS: any = {
  unread: { bg: 'rgba(239,68,68,0.2)', text: '#EF4444', label: 'Sin leer' },
  read: { bg: 'rgba(100,116,139,0.2)', text: '#94A3B8', label: 'Leído' },
  replied: { bg: 'rgba(34,197,94,0.2)', text: '#22C55E', label: 'Respondido' },
  archived: { bg: 'rgba(245,158,11,0.2)', text: '#F59E0B', label: 'Archivado' }
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [filter, setFilter] = useState('Todos');
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchMsgs = async () => {
      const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
      if (data) setMessages(data);
      setLoading(false);
    };
    fetchMsgs();
  }, [supabase]);

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/admin/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    if (selected && selected.id === id) setSelected({ ...selected, status });
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este mensaje? Esta acción no se puede deshacer.')) return;
    await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' });
    setMessages(prev => prev.filter(m => m.id !== id));
    setSelected(null);
  };

  const filtered = messages.filter(m => {
    if (filter === 'Todos') return true;
    if (filter === 'Sin leer') return m.status === 'unread';
    if (filter === 'Leídos') return m.status === 'read';
    if (filter === 'Respondidos') return m.status === 'replied';
    if (filter === 'Archivados') return m.status === 'archived';
    return true;
  });

  const columns: Column<any>[] = [
    { key: 'name', label: 'Remitente', sortable: true },
    { 
      key: 'email', 
      label: 'Email', 
      sortable: true,
      render: (row) => <a href={`mailto:${row.email}`} className="text-[#0EA5E9] hover:underline" onClick={e => e.stopPropagation()}>{row.email}</a>
    },
    { key: 'subject', label: 'Asunto', sortable: true },
    { 
      key: 'created_at', 
      label: 'Fecha', 
      sortable: true,
      render: (row) => {
        const d = new Date(row.created_at);
        return `${d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}, ${d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
      }
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row) => {
        const s = STATUS_COLORS[row.status] || STATUS_COLORS.read;
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: s.bg, color: s.text }}>{s.label.toUpperCase()}</span>;
      }
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (row) => (
        <button 
          onClick={() => setSelected(row)}
          className="px-4 py-1.5 rounded bg-[rgba(0,255,148,0.1)] text-[#00FF94] hover:bg-[rgba(0,255,148,0.2)] text-sm font-medium transition-colors"
        >
          Ver
        </button>
      )
    }
  ];

  const unreadCount = messages.filter(m => m.status === 'unread').length;

  return (
    <>
      <AdminHeader title="Mensajes de Contacto" />
      <main className="p-6 md:p-8">
        
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['Todos', 'Sin leer', 'Leídos', 'Respondidos', 'Archivados'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${filter === f ? 'bg-[rgba(0,255,148,0.1)] text-[#00FF94] border border-[rgba(0,255,148,0.3)]' : 'bg-[rgba(255,255,255,0.03)] text-[#94A3B8] border border-transparent hover:bg-[rgba(255,255,255,0.08)]'}`}
            >
              {f}
              {f === 'Sin leer' && unreadCount > 0 && <span className="bg-[#EF4444] text-white text-[10px] px-1.5 py-0.5 rounded-full">{unreadCount}</span>}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center text-[#64748B]">Cargando mensajes...</div>
        ) : (
          <DataTable columns={columns} data={filtered} />
        )}

      </main>

      {/* Modal Lateral */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-[480px] bg-[#0D1117] h-full shadow-2xl flex flex-col animate-slide-left" style={{ borderLeft: '1px solid rgba(0,255,148,0.2)' }}>
            <div className="p-6 border-b border-[rgba(255,255,255,0.06)] flex justify-between items-center">
              <h3 className="font-orbitron font-bold text-lg text-[#F8FAFC]">Detalle del Mensaje</h3>
              <button onClick={() => setSelected(null)} className="text-[#64748B] hover:text-white text-2xl leading-none">&times;</button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto space-y-6 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[#64748B] uppercase text-[10px] tracking-widest font-bold mb-1">Remitente</div>
                  <div className="text-[#F8FAFC] font-medium">{selected.name}</div>
                </div>
                <div>
                  <div className="text-[#64748B] uppercase text-[10px] tracking-widest font-bold mb-1">Email</div>
                  <div className="text-[#0EA5E9]">{selected.email}</div>
                </div>
                <div>
                  <div className="text-[#64748B] uppercase text-[10px] tracking-widest font-bold mb-1">Teléfono</div>
                  <div className="text-[#F8FAFC]">{selected.phone || 'No proporcionado'}</div>
                </div>
                <div>
                  <div className="text-[#64748B] uppercase text-[10px] tracking-widest font-bold mb-1">Fecha</div>
                  <div className="text-[#F8FAFC]">{new Date(selected.created_at).toLocaleString('es-ES')}</div>
                </div>
              </div>

              <div>
                <div className="text-[#64748B] uppercase text-[10px] tracking-widest font-bold mb-1">Estado</div>
                <select 
                  value={selected.status}
                  onChange={e => updateStatus(selected.id, e.target.value)}
                  className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded px-3 py-2 text-[#F8FAFC] outline-none focus:border-[#00FF94] cursor-pointer"
                >
                  <option value="unread" className="bg-[#0D1117]">Sin leer</option>
                  <option value="read" className="bg-[#0D1117]">Leído</option>
                  <option value="replied" className="bg-[#0D1117]">Respondido</option>
                  <option value="archived" className="bg-[#0D1117]">Archivado</option>
                </select>
              </div>

              <div>
                <div className="text-[#64748B] uppercase text-[10px] tracking-widest font-bold mb-1">Asunto</div>
                <div className="text-[#F8FAFC] p-3 rounded bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] font-medium">
                  {selected.subject}
                </div>
              </div>

              <div>
                <div className="text-[#64748B] uppercase text-[10px] tracking-widest font-bold mb-1">Mensaje</div>
                <div className="text-[#94A3B8] p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] whitespace-pre-wrap">
                  {selected.message}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[rgba(255,255,255,0.06)] space-y-3">
              <a 
                href={`mailto:${selected.email}?subject=RE: ${selected.subject}`}
                onClick={() => { if (selected.status === 'unread') updateStatus(selected.id, 'read'); }}
                className="block w-full py-3 rounded-lg bg-[rgba(0,255,148,0.1)] text-[#00FF94] border border-[#00FF94] text-center font-bold hover:bg-[#00FF94] hover:text-[#020817] transition-all"
              >
                Responder por Email
              </a>
              <div className="flex gap-3">
                <button 
                  onClick={() => updateStatus(selected.id, 'archived')}
                  className="flex-1 py-2.5 rounded-lg bg-[rgba(255,255,255,0.05)] text-[#F8FAFC] hover:bg-[rgba(255,255,255,0.1)] transition-all font-medium"
                >
                  Archivar
                </button>
                <button 
                  onClick={() => deleteMessage(selected.id)}
                  className="flex-1 py-2.5 rounded-lg bg-[rgba(239,68,68,0.1)] text-[#EF4444] border border-[#EF4444]/30 hover:bg-[#EF4444] hover:text-white transition-all font-medium"
                >
                  Eliminar
                </button>
              </div>
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
