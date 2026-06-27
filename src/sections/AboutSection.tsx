import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowButton } from '@/components/ArrowButton';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    num: '01',
    title: 'Experienced Dentists',
    desc: 'Over 12 years serving families in KL with gentle, expert care.',
  },
  {
    num: '02',
    title: 'Family-Friendly Care',
    desc: 'From toddlers to seniors, we make every visit comfortable.',
  },
  {
    num: '03',
    title: 'Modern Equipment',
    desc: 'Digital X-rays, painless injections, and same-day crowns.',
  },
  {
    num: '04',
    title: 'Strict Hygiene Standards',
    desc: 'Hospital-grade sterilisation. Your safety is our priority.',
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Headline stagger
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.about-word');
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

      // Description
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Cards
      if (carouselRef.current) {
        const cards = carouselRef.current.querySelectorAll('.feature-card');
        gsap.fromTo(
          cards,
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            delay: 0.3,
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

  const maxIndex = features.length - 1;

  const handlePrev = () => setActiveIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () => setActiveIndex((prev) => Math.min(maxIndex, prev + 1));

  return (
    <section ref={sectionRef} id="about-us" className="py-24 lg:py-32 bg-ivory-bg">
      <div className="ivory-container">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16">
          <div ref={headlineRef}>
            <div className="overflow-hidden">
              <p className="about-word text-4xl sm:text-5xl lg:text-7xl font-light text-ivory-text leading-[1.05] tracking-[-0.03em]">
                More than <span className="text-ivory-text-accent">just dental</span>
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="about-word text-4xl sm:text-5xl lg:text-7xl leading-[1.05] tracking-[-0.03em]">
                <span className="font-semibold text-ivory-text">— we care for</span>
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="about-word text-4xl sm:text-5xl lg:text-7xl font-light text-ivory-text leading-[1.05] tracking-[-0.03em]">
                your family <span className="inline-block ml-2">▶</span>
              </p>
            </div>
          </div>

          <p
            ref={descRef}
            className="text-base text-ivory-text-secondary leading-relaxed max-w-[360px] lg:pt-4"
            style={{ opacity: 0 }}
          >
            Walk into Ivory Dental and you'll feel the difference — warm smiles, gentle hands, and dentists who actually listen. We've been looking after KL families for over a decade.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              ref={carouselRef}
              className="flex gap-4 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 296}px)` }}
            >
              {features.map((feature, i) => (
                <div
                  key={feature.num}
                  className={`feature-card flex-shrink-0 w-[280px] rounded-2xl p-8 transition-all duration-300 ${
                    i === activeIndex
                      ? 'bg-white shadow-card'
                      : 'bg-ivory-card'
                  }`}
                >
                  <h3 className="text-xl font-medium text-ivory-text mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-ivory-text-secondary leading-relaxed mb-8">
                    {feature.desc}
                  </p>
                  <span className="text-5xl font-extralight text-ivory-text tracking-[-0.02em]">
                    {feature.num}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3 mt-8">
            <ArrowButton
              direction="left"
              variant="outline"
              onClick={handlePrev}
              disabled={activeIndex === 0}
            />
            <ArrowButton
              direction="right"
              variant="outline"
              onClick={handleNext}
              disabled={activeIndex === maxIndex}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
