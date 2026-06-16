'use client';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function TestimonialCard({ t, i }: any) {
  const { ref, isRevealed } = useScrollReveal();
  return (
    <div ref={ref} className={`reveal-base ${isRevealed ? 'revealed' : ''} group relative bg-[rgba(13,17,23,0.9)] border border-[rgba(168,85,247,0.2)] rounded-[8px] p-8 pt-12 transition-all duration-400 hover:border-[rgba(168,85,247,0.5)] hover:shadow-[0_0_20px_rgba(168,85,247,0.08)]`} style={{ transitionDelay: `${Math.min(i * 0.1, 0.5)}s` }}>
      <div className="absolute top-4 left-4 font-orbitron text-[80px] text-brand-purple opacity-30 leading-none pointer-events-none">
        &quot;
      </div>
      <p className="font-sans text-[15px] text-[#CBD5E1] italic mb-8 relative z-10 leading-relaxed">
        {t.text}
      </p>
      
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, j) => (
          <span key={j} className={`text-[14px] ${j < t.stars ? 'text-[#F59E0B]' : 'text-brand-border'}`}>★</span>
        ))}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center font-orbitron font-bold text-white text-[16px] shadow-[0_0_10px_rgba(168,85,247,0.3)]" style={{ background: 'linear-gradient(135deg, #A855F7, #0EA5E9)' }}>
          {t.init}
        </div>
        <div>
          <h4 className="font-display font-semibold text-brand-text text-[16px]">{t.name}</h4>
          <p className="font-sans text-[13px] text-[#64748B]">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials({ isEs }: { isEs: boolean }) {
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal();
  const testimonials = [
    { name: 'Elena García', init: 'EG', role: 'Diseñadora Freelance', text: isEs ? 'El MacBook Pro que compré parece nuevo. Increíble servicio y atención.' : 'The MacBook Pro I bought looks new. Incredible service and attention.', stars: 5 },
    { name: 'Marco Rossi', init: 'MR', role: 'IT Manager', text: isEs ? 'Repararon mi laptop en 24h cuando otros daban por perdida la placa.' : 'They repaired my laptop in 24h when others gave up on the board.', stars: 5 },
    { name: 'Sara Smith', init: 'SS', role: 'Estudiante', text: isEs ? 'Muy contenta con mi nuevo iPhone refurbished. El planeta lo agradece.' : 'Very happy with my new refurbished iPhone. The planet thanks you.', stars: 4 },
  ];

  return (
    <section className="bg-brand-surface py-32 relative border-t border-[rgba(168,85,247,0.2)] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-purple to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className={`text-center mb-16 reveal-base ${titleRevealed ? 'revealed' : ''}`}>
          <span className="font-orbitron text-[11px] text-brand-purple tracking-[3px] uppercase block mb-4">
            // OPINIONES
          </span>
          <h2 className="font-orbitron font-bold text-[48px] text-brand-text mb-6">
            {isEs ? "Testimonios" : "Testimonials"}
          </h2>
          <div className="w-[60px] h-[2px] bg-gradient-to-r from-brand-purple to-brand-green mx-auto mb-6" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
