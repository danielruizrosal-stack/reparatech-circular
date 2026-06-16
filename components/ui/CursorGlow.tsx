'use client';
import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    
    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    let frame: number;
    const update = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed top-0 left-0 z-[9998] w-[300px] h-[300px] -ml-[150px] -mt-[150px] rounded-full will-change-transform"
         style={{ background: 'radial-gradient(circle, rgba(0,255,148,0.06) 0%, transparent 70%)' }}
         ref={glowRef} />
  );
}
