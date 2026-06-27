import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const annotations = [
  { text: 'Painless treatments with comfort-focused techniques', position: 'top' },
  { text: 'Digital X-rays with 90% less radiation exposure', position: 'right' },
  { text: 'Same-day crowns and emergency walk-ins available', position: 'bottom-right' },
  { text: 'Strict MDA-compliant sterilisation protocols', position: 'bottom-left' },
];

export function QualitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const implantWrapperRef = useRef<HTMLDivElement>(null);
  const implantRef = useRef<HTMLImageElement>(null);
  const warrantyRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
        }
      );

      gsap.fromTo(
        implantWrapperRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
        }
      );

      if (labelsRef.current) {
        const items = labelsRef.current.querySelectorAll('.anno-item');
        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.5,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
          }
        );
      }

      gsap.fromTo(
        warrantyRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-ivory-bg overflow-hidden">
      <div className="ivory-container">
        {/* Top row: Headline + Warranty on opposite sides */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-10">
          {/* Left: Headline */}
          <div ref={headlineRef}>
            <h2 className="text-5xl sm:text-6xl lg:text-[64px] font-light text-ivory-text leading-[1.05]">
              Certified
            </h2>
            <h2 className="text-5xl sm:text-6xl lg:text-[64px] font-semibold text-ivory-text leading-[1.05]">
              Quality
            </h2>
            <a
              href="#"
              className="inline-flex items-center gap-2 mt-4 text-xs uppercase tracking-wider text-ivory-text-secondary hover:text-ivory-text transition-colors"
              data-cursor="pointer"
            >
              <ArrowUpRight size={14} />
              View Certificate
            </a>
          </div>

          {/* Right: Official Warranty */}
          <div ref={warrantyRef} className="lg:text-right">
            <p className="text-4xl sm:text-5xl lg:text-[64px] font-light text-ivory-text-accent leading-[1.05]">
              Official
            </p>
            <p className="text-4xl sm:text-5xl lg:text-[64px] font-semibold text-ivory-text leading-[1.05]">
              Warranty
            </p>
          </div>
        </div>

        {/* Center: Exploded Implant with orbiting annotations */}
        <div ref={implantWrapperRef} className="relative max-w-[420px] lg:max-w-[480px] mx-auto">
          {/* Implant image */}
          <img
            ref={implantRef}
            src="./images/exploded-implant.png"
            alt="Exploded view of dental implant components"
            className="w-full h-auto animate-float relative z-10"
          />

          {/* Annotation labels - positioned around the implant */}
          <div ref={labelsRef} className="absolute inset-0 z-20 pointer-events-none">
            {/* Top label - centered above */}
            <div className="anno-item absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full flex items-start gap-2 max-w-[170px]">
              <div className="w-2 h-2 rounded-full bg-white border border-ivory-border mt-1 flex-shrink-0 shadow-sm" />
              <p className="text-[11px] lg:text-xs text-ivory-text-secondary leading-snug text-center">
                {annotations[0].text}
              </p>
            </div>

            {/* Right label - beside the abutment area */}
            <div className="anno-item absolute top-[28%] -right-2 lg:right-0 translate-x-full flex items-start gap-2 max-w-[150px]">
              <div className="w-2 h-2 rounded-full bg-white border border-ivory-border mt-1 flex-shrink-0 shadow-sm" />
              <p className="text-[11px] lg:text-xs text-ivory-text-secondary leading-snug">
                {annotations[1].text}
              </p>
            </div>

            {/* Bottom-right label - below the screw */}
            <div className="anno-item absolute bottom-[20%] -right-2 lg:-right-6 translate-x-full flex items-start gap-2 max-w-[150px]">
              <div className="w-2 h-2 rounded-full bg-white border border-ivory-border mt-1 flex-shrink-0 shadow-sm" />
              <p className="text-[11px] lg:text-xs text-ivory-text-secondary leading-snug">
                {annotations[2].text}
              </p>
            </div>

            {/* Bottom-left label - below the screw left side */}
            <div className="anno-item absolute bottom-[20%] -left-2 lg:-left-6 -translate-x-full flex items-start gap-2 flex-row-reverse max-w-[150px]">
              <div className="w-2 h-2 rounded-full bg-white border border-ivory-border mt-1 flex-shrink-0 shadow-sm" />
              <p className="text-[11px] lg:text-xs text-ivory-text-secondary leading-snug text-right">
                {annotations[3].text}
              </p>
            </div>
          </div>

          {/* Orbit ring SVG */}
          <svg
            className="absolute inset-[-15%] w-[130%] h-[130%] animate-orbit-slow pointer-events-none z-0"
            viewBox="0 0 400 500"
            fill="none"
            style={{ transformOrigin: '50% 50%' }}
          >
            <ellipse
              cx="200"
              cy="250"
              rx="180"
              ry="240"
              stroke="#C5CDD5"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.5"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
