import type { Metadata } from 'next';
import { Space_Grotesk, Inter, Orbitron } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { i18n, getDictionary, type Locale } from '@/lib/i18n';
import { CartProvider } from '@/lib/cart-context';
import CursorGlow from '@/components/ui/CursorGlow';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
});

export const metadata: Metadata = {
  title: {
    default: 'ReparaTech Circular',
    template: '%s | ReparaTech Circular',
  },
  description: 'Tecnología sostenible, reparación y reacondicionamiento para un futuro mejor.',
  openGraph: {
    title: 'ReparaTech Circular',
    description: 'Tecnología sostenible y reparación de equipos tecnológicos.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'ReparaTech Circular',
  },
};

export async function generateStaticParams() {
  return i18n.locales.map((locale: string) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);

  return (
    <html lang={params.lang} className={`${spaceGrotesk.variable} ${inter.variable} ${orbitron.variable}`}>
      <body className="font-sans bg-brand-bg text-brand-text min-h-screen flex flex-col">
        <CursorGlow />
        <CartProvider>
          <Header
            lang={params.lang}
            navLabels={dict.navigation}
          />
          <main className="flex-1">
            {children}
          </main>
          <Footer
            lang={params.lang}
            navLabels={dict.navigation}
            tagline={dict.footer.tagline}
          />
        </CartProvider>
      </body>
    </html>
  );
}
