import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowButton } from '@/components/ArrowButton';
import { PillButton } from '@/components/PillButton';

gsap.registerPlugin(ScrollTrigger);

const patients = [
  { name: 'Aisyah', image: './images/patient-aisyah.jpg', label: "Aisyah's whitening journey" },
  { name: 'Raja', image: './images/patient-raja.jpg', label: "Raja's braces transformation" },
  { name: 'Devi', image: './images/patient-devi.jpg', label: "Devi's smile makeover" },
];

export function ResultsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.result-word');
        gsap.fromTo(
          words,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      }

      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.querySelectorAll('.patient-card');
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const maxIndex = patients.length - 1;
  const cardWidth = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 300 : 260;
  const cardGap = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 24 : 16;
  const translateAmount = activeIndex * (cardWidth + cardGap);

  return (
    <section ref={sectionRef} id="results" className="py-24 lg:py-32 bg-ivory-bg">
      <div className="ivory-container">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12">
          <div>
            <div ref={headlineRef}>
              <div className="overflow-hidden">
                <p className="result-word text-4xl sm:text-5xl lg:text-7xl font-light text-ivory-text leading-[1.05] tracking-[-0.03em]">
                  Discover the
                </p>
              </div>
              <div className="overflow-hidden">
                <p className="result-word text-4xl sm:text-5xl lg:text-7xl leading-[1.05] tracking-[-0.03em]">
                  <span className="font-semibold text-ivory-text">Power</span>
                  <span className="font-light text-ivory-text"> of </span>
                  <span className="font-light text-ivory-text-accent">change</span>
                </p>
              </div>
            </div>
            <div className="mt-6">
              <PillButton>Book a Consultation</PillButton>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3 lg:pt-8">
            <ArrowButton
              direction="left"
              variant="outline"
              onClick={() => setActiveIndex((p) => Math.max(0, p - 1))}
              disabled={activeIndex === 0}
            />
            <ArrowButton
              direction="right"
              variant="outline"
              onClick={() => setActiveIndex((p) => Math.min(maxIndex, p + 1))}
              disabled={activeIndex === maxIndex}
            />
          </div>
        </div>

        {/* Patient Cards */}
        <div className="overflow-hidden -mx-1 px-1">
          <div
            ref={cardsContainerRef}
            className="flex gap-4 lg:gap-6 transition-transform duration-500 ease-out will-change-transform"
            style={{ transform: `translateX(-${translateAmount}px)` }}
          >
            {patients.map((patient) => (
              <div
                key={patient.name}
                className="patient-card flex-shrink-0 w-[260px] lg:w-[300px] rounded-2xl overflow-hidden relative group"
                data-cursor="pointer"
              >
                <div className="aspect-[4/5] overflow-hidden bg-ivory-card">
                  <img
                    src={patient.image}
                    alt={`${patient.name}'s smile transformation`}
                    className="w-full h-full object-cover object-top grayscale-hover"
                    loading="lazy"
                  />
                </div>
                {/* Label Pill */}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-4 py-2.5 rounded-3xl bg-white/90 backdrop-blur-sm text-sm font-medium text-ivory-text shadow-sm group-hover:bg-white transition-colors whitespace-nowrap">
                    {patient.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
