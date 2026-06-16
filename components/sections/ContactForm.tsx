'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';

export default function ContactForm({ isEs }: { isEs: boolean }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
    privacy: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const subjects = [
    { id: 'general', es: 'Consulta general', en: 'General inquiry' },
    { id: 'quote', es: 'Presupuesto', en: 'Quote' },
    { id: 'pickup', es: 'Recogida de equipos', en: 'Device pickup' },
    { id: 'support', es: 'Soporte técnico', en: 'Technical support' },
    { id: 'other', es: 'Otro', en: 'Other' },
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = isEs ? 'El nombre es obligatorio' : 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = isEs ? 'El email es obligatorio' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = isEs ? 'Email no válido' : 'Invalid email';
    }
    if (formData.message.length < 20) {
      newErrors.message = isEs ? 'El mensaje debe tener al menos 20 caracteres' : 'Message must be at least 20 characters';
    }
    if (!formData.privacy) {
      newErrors.privacy = isEs ? 'Debes aceptar la política' : 'You must accept the policy';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      const supabase = createClient();
      await supabase.from('contact_messages').insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        subject: formData.subject,
        message: formData.message,
        status: 'unread'
      }]);
    } catch (error) {
      // Silently fail for the user
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-brand-surface border border-brand-border rounded-[40px] p-10 md:p-20 text-center animate-fade-up relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-2 h-2 bg-brand-green rounded-full animate-ping"
              style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: 0.3
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <div className="w-20 h-20 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl">📬</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-brand-text mb-4">
            {isEs ? '¡Mensaje Enviado!' : 'Message Sent!'}
          </h2>
          <p className="text-brand-muted max-w-md mx-auto mb-10">
            {isEs 
              ? 'Hemos recibido tu consulta correctamente. Un técnico se pondrá en contacto contigo en las próximas 24 horas laborables.' 
              : 'We have received your inquiry. A technician will get in touch within the next 24 working hours.'}
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline">
            {isEs ? 'Enviar otro mensaje' : 'Send another message'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-surface border border-brand-border rounded-[40px] p-8 md:p-12 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">{isEs ? 'Nombre completo' : 'Full Name'}</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className={`w-full bg-brand-bg border rounded-xl px-4 py-3 outline-none transition-colors text-brand-text ${errors.name ? 'border-red-500/50' : 'border-brand-border focus:border-brand-green'}`} 
            />
            {errors.name && <p className="mt-1.5 text-[10px] text-red-400 font-bold uppercase tracking-wider">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">Email</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className={`w-full bg-brand-bg border rounded-xl px-4 py-3 outline-none transition-colors text-brand-text ${errors.email ? 'border-red-500/50' : 'border-brand-border focus:border-brand-green'}`} 
            />
            {errors.email && <p className="mt-1.5 text-[10px] text-red-400 font-bold uppercase tracking-wider">{errors.email}</p>}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">{isEs ? 'Teléfono (opcional)' : 'Phone (optional)'}</label>
            <input 
              type="tel" 
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 outline-none focus:border-brand-green text-brand-text transition-colors" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">{isEs ? 'Asunto' : 'Subject'}</label>
            <select 
              value={formData.subject}
              onChange={e => setFormData({...formData, subject: e.target.value})}
              className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 outline-none focus:border-brand-green text-brand-text appearance-none cursor-pointer"
            >
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{isEs ? s.es : s.en}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">{isEs ? 'Mensaje' : 'Message'}</label>
          <textarea 
            rows={5}
            value={formData.message}
            onChange={e => setFormData({...formData, message: e.target.value})}
            className={`w-full bg-brand-bg border rounded-xl px-4 py-3 outline-none transition-colors text-brand-text resize-none ${errors.message ? 'border-red-500/50' : 'border-brand-border focus:border-brand-green'}`}
          />
          {errors.message && <p className="mt-1.5 text-[10px] text-red-400 font-bold uppercase tracking-wider">{errors.message}</p>}
        </div>

        <div>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={formData.privacy}
              onChange={e => setFormData({...formData, privacy: e.target.checked})}
              className="w-5 h-5 accent-brand-green" 
            />
            <span className="text-xs text-brand-muted group-hover:text-brand-text transition-colors">
              {isEs ? 'Acepto la política de privacidad' : 'I accept the privacy policy'}
            </span>
          </label>
          {errors.privacy && <p className="mt-2 text-[10px] text-red-400 font-bold uppercase tracking-wider">{errors.privacy}</p>}
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (isEs ? 'Enviando...' : 'Sending...') : (isEs ? 'Enviar mensaje' : 'Send message')}
        </Button>
      </form>
    </div>
  );
}
