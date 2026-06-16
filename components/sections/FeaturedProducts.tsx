'use client';
import { products as fallbackProducts, getProducts, type Product } from '@/lib/products';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function FeaturedProducts({ isEs }: { isEs: boolean }) {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  useEffect(() => { getProducts().then(setProducts) }, []);
  const featured = products.filter(p => p.featured);
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="bg-brand-surface relative py-32 border-t border-[rgba(0,255,148,0.2)]">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-green to-transparent" />
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div ref={ref} className={`flex justify-between items-end mb-12 reveal-base ${isRevealed ? 'revealed' : ''}`}>
          <div>
            <span className="font-orbitron text-[11px] text-brand-green tracking-[3px] uppercase block mb-4">
              // EQUIPOS
            </span>
            <h2 className="font-orbitron font-bold text-[48px] text-brand-text mb-6">
              {isEs ? 'Equipos Reacondicionados' : 'Refurbished Equipment'}
            </h2>
            <div className="w-[60px] h-[2px] bg-gradient-to-r from-brand-green to-brand-blue mb-6" />
          </div>
          <Link href={`/${isEs ? 'es' : 'en'}/catalogo`} className="hidden md:block font-orbitron text-[14px] text-brand-green hover:text-brand-blue transition-colors">
            {isEs ? 'Ir a la tienda →' : 'Go to store →'}
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} isEs={isEs} index={index} />
          ))}
        </div>
        
        <Link href={`/${isEs ? 'es' : 'en'}/catalogo`} className="md:hidden block text-center mt-12 font-orbitron text-[14px] text-brand-green hover:text-brand-blue transition-colors">
          {isEs ? 'Ir a la tienda →' : 'Go to store →'}
        </Link>
      </div>
    </section>
  );
}

