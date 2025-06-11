'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import MechanicalAchievements from '@/components/MechanicalAchievements';
import Certifications from '@/components/Certifications';
import Resume from '@/components/Resume';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { usePortfolioStore } from '@/lib/store';

export default function Home() {
  const { domain } = usePortfolioStore();

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      {domain === 'mechanical' && <MechanicalAchievements />}
      <Certifications />
      <Resume />
      <Contact />
      <Footer />
      <Toaster />
    </main>
  );
}