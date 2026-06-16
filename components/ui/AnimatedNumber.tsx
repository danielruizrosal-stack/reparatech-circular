'use client';
import { useEffect, useState, useRef } from 'react';

export default function AnimatedNumber({ end, decimals = 0, duration = 2000 }: { end: number, decimals?: number, duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) {
      setVal(end);
      return;
    }

    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        let startTimestamp: number | null = null;
        
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const easeOutQuad = 1 - (1 - progress) * (1 - progress);
          setVal(easeOutQuad * end);
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            setVal(end);
          }
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(currentRef);

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{val.toFixed(decimals)}</span>;
}
