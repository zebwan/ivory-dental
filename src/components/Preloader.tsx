import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const implantRef = useRef<HTMLImageElement>(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const counter = { val: 1 };

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            onComplete();
          },
        });
      },
    });

    // Implant fade in and scale
    tl.fromTo(
      implantRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' },
      0
    );

    // Number count
    tl.to(
      counter,
      {
        val: 100,
        duration: 2.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          setCount(Math.round(counter.val));
        },
      },
      0
    );

    // Hold briefly at 100
    tl.to({}, { duration: 0.3 });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-ivory-bg flex items-center justify-center"
    >
      {/* 3D Implant - behind */}
      <img
        ref={implantRef}
        src="/images/implant.png"
        alt=""
        className="absolute z-0 w-[200px] sm:w-[300px] h-auto object-contain"
        style={{ opacity: 0 }}
      />

      {/* Large number on top of implant */}
      <span
        ref={numberRef}
        className="relative z-10 text-[80px] sm:text-[120px] font-extralight text-ivory-text/90 tracking-[-0.04em] select-none mix-blend-multiply"
      >
        {count}
      </span>
    </div>
  );
}
