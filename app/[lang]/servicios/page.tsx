import { type Locale } from '@/lib/i18n';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Link from 'next/link';

export default async function ServicesPage({ params: { lang } }: { params: { lang: Locale } }) {
  const isEs = lang === 'es';

  const services = [
    {
      id: 'repair',
      icon: '🔧',
      title: isEs ? 'REPARACIÓN DE EQUIPOS' : 'EQUIPMENT REPAIR',
      price: isEs ? 'Desde 29€' : 'From 29€',
      desc: isEs 
        ? 'Diagnóstico completo, reparación de placa base, pantallas, teclados, puertos de carga y más.'
        : 'Full diagnosis, motherboard repair, screens, keyboards, charging ports and more.',
      includes: isEs 
        ? ['Diagnóstico gratuito', 'Garantía 6 meses en la reparación', 'Piezas originales o equivalentes certificadas']
        : ['Free diagnosis', '6-month repair warranty', 'Original or certified equivalent parts'],
      time: isEs ? '24-72 horas' : '24-72 hours'
    },
    {
      id: 'recovery',
      icon: '💾',
      title: isEs ? 'RECUPERACIÓN DE DATOS' : 'DATA RECOVERY',
      price: isEs ? 'Desde 49€' : 'From 49€',
      desc: isEs 
        ? 'Recuperamos datos de discos duros dañados, SSDs, pendrives y tarjetas SD.'
        : 'We recover data from damaged hard drives, SSDs, pendrives, and SD cards.',
      includes: isEs 
        ? ['Evaluación sin coste', 'Tasa de éxito >85%', 'Confidencialidad total']
        : ['No-cost evaluation', 'Success rate >85%', 'Total confidentiality'],
      time: isEs ? '3-7 días' : '3-7 days'
    },
    {
      id: 'cleaning',
      icon: '🧹',
      title: isEs ? 'LIMPIEZA Y MANTENIMIENTO' : 'CLEANING & MAINTENANCE',
      price: isEs ? 'Desde 19€' : 'From 19€',
      desc: isEs 
        ? 'Limpieza interna completa, sustitución de pasta térmica, optimización de rendimiento.'
        : 'Full internal cleaning, thermal paste replacement, performance optimization.',
      includes: isEs 
        ? ['Limpieza de ventiladores', 'Revisión de conectores', 'Reporte de estado']
        : ['Fan cleaning', 'Connector check', 'Status report'],
      time: isEs ? '2-4 horas' : '2-4 hours'
    },
    {
      id: 'upgrade',
      icon: '⚡',
      title: isEs ? 'AMPLIACIÓN RAM/SSD' : 'RAM/SSD UPGRADE',
      price: isEs ? 'Desde 25€' : 'From 25€',
      desc: isEs 
        ? 'Duplica la velocidad y capacidad de tu equipo con nuestras ampliaciones certificadas.'
        : 'Double your equipment speed and capacity with our certified upgrades.',
      includes: isEs 
        ? ['Componentes incluidos en precio final', 'Migración de datos sin pérdida', 'Prueba de rendimiento']
        : ['Components included in final price', 'Lossless data migration', 'Performance test'],
      time: isEs ? '1-2 horas' : '1-2 hours'
    },
    {
      id: 'os',
      icon: '💻',
      title: isEs ? 'INSTALACIÓN DE SISTEMAS' : 'SYSTEM INSTALLATION',
      price: isEs ? 'Desde 39€' : 'From 39€',
      desc: isEs 
        ? 'Windows, Linux, macOS. Instalación limpia, drivers y software básico incluido.'
        : 'Windows, Linux, macOS. Clean install, drivers and basic software included.',
      includes: isEs 
        ? ['SO original o libre', 'Configuración completa', 'Backup previo de datos']
        : ['Original or free OS', 'Full configuration', 'Prior data backup'],
      time: isEs ? '2-4 horas' : '2-4 hours'
    },
    {
      id: 'recycling',
      icon: '♻️',
      title: isEs ? 'RECOGIDA DE RESIDUOS' : 'WASTE COLLECTION',
      price: isEs ? 'GRATIS' : 'FREE',
      desc: isEs 
        ? 'Recogemos en tu domicilio o empresa cualquier aparato electrónico en desuso.'
        : 'We pick up any disused electronic device at your home or company.',
      includes: isEs 
        ? ['Recogida gratuita', 'Certificado de reciclaje', 'Destrucción segura de datos']
        : ['Free pickup', 'Recycling certificate', 'Secure data destruction'],
      time: isEs ? 'Cita en 48h' : 'Appointment in 48h'
    }
  ];

  const steps = [
    { n: '1', title: isEs ? 'Contacto' : 'Contact' },
    { n: '2', title: isEs ? 'Diagnóstico' : 'Diagnosis' },
    { n: '3', title: isEs ? 'Presupuesto' : 'Quote' },
    { n: '4', title: isEs ? 'Reparación' : 'Repair' },
    { n: '5', title: isEs ? 'Entrega' : 'Delivery' }
  ];

  return (
    <div className="bg-brand-bg pb-20">
      {/* HERO DE SECCIÓN */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden border-b border-brand-border bg-dot-grid">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-green/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
           <div className="inline-block px-3 py-1 rounded-full border border-brand-blue/20 bg-brand-blue/5 text-brand-blue text-[10px] font-bold uppercase tracking-widest mb-6">
             ISO-Certified Quality
           </div>
           <h1 className="text-4xl md:text-6xl font-display font-bold text-brand-text mb-6">
             {isEs ? 'Servicios Técnicos' : 'Technical Services'}
           </h1>
           <p className="text-lg md:text-xl text-brand-muted max-w-2xl mx-auto">
             {isEs ? 'Profesionales certificados. Presupuesto sin compromiso en 24h.' : 'Certified professionals. Free quote in 24h.'}
           </p>
        </div>

        {/* Abstract circuits SVG background decoration */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 opacity-10 pointer-events-none">
          <svg width="1200" height="200" viewBox="0 0 1200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100 H1200 M100 0 V200 M200 0 V200 M300 0 V200 M400 0 V200 M500 0 V200 M600 0 V200 M700 0 V200 M800 0 V200 M900 0 V200 M1000 0 V200 M1100 0 V200" stroke="#22C55E" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="4" fill="#22C55E"/>
            <circle cx="400" cy="50" r="4" fill="#22C55E"/>
            <circle cx="800" cy="150" r="4" fill="#3B82F6"/>
          </svg>
        </div>
      </section>

      {/* SERVICIOS DETALLADOS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <Card key={s.id} className="flex flex-col p-10 h-full border-brand-border/40 hover:border-brand-green/40 transition-all duration-500 hover:translate-y-[-4px]">
              <div className="text-5xl mb-8">{s.icon}</div>
              <h3 className="text-xl font-display font-bold text-brand-text mb-2 tracking-tight">{s.title}</h3>
              <div className="text-brand-green font-display font-bold mb-6 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                {s.price}
              </div>
              <p className="text-sm text-brand-muted mb-8 leading-relaxed flex-1">
                {s.desc}
              </p>
              
              <div className="space-y-4 pt-6 border-t border-brand-border/50">
                <ul className="space-y-3">
                  {s.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-brand-text/70">
                      <span className="text-brand-blue mt-0.5">▪</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-[10px] font-bold text-brand-muted uppercase tracking-wider pt-2">
                  <span className="text-brand-blue">⏱ Tiempo estimado:</span>
                  <span className="text-brand-text">{s.time}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* PROCESO DE TRABAJO */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-brand-border">
        <h2 className="text-3xl font-display font-bold text-brand-text text-center mb-20">{isEs ? 'Nuestro Proceso' : 'Our Process'}</h2>
        
        <div className="relative">
          {/* Connecting lines desktop */}
          <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-px bg-gradient-to-r from-brand-green via-brand-blue to-brand-green opacity-30" />
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-row lg:flex-col items-center gap-6 lg:gap-8 group">
                <div className="w-14 h-14 rounded-2xl bg-brand-surface border border-brand-border flex items-center justify-center text-xl font-display font-bold text-brand-green group-hover:scale-110 transition-transform shadow-xl shadow-black/20">
                  {step.n}
                </div>
                <div className="flex-1 lg:text-center text-brand-text font-bold text-sm md:text-base">
                  {step.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-4 py-24 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="bg-brand-surface border border-brand-border rounded-[40px] p-10 md:p-16 relative overflow-hidden">
           <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-green/10 rounded-full blur-[80px]" />
           <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-text mb-6 relative z-10">
             {isEs ? '¿No sabes qué servicio necesitas?' : "Don't know which service you need?"}
           </h2>
           <p className="text-brand-muted mb-10 text-lg relative z-10">
             {isEs ? 'Usa nuestro simulador de presupuesto y obtén una respuesta personalizada.' : 'Use our quote simulator and get a personalized response.'}
           </p>
           <Link href={`/${lang}/presupuesto`}>
             <Button size="lg" className="px-12 relative z-10 shadow-2xl hover:translate-y-[-2px]">
               {isEs ? 'Simular Presupuesto' : 'Simulate Quote'}
             </Button>
           </Link>
        </div>
      </section>
    </div>
  );
}
