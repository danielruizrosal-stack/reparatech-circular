'use client';

import { useRouter, usePathname } from 'next/navigation';
import { i18n, type Locale } from '@/lib/i18n';

interface LanguageSwitcherProps {
  currentLang: Locale;
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (locale: Locale) => {
    if (locale === currentLang) return;

    // Replace the current locale segment with the new one
    const segments = pathname.split('/');
    segments[1] = locale;
    router.push(segments.join('/'));
  };

  return (
    <div className="flex items-center gap-1 p-1 rounded-full border border-brand-border">
      {i18n.locales.map((locale) => {
        const isActive = locale === currentLang;
        return (
          <button
            key={locale}
            onClick={() => switchLocale(locale as Locale)}
            className={`
              px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest
              transition-all duration-200
              ${isActive
                ? 'bg-brand-green text-black shadow-sm shadow-brand-green/40'
                : 'text-brand-muted border border-transparent hover:border-brand-green hover:text-brand-text'
              }
            `}
            aria-label={`Cambiar idioma a ${locale.toUpperCase()}`}
          >
            {locale.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
