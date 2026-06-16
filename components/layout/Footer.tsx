import Link from 'next/link';
import { type Locale } from '@/lib/i18n';

interface FooterProps {
  lang: Locale;
  navLabels: {
    home: string;
    catalog: string;
    services: string;
    sustainability: string;
    quote: string;
    contact: string;
  };
  tagline: string;
}

export default function Footer({ lang, navLabels, tagline }: FooterProps) {
  const navItems = [
    { label: navLabels.home,           href: `/${lang}` },
    { label: navLabels.catalog,        href: `/${lang}/catalogo` },
    { label: navLabels.services,       href: `/${lang}/servicios` },
    { label: navLabels.sustainability,  href: `/${lang}/sostenibilidad` },
    { label: navLabels.quote,          href: `/${lang}/presupuesto` },
    { label: navLabels.contact,        href: `/${lang}/contacto` },
  ];

  return (
    <footer className="relative mt-auto" style={{ backgroundColor: '#060A08' }}>
      {/* ── Gradient separator top ── */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, #22C55E 0%, #3B82F6 100%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">

          {/* ── Column 1: Brand ── */}
          <div className="flex flex-col gap-5">
            {/* Logo */}
            <Link href={`/${lang}`} className="flex items-center gap-2.5 group w-fit">
              <svg
                width="28" height="28" viewBox="0 0 32 32"
                fill="none" xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 transition-transform duration-300 group-hover:rotate-12"
                aria-hidden="true"
              >
                <circle cx="16" cy="16" r="15" stroke="#22C55E" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.5"/>
                <rect x="10" y="10" width="12" height="12" rx="2" stroke="#22C55E" strokeWidth="1.5"/>
                <rect x="13" y="13" width="6" height="6" rx="1" fill="#22C55E" opacity="0.9"/>
                <line x1="7" y1="13" x2="10" y2="13" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="7" y1="16" x2="10" y2="16" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="7" y1="19" x2="10" y2="19" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="22" y1="13" x2="25" y2="13" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="22" y1="16" x2="25" y2="16" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="22" y1="19" x2="25" y2="19" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="16" y1="7" x2="16" y2="10" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="13" y1="7" x2="13" y2="10" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="16" y1="22" x2="16" y2="25" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="19" y1="22" x2="19" y2="25" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="font-display text-base font-bold tracking-tight text-brand-text">
                ReparaTech <span className="text-brand-green">Circular</span>
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-sm text-brand-muted leading-relaxed max-w-xs">
              {tagline}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* GitHub */}
              <a
                href="https://github.com/reparatech-circular"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-text hover:border-brand-green transition-all duration-200 hover:shadow-sm hover:shadow-brand-green/20"
                aria-label="GitHub de ReparaTech Circular"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/reparatech-circular"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-blue hover:border-brand-blue transition-all duration-200 hover:shadow-sm hover:shadow-brand-blue/20"
                aria-label="LinkedIn de ReparaTech Circular"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com/reparatech"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-text hover:border-brand-border/80 transition-all duration-200"
                aria-label="Twitter de ReparaTech Circular"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-sm font-semibold text-brand-text uppercase tracking-widest">
              {lang === 'es' ? 'Navegación' : 'Navigation'}
            </h3>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-brand-muted hover:text-brand-green transition-colors duration-200 w-fit group flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-green opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true"/>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Column 3: Contact ── */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-sm font-semibold text-brand-text uppercase tracking-widest">
              {lang === 'es' ? 'Contacto' : 'Contact'}
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3 group">
                <span className="mt-0.5 text-brand-green flex-shrink-0" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M22 7L12 13 2 7"/>
                  </svg>
                </span>
                <a href="mailto:hola@reparatech.es" className="text-sm text-brand-muted hover:text-brand-text transition-colors duration-200 break-all">
                  hola@reparatech.es
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-brand-blue flex-shrink-0" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                  </svg>
                </span>
                <a href="tel:+34912345678" className="text-sm text-brand-muted hover:text-brand-text transition-colors duration-200">
                  +34 91 234 56 78
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-brand-muted flex-shrink-0" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </span>
                <address className="text-sm text-brand-muted not-italic leading-relaxed">
                  Calle Innovación 42<br/>
                  28001 Madrid, España
                </address>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-brand-muted">
            © 2025 ReparaTech Circular.{' '}
            {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>

          {/* Open Source badge */}
          <a
            href="https://github.com/reparatech-circular"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-border text-xs text-brand-muted hover:text-brand-text hover:border-brand-green transition-all duration-200 group"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="group-hover:text-brand-green transition-colors duration-200" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            <span>100% {lang === 'es' ? 'Código Abierto' : 'Open Source'}</span>
          </a>
        </div>
      </div>

    </footer>
  );
}
