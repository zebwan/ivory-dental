import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PillButton } from '@/components/PillButton';

gsap.registerPlugin(ScrollTrigger);

export function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll('.exp-line');
        gsap.fromTo(
          lines,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
            },
          }
        );
      }

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 lg:py-40 bg-ivory-bg">
      <div className="ivory-container">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
          {/* Left: Supporting Content */}
          <div ref={contentRef} className="lg:max-w-[380px] lg:pt-8 order-2 lg:order-1">
            <p className="text-base text-ivory-text-secondary leading-relaxed mb-6">
              Since 2013, we've grown from a small practice in Bangsar to three clinics across KL. Dr. Sarah Lim and our team of six dentists have treated over 15,000 patients — from nervous first-timers to families who've been with us for generations.
            </p>
            <p className="text-base text-ivory-text-secondary leading-relaxed mb-8">
              We speak English, Malay, Mandarin, and Tamil because we believe great dental care starts with being understood. Walk in anytime — no appointment needed for emergencies.
            </p>
            <PillButton>Book a Consultation</PillButton>
          </div>

          {/* Right: Large Headline */}
          <div ref={headlineRef} className="lg:text-right order-1 lg:order-2">
            <div className="overflow-hidden">
              <p className="exp-line text-5xl sm:text-6xl lg:text-[96px] font-light text-ivory-text leading-[1.05] tracking-[-0.03em]">
                Over
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="exp-line text-5xl sm:text-6xl lg:text-[96px] font-semibold text-ivory-text leading-[1.05] tracking-[-0.03em]">
                10 Years
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="exp-line text-5xl sm:text-6xl lg:text-[96px] font-light text-ivory-text leading-[1.05] tracking-[-0.03em]">
                of caring for
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="exp-line text-5xl sm:text-6xl lg:text-[96px] font-light text-ivory-text leading-[1.05] tracking-[-0.03em]">
                smiles across
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="exp-line text-5xl sm:text-6xl lg:text-[96px] font-light text-ivory-text-accent leading-[1.05] tracking-[-0.03em]">
                Kuala Lumpur
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
