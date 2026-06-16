import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div className={`
      bg-brand-surface border border-brand-border rounded-xl p-6
      transition-all duration-300
      ${hover ? 'hover:border-brand-green/50 hover:shadow-xl hover:shadow-black/40' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
}
