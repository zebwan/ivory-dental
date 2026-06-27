import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, ArrowRight } from 'lucide-react';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  'Our Team',
  'Certificates & Licenses',
  'First Visit Guide',
  'Aftercare Instructions',
];

const locations = [
  { city: 'KL City Centre', address: 'Menara Ivory, Jalan Ampang, 50450 KL' },
  { city: 'Damansara Heights', address: '18 Jalan Bruas, Bukit Damansara, 50490 KL' },
  { city: 'Mont Kiara', address: 'Solaris Dutamas, Jalan Duta Kiara, 50480 KL' },
  { city: 'Johor Bahru', address: '42 Jalan Sutera, Taman Sentosa, 80150 JB' },
];

export function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!overlayRef.current || !menuRef.current) return;

    const tl = gsap.timeline({ paused: true });
    tlRef.current = tl;

    tl.set(overlayRef.current, { display: 'flex' });
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.inOut' }
    );
    tl.fromTo(
      menuRef.current,
      { x: '100%' },
      { x: '0%', duration: 0.5, ease: 'power3.inOut' },
      0.1
    );
    tl.fromTo(
      itemsRef.current,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
      0.3
    );

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (!tlRef.current) return;

    if (isOpen) {
      tlRef.current.play();
      document.body.style.overflow = 'hidden';
    } else {
      tlRef.current.reverse();
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] hidden items-center justify-end"
      style={{ display: 'none' }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      {/* Menu Panel */}
      <div
        ref={menuRef}
        className="relative w-full max-w-2xl h-full bg-ivory-bg-dark overflow-y-auto"
        style={{ transform: 'translateX(100%)' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full border border-ivory-border text-ivory-text hover:bg-ivory-dark hover:text-white hover:border-ivory-dark transition-all"
          data-cursor="pointer"
        >
          <X size={16} />
        </button>

        <div className="p-12 pt-20 h-full flex flex-col">
          {/* Menu Title */}
          <h2 className="text-[80px] lg:text-[120px] font-light text-ivory-text leading-none mb-12">
            Menu
          </h2>

          {/* Locations */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            {locations.map((loc) => (
              <div key={loc.city}>
                <p className="text-sm font-semibold text-ivory-text">{loc.city}</p>
                <p className="text-xs text-ivory-text-secondary mt-1">{loc.address}</p>
              </div>
            ))}
          </div>

          {/* Menu Items */}
          <div className="flex-1">
            {menuItems.map((item, i) => (
              <div
                key={item}
                ref={(el) => {
                  if (el) itemsRef.current[i] = el;
                }}
                className="border-t border-ivory-border py-6 flex items-center justify-between group hover:pl-2 transition-all duration-300"
                data-cursor="pointer"
              >
                <span className="text-2xl lg:text-3xl font-light text-ivory-text group-hover:translate-x-2 transition-transform duration-300">
                  {item}
                </span>
                <div className="w-12 h-12 rounded-full border border-ivory-border flex items-center justify-center group-hover:bg-ivory-dark group-hover:border-ivory-dark transition-all duration-300">
                  <ArrowRight size={18} className="text-ivory-text group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
            <div className="border-t border-ivory-border" />
          </div>

          {/* Email */}
          <p className="text-xl text-ivory-text mt-8">hello@ivorydental.my</p>

          {/* Giant Footer Text */}
          <div className="mt-auto pt-8 overflow-hidden">
            <p className="text-[100px] lg:text-[180px] font-bold text-ivory-text/[0.06] leading-[0.8] tracking-[-0.05em] translate-y-1/3">
              IVORY
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
