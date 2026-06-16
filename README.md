# ReparaTech Circular

Proyecto web profesional enfocado en reparación, reutilización, venta de equipos reacondicionados y reciclaje de material tecnológico.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## Instalación

1. Clona el repositorio e instala las dependencias:
   ```bash
   npm install
   ```

2. Ejecuta el servidor de desarrollo local:
   ```bash
   npm run dev
   ```

## Estructura de Carpetas

- `app/`: Rutas, layouts y páginas (App Router + i18n dinámico `[lang]`).
- `components/`: Componentes reutilizables categorizados por (layout, ui, sections).
- `lib/`: Lógica general, conexión de base de datos o utilidades genéricas (ej. `i18n.ts`).
- `locales/`: Diccionarios de idiomas en formato JSON (`es.json`, `en.json`).
- `public/`: Recursos estáticos (imágenes, fuentes, etc.).

## Despliegue en Vercel

Este proyecto está optimizado y preparado para desplegar en Vercel sin configuraciones extra.

1. Instala el Vercel CLI (opcional): `npm i -g vercel`
2. Ejecuta:
   ```bash
   vercel deploy
   ```
O conecta directamente este repositorio a tu cuenta de Vercel y se desplegará automáticamente.

## Configuración de Supabase

1. Crear cuenta en supabase.com
2. Crear nuevo proyecto
3. Ir a SQL Editor y ejecutar el contenido de `supabase/schema.sql`
4. Copiar URL y claves desde Settings > API al archivo `.env.local`
5. En Authentication > Settings, desactivar "Enable email confirmations" para desarrollo
6.URLs: https://reparatech-circular.vercel.app/es para la web principal y https://reparatech-circular.vercel.app/admin/login para el apartado de administracion 
