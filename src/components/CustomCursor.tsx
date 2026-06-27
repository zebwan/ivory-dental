import { useEffect, useRef, useState } from 'react';
import { useHoverCapable } from '@/hooks/useMediaQuery';

export function CustomCursor() {
  const isHoverCapable = useHoverCapable();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!isHoverCapable) return;

    document.body.classList.add('desktop-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('[data-cursor="pointer"]')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('[data-cursor="pointer"]')
      ) {
        setIsHovering(false);
      }
    };

    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15;

      if (cursorRef.current) {
        const rotation = (targetRef.current.x - posRef.current.x) * 0.5;
        cursorRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) rotate(${rotation}deg) scale(${isHovering ? 1.5 : 1})`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove('desktop-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isHoverCapable, isHovering]);

  if (!isHoverCapable) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-colors duration-200 ${
        isHovering ? 'mix-blend-difference' : ''
      }`}
      style={{ willChange: 'transform' }}
    >
      <svg
        width="12"
        height="14"
        viewBox="0 0 12 14"
        fill="none"
        className={`transition-colors duration-200 ${isHovering ? 'text-white' : 'text-ivory-text'}`}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <path d="M12 7L0 14L2 7L0 0L12 7Z" fill="currentColor" />
      </svg>
    </div>
  );
}
