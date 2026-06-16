'use client';

import { useEffect, useRef, useState } from 'react';

interface CounterCardProps {
  icon: string;
  value: number;
  suffix: string;
  label: string;
  color: 'green' | 'blue';
}

function CounterCard({ icon, value, suffix, label, color }: CounterCardProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, value]);

  const borderColor = color === 'green' ? 'border-brand-green/30 hover:border-brand-green/60' : 'border-brand-blue/30 hover:border-brand-blue/60';
  const textColor = color === 'green' ? 'text-brand-green' : 'text-brand-blue';
  const glowColor = color === 'green' ? 'bg-brand-green/5' : 'bg-brand-blue/5';

  return (
    <div ref={ref} className={`relative bg-brand-surface border ${borderColor} rounded-3xl p-10 text-center flex flex-col items-center gap-6 transition-all duration-500 hover:translate-y-[-4px] overflow-hidden group`}>
      <div className={`absolute inset-0 ${glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="text-5xl relative z-10">{icon}</div>
      <div className={`text-4xl md:text-5xl font-display font-bold ${textColor} relative z-10`}>
        {count.toLocaleString('es-ES')}{suffix}
      </div>
      <p className="text-sm text-brand-muted leading-relaxed relative z-10">{label}</p>
    </div>
  );
}

interface ImpactCountersProps {
  stats: { icon: string; value: number; suffix: string; label: string; color: 'green' | 'blue' }[];
}

export default function ImpactCounters({ stats }: ImpactCountersProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <CounterCard key={i} {...stat} />
      ))}
    </div>
  );
}
