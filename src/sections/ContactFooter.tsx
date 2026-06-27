import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const locations = [
  { city: 'KL City Centre', address: 'Menara Ivory, Jalan Ampang, 50450 KL' },
  { city: 'Damansara Heights', address: '18 Jalan Bruas, Bukit Damansara, 50490 KL' },
  { city: 'Mont Kiara', address: 'Solaris Dutamas, Jalan Duta Kiara, 50480 KL' },
  { city: 'Johor Bahru', address: '42 Jalan Sutera, Taman Sentosa, 80150 JB' },
];

export function ContactFooter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);
  const giantRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    date: '',
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.contact-word');
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

      if (locationsRef.current) {
        const locs = locationsRef.current.querySelectorAll('.location-item');
        gsap.fromTo(
          locs,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
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

      if (formRef.current) {
        const fields = formRef.current.querySelectorAll('.form-field');
        gsap.fromTo(
          fields,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
            },
          }
        );
      }

      gsap.fromTo(
        giantRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 0.06,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: giantRef.current,
            start: 'top 90%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! We will contact you within 24 hours.');
    setFormData({ name: '', phone: '', message: '', date: '' });
  };

  return (
    <section ref={sectionRef} id="contact-us" className="pt-24 lg:pt-32 bg-ivory-bg overflow-hidden">
      <div className="ivory-container">
        {/* Top Row: Headline + Socials */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16">
          <div ref={headlineRef}>
            <div className="overflow-hidden">
              <p className="contact-word text-5xl sm:text-6xl lg:text-[96px] leading-[1.05] tracking-[-0.03em]">
                <span className="font-light text-ivory-text">We're </span>
                <span className="font-light text-ivory-text-accent">here</span>
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="contact-word text-5xl sm:text-6xl lg:text-[96px] leading-[1.05] tracking-[-0.03em]">
                <span className="font-light text-ivory-text">to </span>
                <span className="font-semibold text-ivory-text">Help</span>
              </p>
            </div>
          </div>

          {/* Socials + Description */}
          <div className="lg:max-w-[280px] lg:text-right">
            <div className="flex lg:justify-end gap-3 mb-4">
              {['twitter', 'facebook', 'instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-ivory-dark flex items-center justify-center text-white hover:scale-110 transition-transform"
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
            <p className="text-base text-ivory-text-secondary">
              Drop us your details and we'll get back to you within 24 hours.
            </p>
          </div>
        </div>

        {/* Main Content: Locations + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Left: Locations */}
          <div ref={locationsRef}>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {locations.map((loc) => (
                <div key={loc.city} className="location-item">
                  <p className="text-sm font-semibold text-ivory-text">{loc.city}</p>
                  <p className="text-xs text-ivory-text-secondary mt-1">{loc.address}</p>
                </div>
              ))}
            </div>
            <p className="text-lg font-medium text-ivory-text">hello@ivorydental.my</p>
          </div>

          {/* Right: Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="form-field">
                <input
                  type="text"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full py-3 bg-transparent border-b border-ivory-border text-ivory-text placeholder:text-ivory-text-muted focus:outline-none focus:border-ivory-text transition-colors text-base"
                  required
                />
              </div>
              <div className="form-field">
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full py-3 bg-transparent border-b border-ivory-border text-ivory-text placeholder:text-ivory-text-muted focus:outline-none focus:border-ivory-text transition-colors text-base"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="form-field">
                <input
                  type="text"
                  placeholder="Briefly describe your concern"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full py-3 bg-transparent border-b border-ivory-border text-ivory-text placeholder:text-ivory-text-muted focus:outline-none focus:border-ivory-text transition-colors text-base"
                />
              </div>
              <div className="form-field">
                <input
                  type="text"
                  placeholder="Preferred date of visit"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full py-3 bg-transparent border-b border-ivory-border text-ivory-text placeholder:text-ivory-text-muted focus:outline-none focus:border-ivory-text transition-colors text-base"
                />
              </div>
            </div>
            <div className="form-field pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto px-12 py-3.5 rounded-3xl bg-ivory-dark text-white text-sm font-medium hover:bg-[#333] transition-colors"
                data-cursor="pointer"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Giant Footer Logo */}
      <div ref={giantRef} className="relative overflow-hidden" style={{ opacity: 0 }}>
        <p className="text-[80px] sm:text-[120px] lg:text-[200px] font-bold text-ivory-text leading-[0.8] tracking-[-0.05em] text-center translate-y-1/4">
          IVORY
        </p>
      </div>

      {/* Copyright Bar */}
      <div className="ivory-container py-6">
        <div className="flex items-center justify-between">
          <p className="text-xs text-ivory-text-secondary">
            © 2025 Ivory Dental. All rights reserved.
          </p>
          <svg width="20" height="20" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ivory-text-muted">
            <path d="M14 2C10.5 2 8 4.5 8 8C8 10 9 12 10 14C11 16 11 18 11 20C11 23 12 26 14 26C16 26 17 23 17 20C17 18 17 16 18 14C19 12 20 10 20 8C20 4.5 17.5 2 14 2Z" />
            <path d="M12 8C12 6.5 13 5 14 5" strokeLinecap="round" />
          </svg>
          <a href="#" className="text-xs text-ivory-text-secondary hover:text-ivory-text transition-colors" data-cursor="pointer">
            Privacy Policy
          </a>
        </div>
      </div>
    </section>
  );
}
