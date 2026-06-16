'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 30;

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);
  const [shake, setShake] = useState(false);

  // Check if already logged in as admin
  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: adminUser } = await supabase
          .from('admin_users')
          .select('role')
          .eq('email', user.email)
          .single();
        if (adminUser) router.replace('/admin/dashboard');
      }
    };
    checkSession();
  }, [router]);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutRemaining <= 0) return;
    const timer = setTimeout(() => setLockoutRemaining((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [lockoutRemaining]);

  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutRemaining > 0) return;
    if (!email || !password) {
      setError('Por favor, rellena todos los campos.');
      triggerShake();
      return;
    }

    setLoading(true);
    setError('');

    try {
      const supabase = createClient();

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (newAttempts >= MAX_ATTEMPTS) {
          setLockoutRemaining(LOCKOUT_SECONDS);
          setAttempts(0);
          setError(`Demasiados intentos fallidos. Espera ${LOCKOUT_SECONDS} segundos.`);
        } else {
          setError('Credenciales incorrectas. Inténtalo de nuevo.');
        }
        triggerShake();
        return;
      }

      if (!authData.user) {
        setError('Error de conexión. Comprueba tu conexión a internet.');
        triggerShake();
        return;
      }

      // Verify admin role in admin_users table
      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('role')
        .eq('email', authData.user.email)
        .single();

      console.log('adminUser:', adminUser, 'adminError:', adminError);

      if (adminError || !adminUser) {
        await supabase.auth.signOut();
        setError('Acceso denegado. Este email no tiene permisos de administrador.');
        triggerShake();
        return;
      }

      // Update last_login
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('email', authData.user.email);

      router.replace('/admin/dashboard');
    } catch {
      setError('Error de conexión. Comprueba tu conexión a internet.');
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const isLocked = lockoutRemaining > 0;
  const inputBorderClass = error
    ? 'border-[#EF4444] focus:border-[#EF4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]'
    : 'border-[rgba(0,255,148,0.2)] focus:border-[#00FF94] focus:shadow-[0_0_0_3px_rgba(0,255,148,0.1)]';

  return (
    <>
      <style>{`
        @keyframes grid-slide {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        @keyframes orb-float-a {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-30px, 40px); }
        }
        @keyframes orb-float-b {
          0% { transform: translate(0, 0); }
          100% { transform: translate(30px, -40px); }
        }
        @keyframes shield-pulse {
          0%, 100% { filter: drop-shadow(0 0 8px #00FF94); opacity: 1; }
          50% { filter: drop-shadow(0 0 20px #00FF94); opacity: 0.8; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-8px); }
          30% { transform: translateX(8px); }
          45% { transform: translateX(-6px); }
          60% { transform: translateX(6px); }
          75% { transform: translateX(-3px); }
          90% { transform: translateX(3px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .shake-anim { animation: shake 0.6s ease-in-out; }
        .shield-glow { animation: shield-pulse 2s ease-in-out infinite; }
      `}</style>

      <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden" style={{ background: '#020817' }}>
        {/* Animated grid background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div
            className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%]"
            style={{
              backgroundImage: `linear-gradient(rgba(0,255,148,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,148,0.04) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
              animation: 'grid-slide 20s linear infinite',
            }}
          />
        </div>

        {/* Orbes de luz */}
        <div aria-hidden="true" className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, #0EA5E9 0%, transparent 70%)', opacity: 0.07, animation: 'orb-float-a 8s ease-in-out infinite alternate' }} />
        <div aria-hidden="true" className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)', opacity: 0.07, animation: 'orb-float-b 10s ease-in-out infinite alternate-reverse' }} />
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, #00FF94 0%, transparent 70%)', opacity: 0.025 }} />

        {/* Login Card */}
        <div
          className={`relative w-full max-w-[420px] z-10 ${shake ? 'shake-anim' : ''}`}
          style={{
            background: 'rgba(13,17,23,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,255,148,0.2)',
            borderRadius: '12px',
            padding: '48px 40px',
            boxShadow: '0 0 60px rgba(0,255,148,0.05)',
          }}
        >
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <svg
              className="shield-glow mb-5"
              width="48" height="48" viewBox="0 0 48 48" fill="none"
              aria-hidden="true"
            >
              <path d="M24 4L6 12V24C6 34.5 14 43.4 24 46C34 43.4 42 34.5 42 24V12L24 4Z" stroke="#00FF94" strokeWidth="2" fill="none" />
              <path d="M18 24L22 28L30 20" stroke="#00FF94" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <span
              className="block mb-3 text-center"
              style={{ fontFamily: 'var(--font-orbitron, monospace)', fontSize: '11px', color: '#00FF94', letterSpacing: '4px', textTransform: 'uppercase' }}
            >
              [ ACCESO RESTRINGIDO ]
            </span>
            <h1
              className="text-center mb-2"
              style={{ fontFamily: 'var(--font-orbitron, monospace)', fontWeight: 700, fontSize: '24px', color: '#F8FAFC', lineHeight: 1.2 }}
            >
              Panel de Administración
            </h1>
            <p style={{ fontSize: '14px', color: '#64748B', textAlign: 'center' }}>Solo personal autorizado</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="admin-email"
                style={{ display: 'block', fontSize: '13px', color: '#94A3B8', marginBottom: '8px', fontFamily: 'var(--font-inter, sans-serif)' }}
              >
                Email corporativo
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="admin@reparatech.es"
                disabled={loading || isLocked}
                className={`w-full outline-none transition-all duration-200 ${inputBorderClass}`}
                style={{
                  background: 'rgba(2,8,23,0.8)',
                  border: `1px solid`,
                  color: '#F8FAFC',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
                aria-label="Email corporativo"
                aria-required="true"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="admin-password"
                style={{ display: 'block', fontSize: '13px', color: '#94A3B8', marginBottom: '8px', fontFamily: 'var(--font-inter, sans-serif)' }}
              >
                Contraseña
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••"
                  disabled={loading || isLocked}
                  className={`w-full outline-none transition-all duration-200 ${inputBorderClass}`}
                  style={{
                    background: 'rgba(2,8,23,0.8)',
                    border: `1px solid`,
                    color: '#F8FAFC',
                    padding: '12px 44px 12px 16px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                  aria-label="Contraseña"
                  aria-required="true"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#64748B' }}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error alert */}
            {error && (
              <div
                role="alert"
                className="mb-5"
                style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid #EF4444',
                  borderRadius: '6px',
                  padding: '12px 16px',
                  fontSize: '13px',
                  color: '#FCA5A5',
                  lineHeight: 1.5,
                }}
              >
                {error}
              </div>
            )}

            {/* Lockout countdown */}
            {isLocked && (
              <div
                className="mb-5 text-center"
                style={{ fontSize: '13px', color: '#F59E0B' }}
                aria-live="polite"
              >
                Bloqueado — reintenta en <span style={{ fontFamily: 'var(--font-orbitron, monospace)', fontWeight: 700 }}>{lockoutRemaining}s</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || isLocked}
              aria-busy={loading}
              className="w-full transition-all duration-200"
              style={{
                background: isLocked ? '#374151' : 'linear-gradient(135deg, #00FF94, #0EA5E9)',
                color: '#020817',
                fontFamily: 'var(--font-orbitron, monospace)',
                fontWeight: 700,
                fontSize: '14px',
                padding: '14px',
                borderRadius: '6px',
                border: 'none',
                cursor: isLocked || loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                opacity: isLocked ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading && !isLocked) {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.01)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 30px rgba(0,255,148,0.4)';
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
              }}
            >
              {loading ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#020817" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" style={{ animation: 'spin 0.8s linear infinite' }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Verificando...
                </>
              ) : (
                'Acceder al Panel'
              )}
            </button>
          </form>

          {/* Footer link */}
          <div className="text-center mt-8">
            <a
              href="/"
              style={{ fontSize: '12px', color: '#374151', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#00FF94')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#374151')}
            >
              ← Volver a la tienda
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
