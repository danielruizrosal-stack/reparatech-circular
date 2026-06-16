'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';

interface QuoteData {
  deviceType: string;
  problems: string[];
  brand: string;
  model: string;
  age: string;
  pickup: boolean;
  urgent: boolean;
  contact: {
    name: string;
    email: string;
    phone: string;
    date: string;
    message: string;
  };
}

interface StepProps {
  isEs: boolean;
  onNext: (data: Partial<QuoteData>) => void;
  onBack?: () => void;
  data: QuoteData;
}

export default function QuoteWizard({ isEs }: { isEs: boolean }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<QuoteData>({
    deviceType: '',
    problems: [],
    brand: '',
    model: '',
    age: '<2',
    pickup: false,
    urgent: false,
    contact: { name: '', email: '', phone: '', date: '', message: '' }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const stepsCount = 4;

  const nextStep = (newData: Partial<QuoteData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setStep(s => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reset = () => {
    setFormData({
      deviceType: '',
      problems: [],
      brand: '',
      model: '',
      age: '<2',
      pickup: false,
      urgent: false,
      contact: { name: '', email: '', phone: '', date: '', message: '' }
    });
    setStep(1);
    setSubmitted(false);
  };

  const handleContactSubmit = async (contactData: QuoteData['contact']) => {
    setIsSubmitting(true);

    try {
      const issues = [
        { id: 'on', price: 45 }, { id: 'screen', price: 89 }, { id: 'bat', price: 39 },
        { id: 'slow', price: 29 }, { id: 'virus', price: 25 }, { id: 'ram', price: 25 },
        { id: 'data', price: 49 }, { id: 'clean', price: 19 }, { id: 'unknown', price: 29 },
      ];
      const selected = issues.filter(i => formData.problems.includes(i.id));
      const subtotal = selected.reduce((acc, l) => acc + l.price, 0) + (formData.pickup ? 15 : 0) + (formData.urgent ? 20 : 0);
      const discount = subtotal > 100 ? subtotal * 0.1 : 0;
      const total = subtotal - discount;

      const supabase = createClient();
      await supabase.from('budget_requests').insert([{
        device_type: formData.deviceType,
        problems: formData.problems,
        brand: formData.brand || null,
        model: formData.model || null,
        age: formData.age,
        home_pickup: formData.pickup,
        urgent: formData.urgent,
        estimated_total: total,
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        preferred_date: contactData.date || null,
        notes: contactData.message || null,
        status: 'pending'
      }]);
    } catch (e) {
      // Silently fail for the user
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto min-h-[70vh] flex flex-col pt-10">
      {/* Progress Bar */}
      <div className="mb-12 relative h-1.5 bg-brand-border rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-brand-green transition-all duration-500 ease-out"
          style={{ width: `${(step / stepsCount) * 100}%` }}
        />
      </div>

      <div className="flex-1">
        {step === 1 && <DeviceStep isEs={isEs} onNext={nextStep} data={formData} />}
        {step === 2 && <ProblemStep isEs={isEs} onNext={nextStep} onBack={prevStep} data={formData} />}
        {step === 3 && <DetailsStep isEs={isEs} onNext={nextStep} onBack={prevStep} data={formData} />}
        {step === 4 && (
          <ResultStep 
            isEs={isEs} 
            data={formData} 
            onReset={reset} 
            onSubmitContact={handleContactSubmit}
            isSubmitting={isSubmitting}
            submitted={submitted}
          />
        )}
      </div>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function DeviceStep({ isEs, onNext, data }: StepProps) {
  const devices = [
    { id: 'laptop',   label: isEs ? 'Portátil' : 'Laptop',      icon: '💻' },
    { id: 'desktop',  label: isEs ? 'Sobremesa' : 'Desktop',     icon: '🖥️' },
    { id: 'phone',    label: isEs ? 'Smartphone' : 'Smartphone',   icon: '📱' },
    { id: 'monitor',  label: isEs ? 'Monitor' : 'Monitor',        icon: '🖥️' },
    { id: 'printer',  label: isEs ? 'Impresora' : 'Printer',       icon: '🖨️' },
    { id: 'other',    label: isEs ? 'Otro' : 'Other',            icon: '❓' },
  ];

  return (
    <div className="animate-fade-up">
      <h2 className="text-3xl font-display font-bold text-brand-text mb-10 text-center">
        {isEs ? '¿Qué tipo de equipo tienes?' : 'What type of device do you have?'}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {devices.map(d => (
          <button
            key={d.id}
            onClick={() => onNext({ deviceType: d.id })}
            className={`p-10 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 group ${data.deviceType === d.id ? 'border-brand-green bg-brand-green/5' : 'border-brand-border bg-brand-surface hover:border-brand-green/50'}`}
          >
            <span className="text-5xl group-hover:scale-110 transition-transform">{d.icon}</span>
            <span className="font-bold text-brand-text">{d.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProblemStep({ isEs, onNext, onBack, data }: StepProps) {
  const [selected, setSelected] = useState<string[]>(data.problems);

  const issues = [
    { id: 'on',      label: isEs ? 'No enciende' : "Doesn't turn on",       price: 45 },
    { id: 'screen',  label: isEs ? 'Pantalla rota' : "Broken screen",       price: 89 },
    { id: 'bat',     label: isEs ? 'Batería agotada' : "Dead battery",      price: 39 },
    { id: 'slow',    label: isEs ? 'Muy lento' : "Very slow",                price: 29 },
    { id: 'virus',   label: isEs ? 'Virus/Malware' : "Virus/Malware",        price: 25 },
    { id: 'ram',     label: isEs ? 'Más RAM/SSD' : "RAM/SSD upgrade",        price: 25 },
    { id: 'data',    label: isEs ? 'Recuperar datos' : "Data recovery",      price: 49 },
    { id: 'clean',   label: isEs ? 'Limpieza' : "Cleaning",                  price: 19 },
    { id: 'unknown', label: isEs ? 'No sé' : "I don't know",                 price: 29 },
  ];

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="animate-fade-up">
      <h2 className="text-3xl font-display font-bold text-brand-text mb-10 text-center">
        {isEs ? '¿Cuál es el problema?' : "What's the issue?"}
      </h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {issues.map(issue => (
          <label 
            key={issue.id}
            className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all ${selected.includes(issue.id) ? 'border-brand-green bg-brand-green/5' : 'border-brand-border bg-brand-surface hover:border-brand-border-muted'}`}
          >
            <div className="flex items-center gap-4">
              <input 
                type="checkbox" 
                className="w-5 h-5 accent-brand-green" 
                checked={selected.includes(issue.id)}
                onChange={() => toggle(issue.id)}
              />
              <span className="text-brand-text font-medium">{issue.label}</span>
            </div>
            <span className="text-brand-green font-bold text-sm">+{issue.price}€</span>
          </label>
        ))}
      </div>
      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">{isEs ? 'Atrás' : 'Back'}</Button>
        <Button onClick={() => onNext({ problems: selected })} disabled={selected.length === 0} className="flex-[2]">
          {isEs ? 'Siguiente' : 'Next'}
        </Button>
      </div>
    </div>
  );
}

function DetailsStep({ isEs, onNext, onBack, data }: StepProps) {
  const [localData, setLocalData] = useState({
    brand: data.brand,
    model: data.model,
    age: data.age,
    pickup: data.pickup,
    urgent: data.urgent
  });

  return (
    <div className="animate-fade-up max-w-2xl mx-auto w-full">
      <h2 className="text-3xl font-display font-bold text-brand-text mb-10 text-center">
        {isEs ? 'Información Adicional' : "Additional Information"}
      </h2>
      <div className="space-y-6 mb-12">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">{isEs ? 'Marca' : 'Brand'}</label>
            <input 
              type="text" 
              value={localData.brand}
              onChange={e => setLocalData({...localData, brand: e.target.value})}
              placeholder="Ej: Apple, HP, Dell..."
              className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 outline-none focus:border-brand-green text-brand-text"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">{isEs ? 'Modelo (opcional)' : 'Model (optional)'}</label>
            <input 
              type="text" 
              value={localData.model}
              onChange={e => setLocalData({...localData, model: e.target.value})}
              className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 outline-none focus:border-brand-green text-brand-text"
            />
          </div>
        </div>

        <div>
           <label className="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">{isEs ? 'Antigüedad' : 'Age'}</label>
           <select 
             className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 outline-none focus:border-brand-green text-brand-text appearance-none"
             value={localData.age}
             onChange={e => setLocalData({...localData, age: e.target.value})}
           >
             <option value="<2">{'< 2 ' + (isEs ? 'años' : 'years')}</option>
             <option value="2-5">2-5 {(isEs ? 'años' : 'years')}</option>
             <option value=">5">{'> 5 ' + (isEs ? 'años' : 'years')}</option>
           </select>
        </div>

        <div className="space-y-3 pt-4">
          <label className={`flex items-center justify-between p-4 rounded-xl border border-brand-border cursor-pointer transition-colors ${localData.pickup ? 'bg-brand-blue/5 border-brand-blue/30' : 'bg-brand-surface hover:bg-brand-surface-muted'}`}>
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={localData.pickup} onChange={e => setLocalData({...localData, pickup: e.target.checked})} className="w-5 h-5 accent-brand-blue" />
              <span className="text-sm font-bold text-brand-text">{isEs ? '¿Necesitas recogida a domicilio?' : 'Need home pickup?'}</span>
            </div>
            <span className="text-brand-blue font-bold text-sm">+15€</span>
          </label>

          <label className={`flex items-center justify-between p-4 rounded-xl border border-brand-border cursor-pointer transition-colors ${localData.urgent ? 'bg-brand-green/5 border-brand-green/30' : 'bg-brand-surface hover:bg-brand-surface-muted'}`}>
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={localData.urgent} onChange={e => setLocalData({...localData, urgent: e.target.checked})} className="w-5 h-5 accent-brand-green" />
              <span className="text-sm font-bold text-brand-text">{isEs ? '¿Tienes urgencia? (entrega en 24h)' : 'Urgent? (24h delivery)'}</span>
            </div>
            <span className="text-brand-green font-bold text-sm">+20€</span>
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">{isEs ? 'Atrás' : 'Back'}</Button>
        <Button onClick={() => onNext(localData)} disabled={!localData.brand} className="flex-[2]">
          {isEs ? 'Calcular Presupuesto' : 'Calculate Quote'}
        </Button>
      </div>
    </div>
  );
}

interface ResultStepProps {
  isEs: boolean;
  data: QuoteData;
  onReset: () => void;
  onSubmitContact: (contactData: QuoteData['contact']) => void;
  isSubmitting: boolean;
  submitted: boolean;
}

function ResultStep({ isEs, data, onReset, onSubmitContact, isSubmitting, submitted }: ResultStepProps) {
  const [contact, setContact] = useState(data.contact);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitContact(contact);
  };
  const issues = useMemo(() => [
    { id: 'on',      label: isEs ? 'Reparación encendido' : "Power repair", price: 45 },
    { id: 'screen',  label: isEs ? 'Sustitución pantalla' : "Screen replacement", price: 89 },
    { id: 'bat',     label: isEs ? 'Batería nueva' : "New battery", price: 39 },
    { id: 'slow',    label: isEs ? 'Optimización' : "Optimization", price: 29 },
    { id: 'virus',   label: isEs ? 'Limpieza virus' : "Virus removal", price: 25 },
    { id: 'ram',     label: isEs ? 'Mano de obra ampliación' : "Hardware upgrade labor", price: 25 },
    { id: 'data',    label: isEs ? 'Recuperación de datos' : "Data recovery", price: 49 },
    { id: 'clean',   label: isEs ? 'Mantenimiento preventivo' : "Preventive maintenance", price: 19 },
    { id: 'unknown', label: isEs ? 'Revisión y diagnóstico' : "Revision & diagnosis", price: 29 },
  ], [isEs]);

  const quoteLines = useMemo(() => {
    const selected = issues.filter(i => data.problems.includes(i.id));
    const extras = [];
    if (data.pickup) extras.push({ label: isEs ? 'Recogida domicilio' : 'Home pickup', price: 15 });
    if (data.urgent) extras.push({ label: isEs ? 'Urgencia 24h' : 'Urgent delivery', price: 20 });
    return [...selected, ...extras];
  }, [data.problems, data.pickup, data.urgent, isEs, issues]);

  const subtotal = quoteLines.reduce((acc, l) => acc + l.price, 0);
  const discount = subtotal > 100 ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return (
    <div className="animate-fade-up space-y-16">
      <div className="bg-brand-surface border border-brand-border rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 blur-[60px] pointer-events-none" />
        
        <h2 className="text-3xl font-display font-bold text-brand-text mb-10 text-center">
          {isEs ? 'Tu Presupuesto Estimado' : 'Your Estimated Quote'}
        </h2>

        <div className="space-y-4 max-w-xl mx-auto mb-10">
          {quoteLines.map((line, i) => (
            <div key={i} className="flex justify-between items-center text-sm py-1 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="text-brand-muted">{line.label}</span>
              <span className="font-bold text-brand-text">{line.price}€</span>
            </div>
          ))}

          <div className="h-px bg-brand-border my-6" />

          {discount > 0 && (
            <div className="flex justify-between items-center text-sm text-brand-green font-bold">
              <span>{isEs ? 'Descuento fidelidad (-10%)' : 'Loyalty discount (-10%)'}</span>
              <span>-{discount.toFixed(2)}€</span>
            </div>
          )}

          <div className="flex justify-between items-center pt-4">
            <span className="text-lg font-display font-bold text-brand-text uppercase tracking-widest">{isEs ? 'Total estimado' : 'Estimated total'}</span>
            <span className="text-4xl md:text-5xl font-display font-bold text-brand-green">{total.toFixed(2)}€</span>
          </div>
        </div>

        <p className="text-[10px] text-center text-brand-muted uppercase tracking-widest leading-relaxed">
          {isEs 
            ? "* Presupuesto orientativo basado en tu descripción. El precio final puede variar tras el diagnóstico técnico físico del equipo." 
            : "* Orientative quote based on your description. The final price may vary after professional diagnostic."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center">
          <Button size="lg" className="px-10" onClick={() => document.getElementById('cita-form')?.scrollIntoView({ behavior: 'smooth' })}>
            {isEs ? 'Solicitar cita ahora' : 'Book appointment now'}
          </Button>
          <Button variant="ghost" className="text-brand-muted hover:text-brand-text" onClick={onReset}>
            {isEs ? 'Volver a calcular' : 'Recalculate'}
          </Button>
        </div>
      </div>

      {/* CITA FORM */}
      <div id="cita-form" className="bg-brand-bg border border-brand-border rounded-[40px] p-10 md:p-16 scroll-mt-24">
        {submitted ? (
          <div className="text-center py-12 animate-fade-up">
            <div className="text-6xl mb-6">✅</div>
            <h3 className="text-2xl font-display font-bold text-brand-text mb-4">
              {isEs ? '¡Solicitud enviada!' : 'Request sent!'}
            </h3>
            <p className="text-brand-muted">
              {isEs 
                ? 'Nos pondremos en contacto contigo en menos de 2h para confirmar la cita.' 
                : 'We will get in touch in less than 2 hours to confirm your appointment.'}
            </p>
            <Button className="mt-8" variant="outline" onClick={onReset}>{isEs ? 'Nueva consulta' : 'New request'}</Button>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-display font-bold text-brand-text mb-4">
              {isEs ? 'Confirma tu cita' : 'Confirm your appointment'}
            </h2>
            <p className="text-brand-muted mb-10 text-sm">
              {isEs 
                ? 'Completa tus datos y selecciona una fecha preferida. Te confirmaremos disponibilidad vía Email/Teléfono.' 
                : 'Fill in your details and select a preferred date. We will confirm availability via Email/Phone.'}
            </p>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">{isEs ? 'Nombre completo' : 'Full Name'}</label>
                  <input required type="text" value={contact.name} onChange={e => setContact({...contact, name: e.target.value})} className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 outline-none focus:border-brand-green text-brand-text" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">Email</label>
                  <input required type="email" value={contact.email} onChange={e => setContact({...contact, email: e.target.value})} className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 outline-none focus:border-brand-green text-brand-text" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">{isEs ? 'Teléfono' : 'Phone'}</label>
                  <input required type="tel" value={contact.phone} onChange={e => setContact({...contact, phone: e.target.value})} className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 outline-none focus:border-brand-green text-brand-text" />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">{isEs ? 'Fecha preferida' : 'Preferred Date'}</label>
                  <input required type="date" value={contact.date} onChange={e => setContact({...contact, date: e.target.value})} className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 outline-none focus:border-brand-green text-brand-text" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">{isEs ? 'Mensaje o detalles adicionales' : 'Additional details'}</label>
                  <textarea rows={4} value={contact.message} onChange={e => setContact({...contact, message: e.target.value})} className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 outline-none focus:border-brand-green text-brand-text resize-none" />
                </div>
              </div>

              <div className="md:col-span-2 pt-4">
                <Button type="submit" size="lg" className="w-full md:w-auto px-16" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                       <span className="w-4 h-4 border-2 border-brand-bg border-t-transparent rounded-full animate-spin" />
                       {isEs ? 'Enviando...' : 'Sending...'}
                    </span>
                  ) : (
                    isEs ? 'Enviar Solicitud' : 'Send Request'
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
