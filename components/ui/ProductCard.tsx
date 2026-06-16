'use client';

import React from 'react';
import Image from 'next/image';
import { type Product } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import { useToast } from '@/components/ui/Toast';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ProductCardProps {
  product: Product;
  isEs?: boolean;
  index?: number;
}

export default function ProductCard({ product, isEs = true, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const { ref, isRevealed } = useScrollReveal();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    showToast(isEs ? '¡Añadido al carrito!' : 'Added to cart!');
  };

  const getBadgeStyle = (grade: string) => {
    if (grade === 'A+') return 'bg-[#F59E0B] text-black border-none';
    if (grade === 'A') return 'bg-[rgba(0,255,148,0.2)] text-[#00FF94] border border-[#00FF94]';
    return 'bg-[rgba(14,165,233,0.2)] text-[#0EA5E9] border border-[#0EA5E9]';
  };

  const getImage = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('macbook') || n.includes('apple')) return 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=75';
    if (n.includes('portátil') || n.includes('laptop') || n.includes('thinkpad')) return 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=75';
    if (n.includes('sobremesa') || n.includes('pc') || n.includes('workstation')) return 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&q=75';
    if (n.includes('monitor') || n.includes('pantalla')) return 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=75';
    if (n.includes('teclado') || n.includes('ratón') || n.includes('periférico')) return 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&q=75';
    if (n.includes('iphone') || n.includes('smartphone') || n.includes('móvil') || n.includes('galaxy')) return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=75';
    return 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=75';
  };

  return (
    <div 
      ref={ref}
      className={`reveal-base ${isRevealed ? 'revealed' : ''} group bg-[rgba(13,17,23,0.95)] border border-[rgba(255,255,255,0.06)] rounded-[8px] overflow-hidden hover:border-[rgba(0,255,148,0.4)] hover:shadow-[0_0_30px_rgba(0,255,148,0.08),0_8px_32px_rgba(0,0,0,0.4)] hover:-translate-y-1`}
      style={{ transitionDelay: `${Math.min(index * 0.1, 0.5)}s` }}
    >
      <div className="h-[200px] relative flex items-center justify-center overflow-hidden">
        <Image src={product.image || getImage(product.name)} fill style={{ objectFit: 'cover' }} className="transition-transform duration-[600ms] ease-out group-hover:scale-105" alt={product.name} />
        <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(2,8,23,0.95) 100%)' }} />
        
        <div className="absolute top-3 left-3 px-2 py-1 bg-[rgba(168,85,247,0.2)] text-[#A855F7] text-[10px] rounded uppercase font-bold z-[2]">
          ♻️ {isEs ? 'Reacondicionado' : 'Refurbished'}
        </div>
        <div className={`absolute top-3 right-3 px-2 py-1 rounded font-orbitron font-bold text-[10px] uppercase z-[2] ${getBadgeStyle(product.grade)}`}>
          Grado {product.grade}
        </div>
      </div>
      
      <div className="p-[20px] relative z-[2]">
        <h3 className="font-display font-semibold text-[16px] text-brand-text mb-2 truncate">{product.name}</h3>
        <p className="font-sans text-[13px] text-brand-muted mb-4 line-clamp-2">
          <span className="mr-1">⚡</span>{product.specs}
        </p>
        
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[rgba(255,255,255,0.06)]">
          <span className="font-sans text-[14px] text-[#64748B] line-through">{product.originalPrice}€</span>
          <span className="font-orbitron font-bold text-[24px] text-brand-green">{product.price}€</span>
        </div>
        
        <button 
          onClick={handleAdd}
          className="w-full flex items-center justify-center gap-2 bg-transparent border border-[rgba(0,255,148,0.4)] text-brand-green font-display text-[14px] py-2.5 rounded hover:bg-[rgba(0,255,148,0.1)] hover:border-[#00FF94] hover:shadow-[0_0_20px_rgba(0,255,148,0.3)] transition-all duration-300"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          {isEs ? 'Añadir al carrito' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
}

