import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface OrbitAnnotationProps {
  labels: { text: string; position: 'top' | 'right' | 'bottom-right' | 'bottom-left' | 'left' }[];
  className?: string;
}

export function OrbitAnnotation({ labels, className }: OrbitAnnotationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbit1Ref = useRef<SVGEllipseElement>(null);
  const orbit2Ref = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        delay: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const labelPositions: Record<string, string> = {
    'top': 'top-0 left-1/2 -translate-x-1/2 -translate-y-full pb-4',
    'right': 'top-1/2 right-0 translate-x-full pl-4 translate-y-[-50%] text-left',
    'bottom-right': 'bottom-0 right-0 translate-x-1/4 translate-y-full pt-4 text-right',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/4 translate-y-full pt-4 text-left',
    'left': 'top-1/2 left-0 -translate-x-full pr-4 translate-y-[-50%] text-right',
  };

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none ${className || ''}`}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
        <ellipse
          ref={orbit1Ref}
          cx="200"
          cy="200"
          rx="180"
          ry="60"
          stroke="#C5CDD5"
          strokeWidth="1"
          className="animate-orbit origin-center"
          style={{ transformOrigin: '200px 200px' }}
        />
        <ellipse
          ref={orbit2Ref}
          cx="200"
          cy="200"
          rx="160"
          ry="50"
          stroke="#C5CDD5"
          strokeWidth="1"
          className="animate-orbit-slow origin-center"
          style={{ transformOrigin: '200px 200px' }}
        />
        {/* Orbit dots */}
        <circle cx="380" cy="200" r="4" fill="white" stroke="#C5CDD5" strokeWidth="1" />
        <circle cx="40" cy="200" r="4" fill="white" stroke="#C5CDD5" strokeWidth="1" />
        <circle cx="200" cy="140" r="4" fill="white" stroke="#C5CDD5" strokeWidth="1" />
        <circle cx="200" cy="260" r="4" fill="white" stroke="#C5CDD5" strokeWidth="1" />
      </svg>

      {labels.map((label, i) => (
        <div
          key={i}
          className={`absolute ${labelPositions[label.position]} max-w-[160px]`}
        >
          <p className="text-xs text-ivory-text-secondary leading-relaxed">{label.text}</p>
        </div>
      ))}
    </div>
  );
}
