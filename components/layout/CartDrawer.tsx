'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import Button from '@/components/ui/Button';

interface CartDrawerProps {
  isEs: boolean;
}

export default function CartDrawer({ isEs }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice, isOpen, setIsOpen } = useCart();
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-brand-surface border-l border-brand-border flex flex-col transition-transform duration-300 ease-in-out shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border">
          <h2 className="font-display font-bold text-lg text-brand-text flex items-center gap-2">
            🛒 {isEs ? 'Carrito' : 'Cart'}
            {totalItems > 0 && (
              <span className="text-xs bg-brand-green text-black px-2 py-0.5 rounded-full font-bold">{totalItems}</span>
            )}
          </h2>
          <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-lg border border-brand-border hover:border-brand-green flex items-center justify-center text-brand-muted hover:text-brand-text transition-colors">
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-5xl mb-4 opacity-30">🛒</div>
              <p className="text-brand-muted text-sm">{isEs ? 'Tu carrito está vacío' : 'Your cart is empty'}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4 p-4 bg-brand-bg rounded-xl border border-brand-border">
                  <div className="w-14 h-14 bg-brand-surface rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    {product.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-brand-text truncate">{product.name}</h4>
                    <p className="text-xs text-brand-muted mt-0.5">{product.price}€ / ud.</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-7 h-7 rounded-md border border-brand-border hover:border-brand-green text-brand-muted hover:text-brand-text flex items-center justify-center text-sm transition-colors"
                      >−</button>
                      <span className="text-sm font-bold text-brand-text w-6 text-center">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-7 h-7 rounded-md border border-brand-border hover:border-brand-green text-brand-muted hover:text-brand-text flex items-center justify-center text-sm transition-colors"
                      >+</button>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="ml-auto text-xs text-red-400/70 hover:text-red-400 transition-colors"
                      >
                        {isEs ? 'Quitar' : 'Remove'}
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-brand-green whitespace-nowrap">
                    {product.price * quantity}€
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-brand-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-brand-muted">{isEs ? 'Total' : 'Total'}</span>
              <span className="text-2xl font-display font-bold text-brand-green">{totalPrice.toFixed(2)}€</span>
            </div>
            <Button className="w-full" size="lg" onClick={() => setShowConfirm(true)}>
              {isEs ? 'Finalizar compra' : 'Checkout'}
            </Button>
            <button onClick={clearCart} className="w-full text-xs text-brand-muted hover:text-red-400 transition-colors py-1">
              {isEs ? 'Vaciar carrito' : 'Clear cart'}
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowConfirm(false)} />
          <div className="relative bg-brand-surface border border-brand-border rounded-3xl p-10 max-w-md w-full mx-4 shadow-2xl text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h3 className="text-2xl font-display font-bold text-brand-text mb-4">
              {isEs ? '¡Pedido Confirmado!' : 'Order Confirmed!'}
            </h3>
            <p className="text-brand-muted text-sm mb-8">
              {isEs
                ? 'Esto es una simulación. En una tienda real, se procesaría el pago aquí.'
                : 'This is a simulation. In a real store, payment would be processed here.'}
            </p>
            <p className="text-brand-green font-display font-bold text-3xl mb-8">{totalPrice.toFixed(2)}€</p>
            <Button className="w-full" onClick={() => { clearCart(); setShowConfirm(false); setIsOpen(false); }}>
              {isEs ? 'Aceptar' : 'OK'}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
