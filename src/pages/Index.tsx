import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import TechStackSection from '@/components/TechStackSection';
import ContactSection from '@/components/ContactSection';
import SpotifyWidget from '@/components/SpotifyWidget';
import Terminal from '@/components/Terminal';

const Index = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [showSpotify, setShowSpotify] = useState(true);

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

  const toggleSpotify = () => {
    setShowSpotify(!showSpotify);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TechStackSection />
      <ContactSection />
      
      {showSpotify && <SpotifyWidget />}
      
      <Terminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)}
        onToggleSpotify={toggleSpotify}
      />
    </div>
  );
};

export default Index;
