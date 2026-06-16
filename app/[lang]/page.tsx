import { type Locale } from '@/lib/i18n';
import Hero from '@/components/sections/Hero';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import ServicesGrid from '@/components/sections/ServicesGrid';
import SustainabilityStats from '@/components/sections/SustainabilityStats';
import Testimonials from '@/components/sections/Testimonials';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const isEs = lang === 'es';

  return (
    <div className="bg-brand-bg">
      <Hero isEs={isEs} />
      <FeaturedProducts isEs={isEs} />
      <ServicesGrid isEs={isEs} lang={lang} />
      <SustainabilityStats isEs={isEs} lang={lang} />
      <Testimonials isEs={isEs} />
    </div>
  );
}

