'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import AdminHeader from '@/components/admin/AdminHeader';
import DataTable, { Column } from '@/components/admin/DataTable';

export default function AdminsPage() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSuperadmin, setIsSuperadmin] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'admin' });
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    checkRoleAndFetch();
  }, [supabase]);

  const checkRoleAndFetch = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUser(user);
      const { data: dbUser } = await supabase.from('admin_users').select('role').eq('id', user.id).single();
      if (dbUser?.role === 'superadmin') {
        setIsSuperadmin(true);
        fetchAdmins();
      } else {
        setLoading(false);
      }
    }
  };

  const fetchAdmins = async () => {
    const res = await fetch('/api/admin/admins');
    const data = await res.json();
    if (data.admins) setAdmins(data.admins);
    setLoading(false);
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch('/api/admin/admins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (data.success) {
      setAdmins(prev => [data.admin, ...prev]);
      setShowModal(false);
      setFormData({ name: '', email: '', role: 'admin' });
    } else {
      alert(data.error || 'Error al añadir administrador');
    }
    setSaving(false);
  };

  const handleDeleteAdmin = async (id: string) => {
    if (id === currentUser?.id) {
      alert('No puedes eliminarte a ti mismo.');
      return;
    }
    if (!confirm('¿Seguro que deseas eliminar este administrador? Perderá acceso inmediatamente.')) return;
    
    const res = await fetch(`/api/admin/admins/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setAdmins(prev => prev.filter(a => a.id !== id));
    } else {
      alert(data.error || 'Error al eliminar');
    }
  };

  const columns: Column<any>[] = [
    { key: 'name', label: 'Nombre', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { 
      key: 'role', 
      label: 'Rol', 
      sortable: true,
      render: (row) => (
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${row.role === 'superadmin' ? 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30' : 'bg-[#00FF94]/20 text-[#00FF94] border border-[#00FF94]/30'}`}>
          {row.role}
        </span>
      )
    },
    { 
      key: 'created_at', 
      label: 'Fecha Creación', 
      sortable: true,
      render: (row) => new Date(row.created_at).toLocaleDateString('es-ES')
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (row) => (
        row.id !== currentUser?.id ? (
          <button 
            onClick={() => handleDeleteAdmin(row.id)}
            className="px-4 py-1.5 rounded bg-[rgba(239,68,68,0.1)] text-[#EF4444] border border-[#EF4444]/30 hover:bg-[#EF4444] hover:text-white text-sm font-medium transition-colors"
          >
            Eliminar
          </button>
        ) : (
          <span className="text-[#64748B] text-sm italic">Tú</span>
        )
      )
    }
  ];

  if (loading) return <div className="p-8 text-[#94A3B8]">Verificando permisos...</div>;

  if (!isSuperadmin) {
    return (
      <>
        <AdminHeader title="Gestión de Administradores" />
        <main className="p-8">
          <div className="bg-[rgba(239,68,68,0.1)] border border-[#EF4444]/30 p-6 rounded-xl text-center">
            <h2 className="text-[#EF4444] font-orbitron font-bold text-xl mb-2">Acceso Denegado</h2>
            <p className="text-[#F8FAFC]">Solo los superadministradores pueden acceder a esta sección.</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AdminHeader title="Gestión de Administradores" />
      <main className="p-6 md:p-8">
        <div className="flex justify-end mb-8">
          <button onClick={() => setShowModal(true)} className="px-5 py-2.5 bg-[rgba(0,255,148,0.1)] text-[#00FF94] border border-[rgba(0,255,148,0.3)] rounded-lg hover:bg-[rgba(0,255,148,0.2)] transition-colors font-bold">
            ➕ Añadir administrador
          </button>
        </div>

        <DataTable columns={columns} data={admins} />

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !saving && setShowModal(false)} />
            <div className="relative bg-[rgba(13,17,23,0.95)] border border-[rgba(0,255,148,0.2)] rounded-xl w-full max-w-md p-6 shadow-2xl animate-fade-up">
              <h3 className="font-orbitron font-bold text-xl text-[#F8FAFC] mb-6">Añadir Administrador</h3>
              <form onSubmit={handleAddAdmin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#64748B] uppercase mb-1">Nombre</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded px-4 py-2 text-[#F8FAFC] outline-none focus:border-[#00FF94]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#64748B] uppercase mb-1">Email</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded px-4 py-2 text-[#F8FAFC] outline-none focus:border-[#00FF94]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#64748B] uppercase mb-1">Rol</label>
                  <select required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded px-4 py-2 text-[#F8FAFC] outline-none focus:border-[#00FF94] cursor-pointer">
                    <option value="admin" className="bg-[#0D1117]">Administrador</option>
                    <option value="superadmin" className="bg-[#0D1117]">Super Administrador</option>
                  </select>
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setShowModal(false)} disabled={saving} className="flex-1 py-2 rounded-lg border border-[rgba(255,255,255,0.1)] text-[#94A3B8] hover:bg-white/5 transition-colors">Cancelar</button>
                  <button type="submit" disabled={saving} className="flex-1 py-2 rounded-lg bg-[rgba(0,255,148,0.1)] text-[#00FF94] border border-[#00FF94]/30 hover:bg-[#00FF94] hover:text-black transition-all font-bold disabled:opacity-50">
                    {saving ? 'Enviando...' : 'Invitar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
