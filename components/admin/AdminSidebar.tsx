'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminSidebar({ role, email, name }: { role: string; email: string; name: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const [unreadMsg, setUnreadMsg] = useState(0);
  const [pendingBudg, setPendingBudg] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const { count: msgCount } = await supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'unread');
      const { count: budgCount } = await supabase.from('budget_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending');
      if (msgCount !== null) setUnreadMsg(msgCount);
      if (budgCount !== null) setPendingBudg(budgCount);
    };
    fetchCounts();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', href: '/admin/dashboard', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
    ) },
    { key: 'productos', label: 'Productos', href: '/admin/productos', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
    ) },
    { key: 'mensajes', label: 'Mensajes', href: '/admin/mensajes', badge: unreadMsg, badgeColor: '#EF4444', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
    ) },
    { key: 'presupuestos', label: 'Presupuestos', href: '/admin/presupuestos', badge: pendingBudg, badgeColor: '#F59E0B', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    ) },
    ...(role === 'superadmin' ? [{ key: 'admins', label: 'Administradores', href: '/admin/admins', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ) }] : []),
    { key: 'configuracion', label: 'Configuración', href: '/admin/configuracion', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    ) },
  ];

  return (
    <aside className="hidden md:flex flex-col w-[260px] sticky top-0 h-screen" style={{ background: '#0D1117', borderRight: '1px solid rgba(0,255,148,0.1)' }}>
      {/* CABECERA DEL SIDEBAR */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-orbitron font-bold text-[#F8FAFC]">ReparaTech</span>
          <span className="bg-[rgba(0,255,148,0.1)] text-[#00FF94] text-[10px] font-orbitron tracking-widest px-1.5 py-0.5 rounded">ADMIN</span>
        </div>
        <div className="text-[12px] text-[#64748B] truncate">{email}</div>
      </div>

      {/* NAVEGACIÓN */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.key}
              href={item.href}
              className="flex items-center justify-between transition-all"
              style={{
                padding: '12px 20px',
                borderRadius: '6px',
                background: isActive ? 'rgba(0,255,148,0.08)' : 'transparent',
                color: isActive ? '#00FF94' : '#94A3B8',
                borderLeft: isActive ? '3px solid #00FF94' : '3px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.color = '#F8FAFC';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#94A3B8';
                }
              }}
            >
              <div className="flex items-center gap-3">
                <span style={{ color: isActive ? '#00FF94' : '#64748B' }}>{item.icon}</span>
                <span className="font-medium text-[14px]">{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: item.badgeColor, color: '#fff' }}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER DEL SIDEBAR */}
      <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-5 py-3 rounded-md text-[#64748B] transition-all text-[14px] font-medium"
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#EF4444';
            e.currentTarget.style.background = 'rgba(239,68,68,0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#64748B';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
