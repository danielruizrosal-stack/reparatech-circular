'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="pt-32 pb-20 px-4 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <div className="text-6xl mb-6">⚠️</div>
      <h2 className="text-3xl font-display font-bold text-brand-text mb-4">¡Ups! Algo ha salido mal</h2>
      <p className="text-brand-muted mb-10 max-w-md mx-auto">
        Ha ocurrido un error inesperado. Por favor, intenta recargar la página o volver al inicio.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()}>Intentar de nuevo</Button>
        <Button variant="outline" onClick={() => window.location.href = '/'}>Volver al inicio</Button>
      </div>
    </div>
  );
}
