import { type Locale } from '@/lib/i18n';
import ImpactCounters from '@/components/sections/ImpactCounters';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function SustainabilityPage({ params: { lang } }: { params: { lang: Locale } }) {
  const isEs = lang === 'es';

  const stats = [
    { icon: '🔧', value: 1247, suffix: '', label: isEs ? 'equipos reparados este año' : 'devices repaired this year', color: 'green' as const },
    { icon: '♻️', value: 38,   suffix: ' T',  label: isEs ? 'toneladas de residuos gestionados' : 'tons of waste managed', color: 'blue' as const },
    { icon: '🌱', value: 124,  suffix: ' T',  label: isEs ? 'toneladas de CO₂ evitadas' : 'tons of CO₂ avoided', color: 'green' as const },
    { icon: '💶', value: 189,  suffix: 'k€',  label: isEs ? 'ahorrados por clientes' : 'saved by clients', color: 'blue' as const },
  ];

  const practices = [
    {
      icon: '🛠️',
      title: isEs ? 'Reparación primero' : 'Repair First',
      desc: isEs
        ? 'Antes de reciclar, siempre intentamos reparar y dar una segunda vida al equipo. Si lo arreglamos, tú ahorras y el planeta agradece.'
        : 'Before recycling, we always try to repair and give the device a second life. If we fix it, you save money and the planet benefits.',
    },
    {
      icon: '🚫',
      title: isEs ? 'Cero residuos al vertedero' : 'Zero Landfill Waste',
      desc: isEs
        ? 'Todos los componentes no reutilizables se entregan a gestores autorizados según la normativa RAEE vigente en España y la UE.'
        : 'All non-reusable components are delivered to authorized managers according to current WEEE regulations in Spain and the EU.',
    },
    {
      icon: '🔐',
      title: isEs ? 'Datos seguros' : 'Secure Data',
      desc: isEs
        ? 'Destrucción certificada de datos en todos los equipos que gestionamos, cumpliendo la norma DoD 5220.22-M de borrado seguro.'
        : 'Certified data destruction on all devices we manage, complying with the DoD 5220.22-M secure erasure standard.',
    },
  ];

  const certifications = [
    { code: 'ISO\n14001', name: isEs ? 'Gestión Ambiental' : 'Environmental Management', accent: '#22C55E' },
    { code: 'RAEE',       name: isEs ? 'Gestor Autorizado' : 'Authorized Manager',         accent: '#3B82F6' },
    { code: 'R2',         name: isEs ? 'Responsible Recycling' : 'Responsible Recycling',  accent: '#22C55E' },
  ];

  return (
    <div className="bg-brand-bg overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-24">
        {/* Earth + Circuits SVG background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <svg width="720" height="720" viewBox="0 0 720 720" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.07]">
            {/* Earth circle */}
            <circle cx="360" cy="360" r="280" stroke="#22C55E" strokeWidth="1.5" strokeDasharray="8 4"/>
            <circle cx="360" cy="360" r="220" stroke="#3B82F6" strokeWidth="0.8" strokeDasharray="4 6"/>
            <circle cx="360" cy="360" r="160" stroke="#22C55E" strokeWidth="0.5"/>
            {/* Continent blobs */}
            <ellipse cx="310" cy="310" rx="60" ry="80" fill="#22C55E" opacity="0.4"/>
            <ellipse cx="430" cy="360" rx="45" ry="60" fill="#22C55E" opacity="0.3"/>
            <ellipse cx="360" cy="440" rx="70" ry="30" fill="#22C55E" opacity="0.2"/>
            {/* Circuit traces radiating out */}
            <path d="M360 80 L360 30 M360 30 L320 30 M320 30 L320 10" stroke="#22C55E" strokeWidth="1" strokeLinecap="round"/>
            <path d="M360 80 L360 30 M360 30 L400 30 M400 30 L400 10" stroke="#22C55E" strokeWidth="1" strokeLinecap="round"/>
            <path d="M640 360 L700 360 M700 360 L700 320 M700 320 L720 320" stroke="#3B82F6" strokeWidth="1" strokeLinecap="round"/>
            <path d="M640 360 L700 360 M700 360 L700 400" stroke="#3B82F6" strokeWidth="1" strokeLinecap="round"/>
            <path d="M80 360 L20 360 M20 360 L20 340" stroke="#22C55E" strokeWidth="1" strokeLinecap="round"/>
            <path d="M360 640 L360 700 M360 700 L340 700" stroke="#3B82F6" strokeWidth="1" strokeLinecap="round"/>
            {/* Nodes */}
            <circle cx="360" cy="30" r="4" fill="#22C55E"/>
            <circle cx="700" cy="360" r="4" fill="#3B82F6"/>
            <circle cx="20" cy="360" r="4" fill="#22C55E"/>
            <circle cx="360" cy="700" r="4" fill="#3B82F6"/>
            <circle cx="160" cy="160" r="6" fill="none" stroke="#22C55E" strokeWidth="1.5"/>
            <circle cx="560" cy="160" r="6" fill="none" stroke="#3B82F6" strokeWidth="1.5"/>
            <circle cx="560" cy="560" r="6" fill="none" stroke="#22C55E" strokeWidth="1.5"/>
            <circle cx="160" cy="560" r="6" fill="none" stroke="#3B82F6" strokeWidth="1.5"/>
            <line x1="160" y1="160" x2="560" y2="160" stroke="#1F2937" strokeWidth="0.5"/>
            <line x1="560" y1="160" x2="560" y2="560" stroke="#1F2937" strokeWidth="0.5"/>
            <line x1="560" y1="560" x2="160" y2="560" stroke="#1F2937" strokeWidth="0.5"/>
            <line x1="160" y1="560" x2="160" y2="160" stroke="#1F2937" strokeWidth="0.5"/>
          </svg>
        </div>

        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0D1F14_0%,_#0A0F0D_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-green/20 bg-brand-green/5 text-brand-green text-xs font-bold mb-8 uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"/>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"/>
            </span>
            {isEs ? 'Informe de Impacto 2025' : '2025 Impact Report'}
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold text-brand-text mb-8 leading-[1.05]">
            {isEs ? (
              <>Nuestro Compromiso<br /><span className="text-brand-green">con el Planeta</span></>
            ) : (
              <>Our Commitment<br /><span className="text-brand-green">to the Planet</span></>
            )}
          </h1>

          <p className="text-lg md:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed">
            {isEs
              ? 'No solo reparamos gadgets. Reparamos la relación entre tecnología y naturaleza. Cada equipo que pasa por nuestras manos reduce el impacto ambiental de la industria electrónica.'
              : "We don't just repair gadgets. We repair the relationship between technology and nature. Every device that passes through our hands reduces the environmental impact of the electronics industry."}
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-muted/40 text-xs animate-bounce">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </section>

      {/* ─── CONTADORES ANIMADOS ─── */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-text mb-4">
            {isEs ? 'Impacto Real en Números' : 'Real Impact in Numbers'}
          </h2>
          <p className="text-brand-muted max-w-xl mx-auto">
            {isEs ? 'Datos acumulados desde enero 2025.' : 'Cumulative data since January 2025.'}
          </p>
        </div>
        <ImpactCounters stats={stats} />
      </section>

      {/* ─── POR QUÉ ECONOMÍA CIRCULAR ─── */}
      <section className="py-28 bg-brand-surface border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="text-brand-green text-xs font-bold uppercase tracking-[0.2em] mb-4">
                {isEs ? 'Economía Circular' : 'Circular Economy'}
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-text mb-8 leading-tight">
                {isEs ? '¿Por qué reparar es la respuesta?' : 'Why is repair the answer?'}
              </h2>
              <div className="space-y-6 text-brand-muted text-sm leading-relaxed">
                <p>
                  {isEs
                    ? 'La fabricación de un smartphone consume hasta 70 kg de materias primas y emite más CO₂ que 2 años de uso. Repararlo en vez de comprarlo nuevo es la decisión más sostenible posible.'
                    : 'Manufacturing a smartphone consumes up to 70 kg of raw materials and emits more CO₂ than 2 years of use. Repairing it instead of buying new is the most sustainable decision possible.'}
                </p>
                <p>
                  {isEs
                    ? 'En ReparaTech aplicamos el modelo de las 4R en cada proceso: Reducir materiales nuevos, Reparar lo dañado, Reutilizar lo funcional y Reciclar responsablemente lo que no podemos recuperar.'
                    : 'At ReparaTech we apply the 4R model at every step: Reduce new materials, Repair what is damaged, Reuse what is functional, and Responsibly Recycle what we cannot recover.'}
                </p>
              </div>
            </div>

            {/* Circular lifecycle infographic SVG */}
            <div className="flex items-center justify-center relative">
              <svg width="420" height="420" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-full" aria-label="Diagrama del ciclo de vida circular de la tecnología">
                {/* Main orbit */}
                <circle cx="210" cy="210" r="170" stroke="#1F2937" strokeWidth="1.5" strokeDasharray="6 4"/>

                {/* Arcs for each segment */}
                <path d="M210 40 A170 170 0 0 1 380 210" stroke="#22C55E" strokeWidth="3" strokeLinecap="round"/>
                <path d="M380 210 A170 170 0 0 1 272 357" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round"/>
                <path d="M272 357 A170 170 0 0 1 148 357" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
                <path d="M148 357 A170 170 0 0 1 40 210" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
                <path d="M40 210 A170 170 0 0 1 148 63" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
                <path d="M148 63 A170 170 0 0 1 210 40" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>

                {/* Node circles with labels */}
                {[
                  { cx: 210, cy: 40,  label: isEs ? 'Producción' : 'Production',    emoji: '🏭' },
                  { cx: 380, cy: 210, label: isEs ? 'Uso'        : 'Use',           emoji: '👤' },
                  { cx: 272, cy: 357, label: isEs ? 'Reparación' : 'Repair',        emoji: '🔧' },
                  { cx: 148, cy: 357, label: isEs ? 'Reutilización':'Reuse',         emoji: '♻️' },
                  { cx: 40,  cy: 210, label: isEs ? 'Reciclaje'  : 'Recycling',     emoji: '🌱' },
                  { cx: 148, cy: 63,  label: isEs ? 'Recuperación':'Recovery',       emoji: '⚡' },
                ].map((node, i) => {
                  // Shift label to avoid clipping
                  const textX = node.cx === 40 ? -8 : node.cx === 380 ? 8 : 0;
                  const anchor = node.cx < 100 ? 'end' : node.cx > 320 ? 'start' : 'middle';
                  return (
                    <g key={i}>
                      <circle cx={node.cx} cy={node.cy} r="28" fill="#111827" stroke={i % 2 === 0 ? '#22C55E' : '#3B82F6'} strokeWidth="1.5"/>
                      <text x={node.cx} y={node.cy + 6} textAnchor="middle" fill="#F0FDF4" fontSize="18">{node.emoji}</text>
                      <text x={node.cx + textX} y={node.cy + 48} textAnchor={anchor} fill="#6B7280" fontSize="11" fontWeight="600">{node.label}</text>
                    </g>
                  );
                })}

                {/* Center logo */}
                <circle cx="210" cy="210" r="52" fill="#0A0F0D" stroke="#1F2937" strokeWidth="1"/>
                <text x="210" y="205" textAnchor="middle" fill="#22C55E" fontSize="28">🌍</text>
                <text x="210" y="228" textAnchor="middle" fill="#6B7280" fontSize="10" fontWeight="700">CIRCULAR</text>
              </svg>

              {/* Subtle glow */}
              <div className="absolute inset-1/4 bg-brand-green/5 rounded-full blur-3xl pointer-events-none"/>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NUESTRAS PRÁCTICAS ─── */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-text mb-4">
            {isEs ? 'Nuestras Prácticas Sostenibles' : 'Our Sustainable Practices'}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {practices.map((p, i) => (
            <Card key={i} className="p-10 hover:border-brand-green/40 transition-all duration-500 hover:-translate-y-1 flex flex-col gap-6">
              <div className="text-5xl">{p.icon}</div>
              <h3 className="text-xl font-display font-bold text-brand-text">{p.title}</h3>
              <p className="text-sm text-brand-muted leading-relaxed flex-1">{p.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ─── CERTIFICACIONES ─── */}
      <section className="py-24 bg-brand-surface border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold text-brand-muted uppercase tracking-widest mb-12">
            {isEs ? 'Certificaciones y Reconocimientos' : 'Certifications & Recognitions'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16">
            {certifications.map((cert, i) => (
              <div key={i} className="flex flex-col items-center gap-4 group">
                {/* SVG badge */}
                <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform duration-300">
                  <polygon points="45,5 85,25 85,65 45,85 5,65 5,25" fill="#111827" stroke={cert.accent} strokeWidth="1.5"/>
                  <polygon points="45,14 78,30 78,60 45,76 12,60 12,30" fill={cert.accent} opacity="0.06"/>
                  {cert.code.includes('\n') ? (
                    <>
                      <text x="45" y="39" textAnchor="middle" fill={cert.accent} fontSize="12" fontWeight="900" fontFamily="sans-serif">{cert.code.split('\n')[0]}</text>
                      <text x="45" y="55" textAnchor="middle" fill={cert.accent} fontSize="12" fontWeight="900" fontFamily="sans-serif">{cert.code.split('\n')[1]}</text>
                    </>
                  ) : (
                    <text x="45" y="50" textAnchor="middle" fill={cert.accent} fontSize="16" fontWeight="900" fontFamily="sans-serif">{cert.code}</text>
                  )}
                </svg>
                <div className="text-center">
                  <p className="text-xs font-bold text-brand-text mb-0.5">{cert.code.replace('\n', ' ')}</p>
                  <p className="text-[10px] text-brand-muted">{cert.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COLABORA CON NOSOTROS ─── */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-[40px] overflow-hidden border border-brand-border bg-brand-surface p-10 md:p-20">
          {/* Gradient glow */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-green/10 rounded-full blur-[100px] pointer-events-none"/>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"/>

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-blue/20 bg-brand-blue/5 text-brand-blue text-[10px] font-bold uppercase tracking-widest mb-6">
                🏢 {isEs ? 'Soluciones para Empresas' : 'Business Solutions'}
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-text mb-6">
                {isEs ? 'Colabora con Nosotros' : 'Collaborate with Us'}
              </h2>
              <p className="text-brand-muted text-sm leading-relaxed mb-8">
                {isEs
                  ? 'Ofrecemos recogida masiva de equipos obsoletos para empresas. Recibirás un certificado detallado de destrucción y reciclaje para incluirlo en tu memoria de sostenibilidad corporativa y cumplir con la normativa RAEE.'
                  : 'We offer mass collection of obsolete devices for businesses. You will receive a detailed destruction and recycling certificate to include in your corporate sustainability report and comply with WEEE regulations.'}
              </p>
              <ul className="space-y-3 mb-10">
                {(isEs
                  ? ['Recogida a domicilio de 1 a 1.000+ equipos', 'Certificado ISO para memoria corporativa', 'Destrucción de datos certificada DoD 5220.22-M', 'Sin coste para tu empresa']
                  : ['Door-to-door pickup of 1 to 1000+ devices', 'ISO certificate for corporate reporting', 'DoD 5220.22-M certified data destruction', 'No cost to your company']
                ).map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-brand-text/80">
                    <span className="text-brand-green font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link href={`/${lang}/contacto`}>
                <Button size="lg" className="shadow-xl hover:-translate-y-0.5 transition-transform">
                  {isEs ? 'Solicitar recogida empresarial' : 'Request Business Pickup'}
                </Button>
              </Link>
            </div>

            {/* Big stat card */}
            <div className="flex flex-col gap-6">
              {[
                { v: '0%', label: isEs ? 'de residuos a vertedero' : 'waste to landfill', color: 'border-brand-green' },
                { v: '100%', label: isEs ? 'certificado legalmente' : 'legally certified', color: 'border-brand-blue' },
                { v: '48h', label: isEs ? 'plazo máximo de recogida' : 'max pickup lead time', color: 'border-brand-green' },
              ].map((s, i) => (
                <div key={i} className={`flex items-center gap-8 bg-brand-bg border ${s.color}/30 rounded-2xl p-8`}>
                  <span className="text-4xl font-display font-bold text-brand-text">{s.v}</span>
                  <span className="text-sm text-brand-muted">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
