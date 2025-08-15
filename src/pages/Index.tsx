import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import TechStackSection from '@/components/TechStackSection';
import ContactSection from '@/components/ContactSection';
import RadioWidget from '@/components/RadioWidget';
import Terminal from '@/components/Terminal';

const Index = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [showRadio, setShowRadio] = useState(true);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '/' && !isTerminalOpen) {
        e.preventDefault();
        setIsTerminalOpen(true);
      }
      if (e.key === 'Escape' && isTerminalOpen) {
        setIsTerminalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isTerminalOpen]);

  const toggleRadio = () => {
    setShowRadio(!showRadio);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TechStackSection />
      <ContactSection />
      
      {showRadio && <RadioWidget />}
      
      <Terminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)}
        onToggleSpotify={toggleRadio}
      />
    </div>
  );
};

export default Index;
