import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MapPin } from 'lucide-react';

interface NavigationProps {
  onMenuClick: () => void;
}

const navLinks = ['Home', 'About Us', 'Services', 'Results', 'Contact Us'];

export function Navigation({ onMenuClick }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      // Show when scrolling up, hide when scrolling down
      // Always show if near the top
      if (currentY < 80) {
        setVisible(true);
      } else if (currentY < lastScrollY.current) {
        setVisible(true);
      } else if (currentY > lastScrollY.current) {
        setVisible(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.from(navRef.current, {
      opacity: 0,
      duration: 0.6,
      delay: 0.2,
    });
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase().replace(/\s+/g, '-'));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 h-20 bg-[#E8ECF0]/95 backdrop-blur-md transition-transform duration-500 ease-out ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="ivory-container h-full flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center gap-2.5 text-black"
          data-cursor="pointer"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M14 2C10.5 2 8 4.5 8 8C8 10 9 12 10 14C11 16 11 18 11 20C11 23 12 26 14 26C16 26 17 23 17 20C17 18 17 16 18 14C19 12 20 10 20 8C20 4.5 17.5 2 14 2Z" />
            <path d="M12 8C12 6.5 13 5 14 5" strokeLinecap="round" />
          </svg>
          <span className="text-sm font-bold tracking-widest text-black">IVORY DENTAL</span>
        </button>

        {/* Nav Links - Desktop */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link === 'Home' ? 'hero' : link)}
              className="relative text-sm font-medium text-ivory-text hover:text-ivory-text transition-colors group"
              data-cursor="pointer"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ivory-text transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-sm text-ivory-text-secondary">
            <MapPin size={14} />
            <span>Kuala Lumpur, Malaysia</span>
          </div>
          <button
            onClick={onMenuClick}
            className="flex items-center gap-3 px-6 py-3 rounded-3xl bg-neutral-900 text-white text-sm font-bold hover:bg-black transition-colors shadow-xl"
            data-cursor="pointer"
          >
            Menu
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M14 7L0 14L3 7L0 0L14 7Z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
