'use client';

import Link from 'next/link';
import Image from 'next/image';
import ParticleBackground from '@/components/ui/ParticleBackground';
import TypingEffect from '@/components/ui/TypingEffect';
import AnimatedNumber from '@/components/ui/AnimatedNumber';

interface HeroProps {
  isEs: boolean;
}

export default function Hero({ isEs }: HeroProps) {
  const stats = [
    { label: isEs ? "reparaciones" : "repairs", icon: "🔧", num: "500", suffix: "+" },
    { label: isEs ? "CO₂ ahorrado" : "CO₂ saved", icon: "♻️", num: "2.3", suffix: "T" },
    { label: isEs ? "valoración" : "rating", icon: "⭐", num: "4.9", suffix: "/5" },
  ];

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#020817]">
      <div className="absolute inset-0 z-[-2]">
        <Image src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80" fill style={{ objectFit: 'cover' }} quality={85} alt="Circuit background" priority />
      </div>
      <div className="absolute inset-0 z-[-1]" style={{ background: 'linear-gradient(135deg, rgba(2,8,23,0.92) 0%, rgba(2,8,23,0.75) 50%, rgba(2,8,23,0.92) 100%)' }} />

      <ParticleBackground />

      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div className="absolute animate-slide-grid w-[200%] h-[200%] -top-[50%] -left-[50%]" 
          style={{
            backgroundImage: `linear-gradient(rgba(0,255,148,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,148,0.04) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} 
        />
      </div>
      
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full z-[1] pointer-events-none animate-[float-8s_ease-in-out_infinite_alternate]" style={{ background: 'radial-gradient(circle, #0EA5E9 0%, transparent 70%)', opacity: 0.08 }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full z-[1] pointer-events-none animate-[float-10s_ease-in-out_infinite_alternate-reverse]" style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)', opacity: 0.08 }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full z-[1] pointer-events-none" style={{ background: 'radial-gradient(circle, #00FF94 0%, transparent 70%)', opacity: 0.03 }} />

      <div className="relative z-[2] max-w-5xl mx-auto space-y-8 mt-16">
        <div className="animate-fade-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards', opacity: 0 }}>
          <span className="font-orbitron text-[12px] text-brand-green tracking-[4px] uppercase animate-pulse">
            [ TECH CIRCULAR ]
          </span>
        </div>

        <h1 className="font-orbitron font-bold text-[42px] md:text-[80px] leading-[1.1] tracking-tight">
          <span className="block text-brand-text animate-fade-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards', opacity: 0 }}>
            {isEs ? "Tecnología" : "Technology"}
          </span>
          <span className="block text-brand-text animate-fade-up" style={{ animationDelay: '0.7s', animationFillMode: 'forwards', opacity: 0 }}>
            {isEs ? "que vuelve" : "that lives"}
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-blue animate-gradient-shift opacity-0" style={{ animationName: 'fade-up, gradient-shift', animationDuration: '0.8s, 3s', animationDelay: '0.8s, 0s', animationFillMode: 'forwards, none', animationIterationCount: '1, infinite' }}>
            {isEs ? "a vivir" : "again"}
          </span>
        </h1>

        <p className="font-display text-[18px] text-brand-muted max-w-[560px] mx-auto animate-fade-up" style={{ animationDelay: '0.9s', animationFillMode: 'forwards', opacity: 0 }}>
          {isEs ? "Expertos en " : "Experts in "}
          <TypingEffect words={isEs ? ["equipos reacondicionados", "datos recuperados", "componentes reutilizados", "residuos reciclados"] : ["refurbished equipment", "recovered data", "reused components", "recycled waste"]} />
        </p>

        <div className="flex flex-wrap justify-center gap-6 pt-4 animate-fade-up" style={{ animationDelay: '1.2s', animationFillMode: 'forwards', opacity: 0 }}>
          <Link href={`/${isEs ? 'es' : 'en'}/catalogo`}>
            <button className="font-orbitron font-bold text-[14px] text-[#020817] px-[32px] py-[14px] rounded-[4px] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,148,0.5)]" style={{ background: 'linear-gradient(135deg, #00FF94, #0EA5E9)' }}>
              {isEs ? "Ver Catálogo" : "Browse Catalog"}
            </button>
          </Link>
          <Link href={`/${isEs ? 'es' : 'en'}/presupuesto`}>
            <button className="font-orbitron text-[14px] text-brand-green px-[32px] py-[14px] rounded-[4px] border border-[rgba(0,255,148,0.5)] bg-transparent hover:bg-[rgba(0,255,148,0.1)] hover:border-brand-green transition-all duration-300 group flex items-center gap-2">
              {isEs ? "Calcular presupuesto" : "Get a quote"}
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-12 animate-fade-up" style={{ animationDelay: '1.5s', animationFillMode: 'forwards', opacity: 0 }}>
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-3 rounded-full bg-[rgba(13,17,23,0.9)] backdrop-blur-[10px] border border-[rgba(0,255,148,0.2)] hover:border-[rgba(0,255,148,0.6)] hover:shadow-[0_0_20px_rgba(0,255,148,0.3)] transition-all duration-300 group">
              <span className="font-orbitron font-bold text-brand-green group-hover:scale-110 transition-transform flex items-baseline">
                <AnimatedNumber end={parseFloat(stat.num)} decimals={stat.num.includes('.') ? 1 : 0} />
                {stat.suffix}
              </span>
              <div className="w-[1px] h-4 bg-[rgba(0,255,148,0.2)]"></div>
              <span className="font-sans text-[14px] text-brand-muted">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

