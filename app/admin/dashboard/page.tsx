import { createClient } from '@/lib/supabase/server';
import AdminHeader from '@/components/admin/AdminHeader';
import StatCard from '@/components/admin/StatCard';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';

function timeAgo(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return 'Hace menos de 1 hora';
  if (hours < 24) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
  const days = Math.floor(hours / 24);
  return `Hace ${days} día${days > 1 ? 's' : ''}`;
}

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: admin } = await supabase.from('admin_users').select('name, role').eq('email', user?.email).single();

  const hour = new Date().getHours();
  const greeting = hour < 14 ? 'Buenos días' : 'Buenas tardes';

  // Stats
  const [{ count: unreadMsgs }, { count: pendingBudgets }, { count: activeProducts }, { count: totalAdmins }] = await Promise.all([
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'unread'),
    supabase.from('budget_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('active', true),
    supabase.from('admin_users').select('*', { count: 'exact', head: true })
  ]);

  // Recent activity
  const [{ data: recentMsgs }, { data: recentBudgets }] = await Promise.all([
    supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(5),
    supabase.from('budget_requests').select('*').order('created_at', { ascending: false }).limit(5),
  ]);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar role={admin?.role || 'admin'} email={user?.email || ''} name={admin?.name || ''} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Dashboard" name={admin?.name} />
        <main className="p-6 md:p-8">
          
          {/* SECCIÓN 1 — SALUDO */}
          <div className="mb-10">
            <h2 className="font-orbitron font-bold text-3xl text-[#F8FAFC] mb-2">{greeting}, {admin?.name?.split(' ')[0] || 'Admin'}</h2>
            <p className="font-sans text-[16px] text-[#94A3B8]">Aquí tienes el resumen de hoy</p>
          </div>

          {/* SECCIÓN 2 — STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            <StatCard icon="📨" title="Mensajes nuevos" value={unreadMsgs || 0} color="#0EA5E9" variation={12} />
            <StatCard icon="💰" title="Presupuestos pendientes" value={pendingBudgets || 0} color="#F59E0B" variation={5} />
            <StatCard icon="📦" title="Productos activos" value={activeProducts || 0} color="#00FF94" variation={0} />
            <StatCard icon="👥" title="Total admins" value={totalAdmins || 0} color="#A855F7" />
          </div>

          {/* SECCIÓN 3 — ACTIVIDAD RECIENTE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            
            {/* Mensajes */}
            <div className="bg-[rgba(13,17,23,0.6)] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden flex flex-col">
              <div className="p-6 border-b border-[rgba(255,255,255,0.06)] flex justify-between items-center">
                <h3 className="font-orbitron font-bold text-lg text-[#F8FAFC]">Últimos mensajes</h3>
                <Link href="/admin/mensajes" className="text-[13px] text-[#0EA5E9] hover:text-[#38BDF8]">Ver todos →</Link>
              </div>
              <div className="flex-1 divide-y divide-[rgba(255,255,255,0.06)]">
                {recentMsgs?.length ? recentMsgs.map(m => (
                  <div key={m.id} className="p-5 flex items-center justify-between hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <div>
                      <div className="font-medium text-[#F8FAFC] text-[15px] mb-1">{m.name}</div>
                      <div className="text-[13px] text-[#94A3B8]">{m.subject || 'Sin asunto'}</div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold mb-2 ${m.status === 'unread' ? 'bg-[#0EA5E9]/20 text-[#0EA5E9]' : 'bg-[#64748B]/20 text-[#94A3B8]'}`}>
                        {m.status.toUpperCase()}
                      </span>
                      <div className="text-[12px] text-[#64748B]">{timeAgo(m.created_at)}</div>
                    </div>
                  </div>
                )) : (
                  <div className="p-8 text-center text-[#64748B]">No hay mensajes recientes</div>
                )}
              </div>
            </div>

            {/* Presupuestos */}
            <div className="bg-[rgba(13,17,23,0.6)] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden flex flex-col">
              <div className="p-6 border-b border-[rgba(255,255,255,0.06)] flex justify-between items-center">
                <h3 className="font-orbitron font-bold text-lg text-[#F8FAFC]">Últimos presupuestos</h3>
                <Link href="/admin/presupuestos" className="text-[13px] text-[#F59E0B] hover:text-[#FBBF24]">Ver todos →</Link>
              </div>
              <div className="flex-1 divide-y divide-[rgba(255,255,255,0.06)]">
                {recentBudgets?.length ? recentBudgets.map(b => (
                  <div key={b.id} className="p-5 flex items-center justify-between hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <div>
                      <div className="font-medium text-[#F8FAFC] text-[15px] mb-1">{b.name || 'Cliente anónimo'}</div>
                      <div className="text-[13px] text-[#94A3B8]">{b.device_type} • {b.model || 'Modelo genérico'}</div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold mb-2 ${b.status === 'pending' ? 'bg-[#F59E0B]/20 text-[#F59E0B]' : 'bg-[#64748B]/20 text-[#94A3B8]'}`}>
                        {b.status.toUpperCase()}
                      </span>
                      <div className="text-[14px] font-orbitron font-bold text-[#F8FAFC]">{b.estimated_total ? `${b.estimated_total}€` : '--'}</div>
                    </div>
                  </div>
                )) : (
                  <div className="p-8 text-center text-[#64748B]">No hay presupuestos recientes</div>
                )}
              </div>
            </div>

          </div>

          {/* SECCIÓN 4 — ACCIONES RÁPIDAS */}
          <h3 className="font-orbitron font-bold text-lg text-[#F8FAFC] mb-6">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/admin/productos/nuevo" className="flex items-center justify-center gap-3 p-4 bg-[rgba(0,255,148,0.1)] border border-[rgba(0,255,148,0.3)] text-[#00FF94] rounded-lg font-medium hover:bg-[rgba(0,255,148,0.15)] transition-colors">
              ➕ Añadir producto
            </Link>
            <Link href="/admin/mensajes?filter=unread" className="flex items-center justify-center gap-3 p-4 bg-[rgba(14,165,233,0.1)] border border-[rgba(14,165,233,0.3)] text-[#0EA5E9] rounded-lg font-medium hover:bg-[rgba(14,165,233,0.15)] transition-colors">
              📧 Ver mensajes sin leer
            </Link>
            <Link href="/" target="_blank" className="flex items-center justify-center gap-3 p-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#F8FAFC] rounded-lg font-medium hover:bg-[rgba(255,255,255,0.08)] transition-colors">
              🔗 Ver la tienda
            </Link>
          </div>

        </main>
      </div>
    </div>
  );
}
