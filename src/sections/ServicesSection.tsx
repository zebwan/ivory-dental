import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Play } from 'lucide-react';
import { PillButton } from '@/components/PillButton';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Scaling & Polishing',
    content:
      "Our most popular service — a thorough clean that removes plaque and stains, leaving your teeth feeling fresh and smooth. We use ultrasonic scalers for a gentler experience. Recommended every 6 months.",
    price: 'From RM 120',
  },
  {
    title: 'Teeth Whitening',
    content:
      "Professional-grade whitening that actually works. Whether it is coffee stains or natural yellowing, we can brighten your smile by several shades in a single 45-minute session.",
    price: 'From RM 650',
  },
  {
    title: 'Braces & Aligners',
    content:
      "Metal braces, ceramic braces, and clear aligners — we offer all options with flexible payment plans starting from RM 150/month. Free consultation to find what is right for you.",
    price: 'From RM 4,500',
  },
  {
    title: 'Fillings & Root Canal',
    content:
      "Toothache? Do not wait. We offer same-day appointments for painful teeth, painless root canal treatment, and tooth-coloured fillings that blend in naturally.",
    price: 'From RM 80',
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.service-word');
        gsap.fromTo(
          words,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      }

      gsap.fromTo(
        videoRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      if (accordionRef.current) {
        const items = accordionRef.current.querySelectorAll('.accordion-item');
        gsap.fromTo(
          items,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.2,
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

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} id="services" className="py-24 lg:py-32 bg-ivory-bg">
      <div className="ivory-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Title + Video */}
          <div>
            <div ref={headlineRef} className="mb-10">
              <div className="overflow-hidden">
                <p className="service-word text-4xl sm:text-5xl lg:text-[64px] font-semibold text-ivory-text leading-[1.05]">
                  Expert care
                </p>
              </div>
              <div className="overflow-hidden">
                <p className="service-word text-4xl sm:text-5xl lg:text-[64px] leading-[1.05]">
                  <span className="font-light text-ivory-text">for </span>
                  <span className="font-light text-ivory-text-accent">every</span>
                </p>
              </div>
              <div className="overflow-hidden">
                <p className="service-word text-4xl sm:text-5xl lg:text-[64px] font-light text-ivory-text leading-[1.05]">
                  smile
                </p>
              </div>
            </div>

            {/* Video Thumbnail */}
            <div
              ref={videoRef}
              className="relative rounded-2xl overflow-hidden w-full max-w-[320px] aspect-video group"
              style={{ opacity: 0 }}
              data-cursor="pointer"
            >
              <img
                src="./images/clinic-interior.jpg"
                alt="Our clinic in KL"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full border-2 border-white/80 flex items-center justify-center mb-3">
                  <Play size={20} className="text-white ml-1" fill="white" />
                </div>
                <p className="text-white text-sm font-medium">Watch more about our clinic</p>
              </div>
            </div>
          </div>

          {/* Right: Accordion */}
          <div ref={accordionRef}>
            {services.map((service, i) => (
              <div key={i} className="accordion-item border-t border-ivory-border">
                <button
                  onClick={() => toggleAccordion(i)}
                  className="w-full py-7 flex items-center justify-between text-left group"
                  data-cursor="pointer"
                >
                  <span className="text-lg lg:text-xl font-medium text-ivory-text pr-4">
                    {service.title}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-ivory-text flex-shrink-0 transition-transform duration-300 ${
                      expandedIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-400 ease-out ${
                    expandedIndex === i ? 'max-h-[300px] opacity-100 pb-6' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-sm text-ivory-text-secondary leading-relaxed mb-4">
                    {service.content}
                  </p>
                  {service.price && (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <span className="text-sm text-ivory-text-accent">{service.price}</span>
                      <PillButton className="text-xs py-2.5 px-5">Book a Consultation</PillButton>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="border-t border-ivory-border" />
          </div>
        </div>
      </div>
    </section>
  );
}
