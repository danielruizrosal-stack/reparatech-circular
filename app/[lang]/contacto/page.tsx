import { type Locale } from '@/lib/i18n';
import ContactForm from '@/components/sections/ContactForm';

export default async function ContactPage({ params: { lang } }: { params: { lang: Locale } }) {
  const isEs = lang === 'es';

  const faq = [
    {
      q: isEs ? '¿Cuánto tarda una reparación?' : 'How long does a repair take?',
      a: isEs 
        ? 'Depende del tipo de avería. Las reparaciones menores (pantallas, baterías) suelen estar listas en 24-48h. Intervenciones complejas en placa base pueden tardar entre 3 y 5 días laborables.'
        : 'It depends on the issue. Minor repairs (screens, batteries) are usually ready in 24-48h. Complex motherboard interventions can take between 3 and 5 working days.'
    },
    {
      q: isEs ? '¿Ofrecéis garantía en las reparaciones?' : 'Do repairs come with warranty?',
      a: isEs
        ? 'Sí, todas nuestras reparaciones cuentan con una garantía de 6 meses que cubre tanto la mano de obra como las piezas sustituidas.'
        : 'Yes, all our repairs come with a 6-month warranty covering both labor and replaced parts.'
    },
    {
      q: isEs ? '¿Puedo traer el equipo en persona?' : 'Can I bring my device in person?',
      a: isEs
        ? '¡Por supuesto! Estaremos encantados de recibirte en nuestro taller en el centro de Madrid sin necesidad de cita previa para el diagnóstico inicial.'
        : 'Of course! We will be happy to welcome you at our workshop in central Madrid without an appointment for the initial diagnosis.'
    },
    {
      q: isEs ? '¿Qué pasa si no se puede reparar?' : "What if it can't be repaired?",
      a: isEs
        ? 'Si el equipo es irreparable, te informaremos con total honestidad. En ese caso, solo cobraríamos el diagnóstico si fue aceptado previamente, y te ofreceremos opciones de reciclado responsable o descuento en un equipo reacondicionado.'
        : "If the device is irreparable, we will inform you honestly. In that case, we would only charge for the diagnosis if previously accepted, and we will offer responsible recycling options or a discount on a refurbished device."
    },
    {
      q: isEs ? '¿Cómo funciona la recogida a domicilio?' : 'How does home pickup work?',
      a: isEs
        ? 'Puedes solicitarlo en el formulario de presupuesto. Un mensajero pasará por tu dirección en 24-48h, recogerá el equipo en un paquete seguro y nos lo traerá al taller.'
        : 'You can request it in the quote form. A courier will stop by your address in 24-48h, pick up the device in a secure package and bring it to our workshop.'
    },
    {
      q: isEs ? '¿Los equipos reacondicionados tienen garantía?' : 'Do refurbished products have warranty?',
      a: isEs
        ? 'Todos nuestros equipos reacondicionados pasan un control de calidad de 40 puntos y cuentan con 1 año de garantía total.'
        : 'All our refurbished devices pass a 40-point quality control and come with a 1-year full warranty.'
    }
  ];

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 mb-32">
        {/* Formulario */}
        <div className="animate-fade-up">
          <h1 className="text-4xl font-display font-bold text-brand-text mb-6">
            {isEs ? 'Ponte en contacto' : 'Get in touch'}
          </h1>
          <p className="text-brand-muted mb-10 leading-relaxed">
            {isEs 
              ? '¿Tienes alguna duda o prefieres hablar directamente con un técnico? Rellena el formulario y te responderemos lo antes posible.'
              : 'Have any questions or prefer to talk directly with a technician? Fill out the form and we will get back to you as soon as possible.'}
          </p>
          <ContactForm isEs={isEs} />
        </div>

        {/* Info y Mapa */}
        <div className="space-y-8 animate-fade-up stagger-2">
          <div className="bg-brand-surface border border-brand-border rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-xl font-display font-bold text-brand-text mb-8">{isEs ? 'Información de Contacto' : 'Contact Information'}</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center text-lg flex-shrink-0">📍</div>
                <div>
                   <p className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-1">{isEs ? 'Dirección' : 'Address'}</p>
                   <p className="text-brand-text text-sm">Calle Innovación 42, 28004 Madrid</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center text-lg flex-shrink-0">📞</div>
                <div>
                   <p className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-1">{isEs ? 'Teléfono' : 'Phone'}</p>
                   <p className="text-brand-text text-sm">+34 91 234 56 78</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center text-lg flex-shrink-0">📧</div>
                <div>
                   <p className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">Email</p>
                   <p className="text-brand-text text-sm">hola@reparatech.es</p>
                </div>
              </div>
            </div>

            {/* Fictional Map SVG */}
            <div className="mt-12 rounded-2xl border border-brand-border bg-brand-bg h-48 relative overflow-hidden">
               <svg viewBox="0 0 400 200" className="w-full h-full opacity-30">
                 <path d="M0 40 H400 M0 80 H400 M0 120 H400 M0 160 H400" stroke="#1F2937" strokeWidth="1" />
                 <path d="M40 0 V200 M80 0 V200 M120 0 V200 M160 0 V200 M200 0 V200 M240 0 V200 M280 0 V200 M320 0 V200 M360 0 V200" stroke="#1F2937" strokeWidth="1" />
                 <path d="M50 50 L350 150 M350 50 L50 150" stroke="#22C55E" strokeWidth="0.5" opacity="0.5" />
               </svg>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-brand-green rounded-full animate-ping opacity-50" />
                    <div className="w-4 h-4 bg-brand-green rounded-full border-2 border-white relative z-10" />
                  </div>
                  <div className="mt-2 bg-brand-surface border border-brand-green px-2 py-1 rounded text-[8px] font-bold text-brand-green uppercase tracking-tighter shadow-xl">ReparaTech HQ</div>
               </div>
            </div>
          </div>

          <div className="bg-brand-surface border border-brand-border rounded-3xl p-8">
            <h2 className="text-xl font-display font-bold text-brand-text mb-6">🕒 {isEs ? 'Horarios de Apertura' : 'Opening Hours'}</h2>
            <div className="space-y-3">
              {[
                { d: isEs ? 'Lunes - Viernes' : 'Monday - Friday', h: '09:00 - 19:00' },
                { d: isEs ? 'Sábados' : 'Saturdays', h: '10:00 - 14:00' },
                { d: isEs ? 'Domingos y Festivos' : 'Sundays & Holidays', h: isEs ? 'Cerrado' : 'Closed', muted: true },
              ].map((row, i) => (
                <div key={i} className={`flex justify-between items-center text-sm ${row.muted ? 'text-brand-muted opacity-50' : 'text-brand-text'}`}>
                  <span>{row.d}</span>
                  <span className="font-bold">{row.h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ SECTION */}
      <section className="animate-fade-up">
        <h2 className="text-3xl font-display font-bold text-brand-text text-center mb-16 underline decoration-brand-green/30 underline-offset-8">
          {isEs ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {faq.map((item, i) => (
            <details key={i} className="group bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-brand-bg transition-colors">
                 <h3 className="text-sm md:text-base font-bold text-brand-text pr-8">{item.q}</h3>
                 <span className="text-brand-green text-xl group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <div className="px-6 pb-6 text-sm text-brand-muted leading-relaxed border-t border-brand-border/30 pt-4 animate-fade-up">
                 {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
