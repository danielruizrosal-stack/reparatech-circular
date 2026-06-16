'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useState } from 'react';

export default function SustainabilityStats({ isEs, lang }: { isEs: boolean, lang: string }) {
  const { ref, isRevealed } = useScrollReveal();
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate parallax specifically considering typical positions of this section.
  const parallaxOffset = (offsetY - 1500) * 0.3;

  return (
    <section className="bg-[#020817] py-24 relative border-y border-[rgba(0,255,148,0.3)] overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0" style={{ transform: `translateY(${parallaxOffset}px)`, transition: 'transform 0.1s linear', height: '150%' }}>
        <Image src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80" fill style={{ objectFit: 'cover' }} alt="Nature background" />
      </div>
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(2,8,23,0.88)' }} />

      {/* Scanner effect */}
      <div className="absolute inset-0 z-[2] pointer-events-none animate-scanline">
        <div className="w-full h-[100px] bg-gradient-to-b from-transparent via-[rgba(0,255,148,0.1)] to-transparent opacity-30" />
      </div>

      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-green to-transparent z-[2]" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-green to-transparent z-[2]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[3]">
        <div ref={ref} className={`flex flex-col md:flex-row items-center justify-between gap-12 reveal-base ${isRevealed ? 'revealed' : ''}`}>
          <div className="max-w-2xl">
            <h2 className="font-orbitron font-bold text-[36px] text-brand-text mb-6 leading-tight">
              {isEs 
                ? <>Cada reparación es un <span className="text-brand-green drop-shadow-[0_0_20px_rgba(0,255,148,0.3)]">CO₂</span> que no emites.</>
                : <>Every repair is <span className="text-brand-green drop-shadow-[0_0_20px_rgba(0,255,148,0.3)]">CO₂</span> you don&apos;t emit.</>}
            </h2>
            <p className="font-display text-[16px] text-brand-muted mb-8">
              {isEs ? "Únete al movimiento circular." : "Join the circular movement."}
            </p>
            <Link href={`/${lang}/sostenibilidad`}>
              <button className="font-orbitron font-bold text-[14px] text-[#020817] px-[32px] py-[14px] rounded-[4px] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,148,0.5)]" style={{ background: 'linear-gradient(135deg, #00FF94, #0EA5E9)' }}>
                {isEs ? "Nuestro Compromiso" : "Our Commitment"}
              </button>
            </Link>
          </div>
          
          <div className="relative flex-shrink-0">
            <svg width="180" height="180" viewBox="0 0 100 100" className="animate-[spin_10s_linear_infinite]" aria-hidden="true" style={{ filter: 'drop-shadow(0 0 20px rgba(0,255,148,0.3))' }}>
              <circle cx="50" cy="50" r="45" fill="none" stroke="#00FF94" strokeWidth="2" strokeDasharray="10 5" opacity="0.5" />
              <path d="M50 20 L50 80 M20 50 L80 50" stroke="#00FF94" strokeWidth="1" opacity="0.3" />
              <path d="M50 30 Q70 30 70 50 Q70 70 50 70 Q30 70 30 50 Q30 30 50 30 Z" fill="none" stroke="#00FF94" strokeWidth="2" />
              <circle cx="50" cy="50" r="4" fill="#0EA5E9" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
