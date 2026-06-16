'use client';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function ServiceCard({ s, i, isEs, lang }: any) {
  const { ref, isRevealed } = useScrollReveal();
  return (
    <div ref={ref} className={`reveal-base ${isRevealed ? 'revealed' : ''} group bg-[rgba(14,165,233,0.04)] border border-[rgba(14,165,233,0.15)] rounded-[8px] p-[32px_24px] flex flex-col items-center text-center transition-all duration-400 hover:border-[rgba(14,165,233,0.5)] hover:shadow-[0_0_20px_rgba(14,165,233,0.1)] relative overflow-hidden`} style={{ transitionDelay: `${Math.min(i * 0.1, 0.5)}s` }}>
      <div className="w-16 h-16 bg-[rgba(14,165,233,0.1)] rounded-[8px] flex items-center justify-center text-[32px] text-brand-blue mb-6 group-hover:bg-[rgba(14,165,233,0.2)] transition-colors">
        {s.icon}
      </div>
      <h3 className="font-display font-semibold text-[18px] text-brand-text mb-3">{s.title}</h3>
      <p className="font-sans text-[14px] text-brand-muted mb-6 flex-1">{s.desc}</p>
      
      <div className="flex items-baseline gap-1 mb-6">
        <span className="font-sans text-[12px] text-brand-muted">{isEs ? 'desde' : 'from'}</span>
        <span className="font-orbitron font-bold text-[20px] text-brand-green">
          {s.price === '0' ? (isEs ? 'Gratis' : 'Free') : `${s.price}€`}
        </span>
      </div>
      
      <Link href={`/${lang}/servicios`} className="text-brand-blue font-sans text-[14px] font-medium flex items-center gap-2 group/btn">
        {isEs ? "Saber más" : "Learn more"}
        <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
      </Link>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-blue scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-400" />
    </div>
  );
}

export default function ServicesGrid({ isEs, lang }: { isEs: boolean, lang: string }) {
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal();
  const services = [
    { icon: '🔧', title: isEs ? 'Reparación de equipos' : 'Device Repair', price: '29', desc: isEs ? 'Electrónica avanzada.' : 'Advanced electronics.' },
    { icon: '💾', title: isEs ? 'Recuperación de datos' : 'Data Recovery', price: '49', desc: isEs ? 'Tus recuerdos a salvo.' : 'Your memories safe.' },
    { icon: '🧹', title: isEs ? 'Limpieza' : 'Cleaning', price: '19', desc: isEs ? 'Optimización profunda.' : 'Deep optimization.' },
    { icon: '📦', title: isEs ? 'Recogida de residuos' : 'Waste Collection', price: '0', desc: isEs ? '0% vertedero.' : 'Zero landfill.' },
  ];

  return (
    <section className="bg-brand-bg py-32 border-t border-[rgba(14,165,233,0.2)] relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className={`mb-16 reveal-base ${titleRevealed ? 'revealed' : ''}`}>
          <span className="font-orbitron text-[11px] text-brand-blue tracking-[3px] uppercase block mb-4">
            // SERVICIOS
          </span>
          <h2 className="font-orbitron font-bold text-[48px] text-brand-text mb-6">
            {isEs ? "Nuestros Servicios" : "Our Services"}
          </h2>
          <div className="w-[60px] h-[2px] bg-gradient-to-r from-brand-blue to-brand-purple mb-6" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={i} s={s} i={i} isEs={isEs} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
