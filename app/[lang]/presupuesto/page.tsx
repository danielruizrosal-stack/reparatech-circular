import { type Locale } from '@/lib/i18n';
import QuoteWizard from '@/components/sections/QuoteWizard';

export default async function QuotePage({ params: { lang } }: { params: { lang: Locale } }) {
  const isEs = lang === 'es';

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-display font-bold text-brand-text mb-6">Presupuesto Online Gratuito</h1>
        <p className="text-brand-muted max-w-xl mx-auto text-lg leading-relaxed">
          Recibe una estimación personalizada en tiempo récord. Tecnología de vanguardia aplicada a la reparación artesanal.
        </p>
      </div>
      
      <QuoteWizard isEs={isEs} />
    </div>
  );
}
