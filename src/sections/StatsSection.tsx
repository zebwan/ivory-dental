import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const yearsRef = useRef<HTMLDivElement>(null);
  const clinicsRef = useRef<HTMLDivElement>(null);
  const [yearsCount, setYearsCount] = useState(0);
  const [clinicsCount, setClinicsCount] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const yearsCounter = { val: 0 };
      const clinicsCounter = { val: 0 };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.to(yearsCounter, {
            val: 12,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => setYearsCount(Math.round(yearsCounter.val)),
          });

          gsap.to(clinicsCounter, {
            val: 3,
            duration: 2,
            delay: 0.3,
            ease: 'power2.out',
            onUpdate: () => setClinicsCount(Math.round(clinicsCounter.val)),
          });
        },
      });

      // Parallax for numbers
      gsap.to(yearsRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(clinicsRef.current, {
        y: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-ivory-bg overflow-hidden"
    >
      <div className="ivory-container">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Years */}
          <div ref={yearsRef} className="text-center lg:text-left">
            <span className="text-[100px] sm:text-[140px] lg:text-[160px] font-extralight text-ivory-text leading-none tracking-[-0.04em]">
              {String(yearsCount).padStart(2, '0')}
            </span>
            <p className="text-base text-ivory-text-secondary mt-2">Years of Experience</p>
          </div>

          {/* Implant (continued from hero) */}
          <div className="hidden lg:flex justify-center items-center w-[300px] h-[350px]">
            <img
              src="/images/implant.png"
              alt=""
              className="w-full h-full object-contain opacity-60"
            />
          </div>

          {/* Clinics */}
          <div ref={clinicsRef} className="text-center lg:text-right">
            <span className="text-[100px] sm:text-[140px] lg:text-[160px] font-extralight text-ivory-text leading-none tracking-[-0.04em]">
              {String(clinicsCount).padStart(2, '0')}
            </span>
            <p className="text-base text-ivory-text-secondary mt-2">Clinics Across Malaysia</p>
          </div>
        </div>
      </div>
    </section>
  );
}
