import { MetadataRoute } from 'next';
import { i18n, type Locale } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://reparatech-circular.vercel.app';
  const routes = ['', '/catalogo', '/servicios', '/sostenibilidad', '/presupuesto', '/contacto'];
  
  const entries: MetadataRoute.Sitemap = [];

  i18n.locales.forEach((locale: Locale) => {
    routes.forEach((route) => {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  return entries;
}
