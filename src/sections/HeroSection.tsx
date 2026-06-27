import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import { PillButton } from '@/components/PillButton';
import { OrbitAnnotation } from '@/components/OrbitAnnotation';
import { FloatingParticles } from '@/components/FloatingParticles';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  isReady: boolean;
}

export function HeroSection({ isReady }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const implantRef = useRef<HTMLImageElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isReady) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Headline words stagger in
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.hero-word');
        tl.fromTo(
          words,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
        );
      }

      // Implant entrance
      tl.fromTo(
        implantRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' },
        0.2
      );

      // CTA
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.8
      );

      // Counter
      tl.fromTo(
        counterRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        1
      );

      // Socials
      tl.fromTo(
        socialsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        1
      );

      // Implant parallax on scroll
      gsap.to(implantRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReady]);

  const orbitLabels = [
    { text: 'Lifetime Guarantee', position: 'left' as const },
    { text: 'Official Representative of premium Implants', position: 'right' as const },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden bg-ivory-bg"
      style={{
        background: 'radial-gradient(ellipse at center, #EFF2F5 0%, #E8ECF0 70%)',
      }}
    >
      <FloatingParticles count={10} />

      <div className="ivory-container relative z-10 pt-28 pb-12 min-h-[100dvh] flex flex-col">
        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          {/* Left: Headline */}
          <div className="lg:col-span-5 relative z-20">
            <div ref={headlineRef} className="space-y-1">
              <div className="overflow-hidden">
                <p className="hero-word text-3xl sm:text-4xl lg:text-[56px] font-light text-ivory-text leading-[1.1] tracking-[-0.02em]">
                  Your family's
                </p>
              </div>
              <div className="overflow-hidden">
                <p className="hero-word text-3xl sm:text-4xl lg:text-[56px] leading-[1.1] tracking-[-0.02em]">
                  <span className="font-light text-ivory-text">trusted </span>
                  <span className="font-semibold text-ivory-text">dental care</span>
                  <span className="font-light text-ivory-text-accent"> partner</span>
                </p>
              </div>
              <div className="overflow-hidden">
                <p className="hero-word text-3xl sm:text-4xl lg:text-[56px] leading-[1.1] tracking-[-0.02em]">
                  <span className="font-light text-ivory-text">in the heart of </span>
                  <span className="font-light text-ivory-text-accent">KL</span>
                </p>
              </div>

              <div ref={ctaRef} className="pt-8" style={{ opacity: 0 }}>
                <PillButton>Book a Consultation</PillButton>
              </div>
            </div>
          </div>

          {/* Center: 3D Implant */}
          <div className="lg:col-span-4 flex justify-center items-center relative">
            <div className="relative w-[280px] h-[400px] sm:w-[350px] sm:h-[500px]">
              <img
                ref={implantRef}
                src="./images/implant.png"
                alt="Dental implant"
                className="w-full h-full object-contain animate-float"
                style={{ opacity: 0 }}
              />
              {/* Orbit annotations */}
              <div className="absolute inset-0 -m-12 sm:-m-20">
                <OrbitAnnotation labels={orbitLabels} />
              </div>
            </div>
          </div>

          {/* Right: Smile text + Socials */}
          <div className="lg:col-span-3 flex flex-col justify-between h-full">
            <div className="space-y-1 lg:pt-20">
              <div className="overflow-hidden">
                <p className="hero-word text-3xl sm:text-4xl lg:text-[56px] leading-[1.1] tracking-[-0.02em]">
                  <span className="font-light text-ivory-text">for a </span>
                  <span className="font-semibold text-ivory-text">healthier</span>
                </p>
              </div>
              <div className="overflow-hidden">
                <p className="hero-word text-3xl sm:text-4xl lg:text-[56px] font-light text-ivory-text leading-[1.1] tracking-[-0.02em]">
                  smile
                </p>
              </div>
            </div>

            {/* Social Icons */}
            <div
              ref={socialsRef}
              className="hidden lg:flex flex-col items-end gap-4 mt-auto"
              style={{ opacity: 0 }}
            >
              {['twitter', 'facebook', 'instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full border border-ivory-border flex items-center justify-center text-ivory-text-muted hover:bg-ivory-dark hover:text-white hover:border-ivory-dark transition-all duration-300"
                  data-cursor="pointer"
                >
                  {social === 'twitter' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                  {social === 'facebook' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                  {social === 'instagram' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-end justify-between mt-8 lg:mt-0">
          {/* Patient Counter */}
          <div ref={counterRef} className="max-w-[320px]" style={{ opacity: 0 }}>
            <div className="flex items-center gap-2 mb-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-2xl lg:text-3xl font-semibold text-ivory-text">1,350+</span>
            </div>
            <p className="text-sm text-ivory-text-secondary leading-relaxed">
              Families across Kuala Lumpur trust us with their smiles. From your child's first visit to grandma's dentures, we treat every patient like family.
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="hidden lg:flex flex-col items-center gap-2 animate-bounce-gentle">
            <div className="w-12 h-12 rounded-full border border-ivory-border flex items-center justify-center text-ivory-text">
              <ArrowDown size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Section Indicator - Left Edge */}
      <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-30">
        <div className="w-px h-8 bg-ivory-border" />
        <span className="text-xs text-ivory-text-muted rotate-90 origin-center whitespace-nowrap">01</span>
        <div className="w-1.5 h-1.5 rounded-full bg-ivory-text" />
        <div className="w-1.5 h-1.5 rounded-full bg-ivory-border" />
        <div className="w-1.5 h-1.5 rounded-full bg-ivory-border" />
        <div className="w-px h-8 bg-ivory-border" />
      </div>
    </section>
  );
}
