import { useState, useCallback } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { CustomCursor } from '@/components/CustomCursor';
import { Navigation } from '@/components/Navigation';
import { FullScreenMenu } from '@/components/FullScreenMenu';
import { Preloader } from '@/components/Preloader';
import { HeroSection } from '@/sections/HeroSection';
import { StatsSection } from '@/sections/StatsSection';
import { AboutSection } from '@/sections/AboutSection';
import { ExperienceSection } from '@/sections/ExperienceSection';
import { QualitySection } from '@/sections/QualitySection';
import { ServicesSection } from '@/sections/ServicesSection';
import { ResultsSection } from '@/sections/ResultsSection';
import { ContactFooter } from '@/sections/ContactFooter';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useLenis();

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <CustomCursor />

      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <Navigation onMenuClick={() => setMenuOpen(true)} />

      <FullScreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <HeroSection isReady={!isLoading} />
        <StatsSection />
        <AboutSection />
        <ExperienceSection />
        <QualitySection />
        <ServicesSection />
        <ResultsSection />
        <ContactFooter />
      </main>
    </>
  );
}
