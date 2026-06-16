import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'blue' | 'gray';
  className?: string;
}

export default function Badge({ children, variant = 'green', className = '' }: BadgeProps) {
  const variants = {
    green: 'bg-brand-green/10 text-brand-green border-brand-green/20',
    blue: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
    gray: 'bg-brand-border/50 text-brand-muted border-brand-border',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
