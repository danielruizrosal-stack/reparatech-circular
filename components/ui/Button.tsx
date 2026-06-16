import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-brand-green text-black hover:bg-brand-green/90 shadow-lg shadow-brand-green/20 hover:shadow-brand-green/40',
    secondary: 'bg-brand-blue text-white hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/40',
    outline: 'border border-brand-border text-brand-text hover:border-brand-green hover:text-brand-green bg-transparent',
    ghost: 'text-brand-muted hover:text-brand-green hover:bg-brand-border/30 bg-transparent',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
