'use client';

import { useState, useEffect } from 'react';

export default function AdminHeader({ title, name }: { title: string; name?: string }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleDateString('es-ES', { 
        weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' 
      }));
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  const init = name ? name.substring(0, 2).toUpperCase() : 'AD';

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-4" style={{ background: 'rgba(13,17,23,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <h1 className="font-orbitron font-bold text-xl text-[#F8FAFC]">{title}</h1>
      
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <div className="text-[14px] font-medium text-[#F8FAFC] capitalize">{time}</div>
          <div className="text-[12px] text-[#64748B]">{name || 'Administrador'}</div>
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-orbitron font-bold text-[#020817] text-[14px]" style={{ background: 'linear-gradient(135deg, #00FF94, #0EA5E9)' }}>
          {init}
        </div>
      </div>
    </header>
  );
}
